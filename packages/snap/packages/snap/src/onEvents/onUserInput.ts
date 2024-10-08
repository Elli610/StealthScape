import { OnUserInputHandler, UserInputEventType, panel, text, button, heading, copyable, image } from "@metamask/snaps-sdk";
import { displayUtxos, homeUi, newTx, sendTxFromExpended, validTx } from "./ui";
import { isAddressValid, locale, userAddress } from "../keys";
import { amountFromString } from "../utils/convert-types/stringToAmount";
import QRCode from "qrcode-svg";

/**
 * Handle incoming user events coming from the MetaMask clients open interfaces.
 *
 * @param params - The event parameters.
 * @param params.id - The Snap interface ID where the event was fired.
 * @param params.event - The event object containing the event type, name and value.
 * @see https://docs.metamask.io/snaps/reference/exports/#onuserinput
 */
export const onUserInput: OnUserInputHandler = async ({ id, event }) => {

  if (event.type === UserInputEventType.ButtonClickEvent) {
    switch (event.name) {
      case 'update':
        await newTx(id);
        break;

      case 'go-home':
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: (await homeUi()).ui
          },
        });
        break;

      case 'send':
        await newTx(id);
        break;

      case 'receive':

        const data = await userAddress();
        // Create a new QRCode instance
        const qr = new QRCode({
          content: data,
          padding: 4, // Optional, default is 4
          width: 10, // Optional, default is 256
          height: 10, // Optional, default is 256
          color: "#000000", // Optional, default is "#000000"
          background: "#ffffff", // Optional, default is "#ffffff"
          ecl: "M", // Error Correction Level: L, M, Q, H
        });

        // Generate SVG QR code
        const svg = qr.svg();

        let ui: any;
        switch (await locale()) {
          case 'fr':
            ui = panel([
              heading('Recevoir'),
              text('Votre adresse:'),
              copyable(await userAddress()),
              button({ value: 'Accueil 🏠', name: 'go-home', variant: 'secondary' }),
              image(svg),
            ]);
            break;

          default:
            ui = panel([
              heading('Receive tokens'),
              text('Your address:'),
              copyable(await userAddress()),
              button({ value: 'Home 🏠', name: 'go-home', variant: 'secondary' }),
              image(svg),
            ]);
        }

        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: ui
          },
        });
        break;

      case "view-utxos":
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: (await displayUtxos()).ui,
          },
        });
        break;

      default:
        break;
    }

    if (event.name?.startsWith('submit-tx+')) {
      try {
        const data = JSON.parse(event.name.split('+')[1]!);
        const fee = BigInt(data.fee);
        const e = { value: { 'tx-receiver': data['tx-receiver'], amount: data.amount, fee: fee.toString() } };

        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: (await sendTxFromExpended(id, e)).ui,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  if (event.type === UserInputEventType.FormSubmitEvent) {

    switch (event.name) {

      case 'valid-tx':
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: (await validTx(id, event)).ui,
          },
        });

        break;

      default:
        break;
    }
  }

};

// check if the event contains all the required parameters
export function checkSendTxParams(event: any): boolean {
  if (!event.value['tx-receiver'] || !event.value['amount'] || !event.value['fee']) {
    return false;
  }

  try {
    amountFromString(event.value['amount'], 18);
    amountFromString(event.value['fee'], 18);
  } catch (e) {
    return false;
  }

  if (amountFromString(event.value['amount'], 18) <= 0 || amountFromString(event.value['fee'], 18) <= 0) {
    return false;
  }

  // check if the tx-receiver is a valid stealthscape address
  if (!isAddressValid(event.value['tx-receiver'])) {
    return false;
  }

  return true;
}