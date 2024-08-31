import { Curve, CurveName } from "@cypher-laboratory/alicesring-lsag"
import { keccak_256 } from "@cypher-laboratory/alicesring-lsag/dist/src/utils";

export const SECP256K1 = new Curve(CurveName.SECP256K1);
const gamma = BigInt("0x" + keccak_256(["gamma6516516515615615151"]));
export const G = SECP256K1.GtoPoint();
export const H = G.mult(gamma); // NOT SECURE, ONLY USED FOR POC