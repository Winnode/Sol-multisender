const solanaWeb3 = require('@solana/web3.js');
const dotenv = require('dotenv');
const fs = require('fs');
const bs58 = require('bs58');

dotenv.config();

const keypairFromSecretKey = (base58String) => {
    return solanaWeb3.Keypair.fromSecretKey(bs58.decode(base58String));
};

const mainWallet = keypairFromSecretKey(process.env.MAIN_WALLET);
const connection = new solanaWeb3.Connection(process.env.HTTP_RPC_URL, 'confirmed');

const readSubAccounts = () => {
    return fs.readFileSync('./files/accounts.txt', 'utf8')
        .trim()
        .split('\n')
        .map(keypairFromSecretKey);
};

module.exports = {
    mainWallet,
    connection,
    readSubAccounts
};
