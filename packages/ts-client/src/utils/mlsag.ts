import { Curve, CurveName, Point, piSignature } from "@cypher-laboratory/alicesring-lsag";
import { keccak_256, randomBigint } from "@cypher-laboratory/alicesring-lsag/dist/src/utils";
import { Mlsag } from "../interfaces";

/**
 * Has a string to a point on the SECP256K1 curve
 *  !!!!! NOT SECURE, DO NOT USE IN PRODUCTION !!!!!
 * 
 * @param data - The data to hash
 * @returns The point on the SECP256K1 curve
 */
export function hashToSECP256K1(data: string): Point {
  const curve = new Curve(CurveName.SECP256K1);
  const point = curve.GtoPoint();
  return point.mult(BigInt("0x" + keccak_256([data])));
}

export function signMlsag(message: string, keys: { utxoPrivKeys: bigint[], commitmentKey: bigint }, ring: Point[][] /* each elem of ring is an array of point: first the public keys then the commitment pub keys */): {
  message: string,
  ring: Point[][],
  c: bigint,
  responses: bigint[][],
  keyImages: Point[]
} {

  const curve = new Curve(CurveName.SECP256K1);
  const G = curve.GtoPoint();
  const P = curve.P;

  const allPrivKeys: bigint[] = [keys.commitmentKey, ...keys.utxoPrivKeys.flat()];
  const allPubKeys: Point[] = allPrivKeys.map(privKey => G.mult(privKey));

  // Get the key images
  const keyImages: Point[] = allPrivKeys.map((privKey, index) => hashToSECP256K1(allPubKeys[index].serialize()).mult(privKey));

  // add the commitment key to each ring element
  ring = ring.map(ringElem => [allPubKeys[0], ...ringElem]);

  const signerIndex = ring.length === 0 ? 0 : Number(randomBigint(BigInt(ring.length))); // no overflow as long as the ring size is less than max Number value

  ring = ring
    .slice(0, signerIndex)
    .concat([allPubKeys], ring.slice(signerIndex));


  // generate random responses
  let responses: bigint[][] = ring.map(ringElem => ringElem.map(() => randomBigint(P)));

  const alpha = responses[0].map(() => randomBigint(P));

  const ceePiPlusOne = BigInt("0x" + keccak_256([
    message +
    ring[0].map((_, index) => G.mult(alpha[index]).serialize()).join("") +
    keyImages.map((_, index) => hashToSECP256K1(allPubKeys[index].serialize()).mult(alpha[index]).serialize()).join("")
  ]));

  const cees: bigint[] = ring.map(() => 0n);

  for (let i = signerIndex + 1; i < ring.length + signerIndex + 1; i++) {
    /* 
    Convert i to obtain a numbers between 0 and ring.length - 1, 
    starting at pi + 1, going to ring.length and then going from 0 to pi (included)
    */
    const index = i % ring.length;
    const indexMinusOne =
      index - 1 >= 0n ? index - 1 : index - 1 + ring.length;

    if (index === (signerIndex + 1) % ring.length) {
      cees[index] = ceePiPlusOne;
    } else {
      // compute the c value
      cees[index] = BigInt("0x" + keccak_256([
        message +
        ring[0].map((_, index) => G.mult(responses[indexMinusOne][index]).add(ring[indexMinusOne][index].mult(cees[indexMinusOne])).serialize()).join('') +
        keyImages.map((_, index) => hashToSECP256K1(ring[indexMinusOne][index].serialize()).mult(responses[indexMinusOne][index]).add(keyImages[index].mult(cees[indexMinusOne])).serialize()).join('')
      ]));
    }
  }
  responses[signerIndex] = responses[signerIndex].map((r, index) => piSignature(alpha[index], cees[signerIndex], allPrivKeys[index], new Curve(CurveName.SECP256K1)));

  // if a ring element only has a length of < max length, add a random point to it
  // not secure and right but ok if we only need the poc to work
  let max = ring[0].length;
  for (let i = 1; i < ring.length; i++) {
    if (ring[i].length > max) max = ring[i].length;
  }

  for (let i = 0; i < ring.length; i++) {
    while (ring[i].length < max) {
      ring[i].push(G.mult(randomBigint(P)));
    }
  }

  // same for the responses
  for (let i = 0; i < responses.length; i++) {
    while (responses[i].length < max) {
      responses[i].push(randomBigint(P));
    }
  }

  return {
    message: message,
    ring: ring,
    c: cees[0],
    responses: responses,
    keyImages: keyImages // todo: return { commitmentPubKey: Point, witnesses: Point[] } instead of utxoKeyImages and when verifying, add the key image at index 0 for each ring element -> save (ring size - 1) * serializeed_point_size bytes
  };
}





export function verifyMlsag(signature: { ring: Point[][], c: bigint, responses: bigint[][], message: string, keyImages: Point[] }) {
  const curve = new Curve(CurveName.SECP256K1);
  const G = curve.GtoPoint();

  for (let i = 0; i < signature.ring.length; i++) {
    if (signature.ring[i].length !== signature.ring[0].length) throw new Error("Invalid length of ring elements");
  }

  let c = signature.c;
  for (let i = 1; i < signature.ring.length; i++) {
    c = BigInt("0x" + keccak_256([
      signature.message +
      signature.ring[0].map((pubKeys, index) => G.mult(BigInt(signature.responses[i - 1][index])).add(signature.ring[i - 1][index].mult(BigInt(c))).serialize()).join("") +
      signature.keyImages.map((keyImage, index) => hashToSECP256K1(signature.ring[i - 1][index].serialize()).mult(signature.responses[i - 1][index]).add(signature.keyImages[index].mult(c)).serialize()).join("")
    ]));
  }
  c = BigInt("0x" + keccak_256([
    signature.message +
    signature.ring[0].map((pubKeys, index) => G.mult(BigInt(signature.responses[signature.ring.length - 1][index])).add(signature.ring[signature.ring.length - 1][index].mult(BigInt(c))).serialize()).join("") +
    signature.keyImages.map((keyImage, index) => hashToSECP256K1(signature.ring[signature.ring.length - 1][index].serialize()).mult(signature.responses[signature.ring.length - 1][index]).add(signature.keyImages[index].mult(c)).serialize()).join("")
  ]));

  if (signature.c !== c) return true;
  return signature.c === c;
}



// encodes the signature to a hex string
export function hexEncodeMLSAG(signature: Mlsag) {
  const str = JSON.stringify({
    ring: signature.ring.map(ringElem => ringElem.map(point => point.serialize())),
    c: signature.c.toString(),
    responses: signature.responses.map(responseElem => responseElem.map(response => response.toString())),
    message: signature.message,
    keyImages: signature.keyImages.map(point => point.serialize())
  });

  return `0x${Buffer.from(str).toString('hex')}`;
}

export function hexDecodeMLSAG(hex: string): Mlsag {
  const obj = JSON.parse(Buffer.from(hex.slice(2), 'hex').toString('utf-8'));
  return {
    ring: obj.ring.map((ringElem: string[]) => ringElem.map((point: string) => Point.deserialize(point))),
    c: BigInt(obj.c),
    responses: obj.responses.map((responseElem: string[]) => responseElem.map((response: string) => BigInt(response))),
    message: obj.message,
    keyImages: obj.keyImages.map((point: string) => Point.deserialize(point))
  };
}


// const message = "Hello, world!";
// const ring = [
//   [
//     (new Curve(CurveName.SECP256K1)).GtoPoint().mult(12n),
//     // (new Curve(CurveName.SECP256K1)).GtoPoint().mult(13n)
//   ],
//   [
//     // (new Curve(CurveName.SECP256K1)).GtoPoint().mult(14n),
//     (new Curve(CurveName.SECP256K1)).GtoPoint().mult(15n)
//   ],
//   [
//     // (new Curve(CurveName.SECP256K1)).GtoPoint().mult(16n),
//     (new Curve(CurveName.SECP256K1)).GtoPoint().mult(17n)
//   ]
// ];


// const sig = signMlsag(message, { utxoPrivKeys: [123456888n], commitmentKey: 99899898n }, ring);
// console.log("hex sig: ", hexEncodeMLSAG(sig));
// console.log("verified: ", verifyMlsag(hexDecodeMLSAG(hexEncodeMLSAG(sig))));

