# Solana MultiSender

## Overview

This application facilitates automated SOL transactions between a main account and multiple sub-accounts on the Solana blockchain. It supports transferring SOL from a main wallet to several sub-accounts and consolidating SOL from those sub-accounts back into the main wallet.

## Features

- **Bulk Transfer**: Transfer SOL from a main wallet to multiple sub-accounts.
- **Consolidation**: Aggregate SOL from multiple sub-accounts back into the main wallet.

## Prerequisites

Before running this application, make sure you have the following installed:
- **Node.js**: Version 16.x or higher recommended.
- **npm**: Typically comes with Node.js.

## Installation

1. Clone the repository and navigate into the project directory:
    ```bash
    git clone https://github.com/Winnode/Sol-multisender
    cd SOL_MultiSender-main
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following content:
    ```plaintext
    MAIN_WALLET=<Your_Main_Wallet_Secret_Key>
    HTTP_RPC_URL=https://api.mainnet-beta.solana.com
    ```

4. Ensure you have an `accounts.txt` file in the `./files/` directory containing base58 encoded secret keys of the sub-accounts, one per line:
    ```plaintext
    PK1
    PK2
    PK3
    ```

## Running the Application

Start the application using the following command:
```bash
npm start
```

## Give
- [Follow kami di Twitter](https://twitter.com/Winnode)
- [Follow kami di GitHub](https://github.com/Winnode)
