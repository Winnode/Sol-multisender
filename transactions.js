const solanaWeb3 = require('@solana/web3.js');
const { mainWallet, connection } = require('./config');

const sendTransaction = async (from, to, amount) => {
    const transaction = new solanaWeb3.Transaction().add(
        solanaWeb3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: amount
        })
    );
    const signature = await solanaWeb3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
        {commitment: 'confirmed'}
    );
    return signature;
};

module.exports = {
    sendTransaction
};
