# crowdfunding-contract

##Tech Stack
We will use the following tech stack:

near-cli - A CLI tool for NEAR that offers an API to interact with smart contracts.
assemblyscript - A TypeScript-like language for WebAssembly.
asbuild - A build tool for AssemblyScript.

##Setup
Install CLI Tools

`yarn global add near-cli`

`yarn global add assemblyscript`

`yarn global add asbuild`

In order to deploy the contract to your own near account go [here](https://wallet.testnet.near.org/) to create a test wallet account.

#### Open the wallet.
#### Choose a name for your account.
#### Choose a security method, we are going to choose passphrase for this learning module.
#### Store the passphrase somewhere safe.
#### Reenter the passphrase to confirm.

In order to understand and write your own contract go to the near development course on [DACADE](https://dacade.org/communities/near/courses/near-101/learning-modules/b52ba9f1-caac-4339-96ed-fad3b1ab6bbd)
### Login to the NEAR CLI
`near login`

### Create a Subaccount
run this in the terminal:
`near create-account ${SUBACCOUNT_ID}.${ACCOUNT_ID} --masterAccount ${ACCOUNT_ID} --initialBalance ${INITIAL_BALANCE}`

Where:
SUBACCOUNT_ID - id of the subaccount.

ACCOUNT_ID - id of the top-level account.

INITIAL_BALANCE - initial balance for the subaccount in NEAR tokens.

### Deploy the Contract
`near deploy --accountId=${ACCOUNT_ID} --wasmFile=${PATH_TO_WASM}`