const readlineSync = require('readline-sync');
const chalk = require('chalk');
const { mainWallet, readSubAccounts, connection } = require('./config');
const { sendTransaction } = require('./transactions');

const runApp = async () => {
    const boxen = (await import('boxen')).default;

    // Winnode banner
    const winnodeBanner = chalk.white.bold.bgBlue(' WINNODE ');
    console.log(boxen(`${winnodeBanner}\n` + chalk.blue('MultiSender Sol Menu'), { padding: 1, margin: 1, borderStyle: 'double', borderColor: 'blue' }));

    const choice = readlineSync.question(chalk.blue('Choose an option:\n1. Transfer from main to sub-accounts\n2. Transfer from sub-accounts to main\nEnter choice: '));

    const subAccounts = readSubAccounts();
    switch (choice.trim()) {
        case '1':
            const amount = readlineSync.questionInt(chalk.blue('Enter the amount of SOL to transfer to each sub-account: ')) * solanaWeb3.LAMPORTS_PER_SOL;
            for (let subAccount of subAccounts) {
                const signature = await sendTransaction(mainWallet, subAccount, amount);
                console.log(chalk.green(`Transaction ${signature} completed. ${amount} lamports transferred from ${mainWallet.publicKey.toBase58()} to ${subAccount.publicKey.toBase58()}`));
            }
            break;
        case '2':
            for (let subAccount of subAccounts) {
                const balance = await connection.getBalance(subAccount.publicKey); // Use the imported connection
                if (balance > 5000) {
                    const signature = await sendTransaction(subAccount, mainWallet, balance - 5000);
                    console.log(chalk.green(`Transaction ${signature} completed. Funds transferred back to main wallet from ${subAccount.publicKey.toBase58()}`));
                } else {
                    console.log(chalk.yellow(`Insufficient balance in ${subAccount.publicKey.toBase58()} to cover transaction fees.`));
                }
            }
            break;
        default:
            console.log(chalk.red('Invalid choice. Please select 1 or 2.'));
            break;
    }
};

runApp().catch(err => {
    console.error(chalk.red(`Error: ${err}`));
    process.exit(1);
});
