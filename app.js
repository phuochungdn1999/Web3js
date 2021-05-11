const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const account1 = '0x6456be06d125C0B7F661E6E09E695AF4d59D58D1';
const account2 = '0xc860c73f034D9182fafF474ACA6B61bdC4cF1997';

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');


web3.eth.getTransactionCount(account1,(err,txCount)=>{
    //build the transaction
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        to:account2,
        value: web3.utils.toHex(web3.utils.toWei('0.5','ether')), 
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei'))
    }

    // //sign the transaction
    const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
    tx.sign(privateKey1)

    const serializedTransaction = tx.serialize()
    const raw = '0x'+serializedTransaction.toString('hex')
    console.log(raw)
    // //broadcast the transaction
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log(err)
        console.log('txHash: ',txHash)
    })
})



