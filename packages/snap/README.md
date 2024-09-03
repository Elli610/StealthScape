# StealthScape : Metamask snap

## About Metamask Snap
MetaMask Snaps is a system that allows anyone to safely expand the capabilities
of MetaMask. A _snap_ is a program that we run in an isolated environment that
can customize the wallet experience.

## Getting Started
- Clone this repository: 
```shell 
git clone https://github.com/Elli610/StealthScape && cd packages/stealth-snap
```
- Install the dependencies and start the applications:
```shell
yarn install && yarn start
```

## SNAP functionalities

### Send and receive tokens
Easily send and receive tokens on the StealthScape blockchain using our private transactions mechanism.
<img src="" width="300"><img src="" width="30"><img src="" width="300">

### Customized and Interactive UI
An intuitive and user-friendly interface that allows you to manage your assets and transactions with ease. Powered by Metamask [interactive-UI](https://docs.metamask.io/snaps/features/custom-ui/)

<img src="" width="900">

### Multi-language support
StealthScape supports multiple languages, including English, French, and more. (It automatically detects the language of your browser)
Here is what the UI looks like in french:
<img width="900" alt="Capture_decran_2024-03-01_a_22 38 03" src="">

### Transaction insights and alerts
Get real-time insights into your transactions and receive alerts for any suspicious activity regarding our Plasma contracts


### Bridge with 8+ supported networks
StealthScape is a Plasma L2 rollup which is natively plugged on 8+ blockchain, including Linea, Ethereum, Polygon, Zircuit and more.
This allows you to bridge your assets between different networks and use them privately on StealthScape.


### Testing and Linting

Run `yarn test` to run the tests once.

Run `yarn lint` to run the linter, or run `yarn lint:fix` to run the linter and
fix any automatically fixable issues.


