# Getting Started with the Stleath Chain Explorer

# Available API routes :

## Metrics Endpoints

### /metrics

- _Method:_ GET
- _Description:_ Fetches blockchain metrics.
- _Usage:_ Used to get an overview of the blockchain's current metrics.

## Transaction (TX) Endpoints

### /mempool

- _Method:_ GET
- _Description:_ Retrieves data about the current state of the mempool.
- _Usage:_ Useful for understanding the pending transactions waiting to be confirmed.

### /utxo/set

- _Method:_ GET
- _Description:_ Fetches the set of UTXOs.
- _Usage:_ Enables querying of unspent transaction outputs, essential for transaction processing and wallet balance calculations.

### /utxo/hash/:hash

- _Method:_ GET
- _Description:_ Retrieves UTXO data by its hash.
- _Parameters:_
  - hash: The hash of the UTXO.
- _Usage:_ Used for looking up specific UTXO details by hash.

### /transaction/all

- _Method:_ GET
- _Description:_ Fetches data for all transactions.
- _Note:_ Consider adding a range mechanism to improve efficiency.
- _Usage:_ Allows retrieval of comprehensive transaction data, which may become inefficient without a range mechanism.

### /transaction/hash/:tx_hash

- _Method:_ GET
- _Description:_ Retrieves transaction data by its hash.
- _Parameters:_
  - tx_hash: The hash of the transaction.
- _Usage:_ Useful for querying specific transactions directly.

### /transaction/number

- _Method:_ GET
- _Description:_ Fetches the number of transactions.
- _Usage:_ Provides a count of all transactions processed.

### /transaction/latest-ten

- _Method:_ GET
- _Description:_ Retrieves the latest ten transactions.
- _Usage:_ Offers a quick overview of the most recent transactions.

## Block Endpoints

### /block/all

- _Method:_ GET
- _Description:_ Fetches data for all blocks.
- _Note:_ Consider adding a range mechanism to improve efficiency.
- _Usage:_ Enables retrieval of all block data, which may become slow and inefficient without a range mechanism.

### /block/hash/:block_hash

- _Method:_ GET
- _Description:_ Retrieves block data by its hash.
- _Parameters:_
  - block_hash: The hash of the block.
- _Usage:_ Allows for querying specific blocks directly.

### /block/number/:block_number

- _Method:_ GET
- _Description:_ Fetches block data by block number.
- _Parameters:_
  - block_number: The number of the block.
- _Usage:_ Useful for retrieving blocks based on their height in the blockchain.

### /block/range/:rangeData

- _Method:_ GET
- _Description:_ Retrieves a range of blocks.
- _Parameters:_
  - rangeData: Specifies the range of blocks to retrieve.
- _Usage:_ Facilitates the retrieval of blocks within a specific range.

### /block/latest

- _Method:_ GET
- _Description:_ Fetches the latest block data.
- _Usage:_ Provides data on the most recently mined or produced block.

### /block/latest-ten

- _Method:_ GET
- _Description:_ Retrieves the latest ten blocks.
- _Usage:_ Offers a snapshot of the ten most recent blocks.

### /block/total-number

- _Method:_ GET
- _Description:_ Fetches the total number of blocks.
- _Usage:_ Gives the total count of blocks in the blockchain.

## State Endpoints

### /state/current

- _Method:_ GET
- _Description:_ Fetches the last proven state of the network.
- _Usage:_ Gives the last proven state as a merkle root of block hash.

### /state/block/current

- _Method:_ GET
- _Description:_ Fetches the last proven block number of the network.
- _Usage:_ Gives the last proven block number.

## User Operation Endpoints

### /ringct

- _Method:_ POST
- _Description:_ Handles RingCT (Ring Confidential Transactions) operations.
- _Usage:_ Enables users to perform RingCT transactions, enhancing privacy by concealing the amount transferred.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
