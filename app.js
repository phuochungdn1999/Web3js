const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const account1 = '0x6456be06d125C0B7F661E6E09E695AF4d59D58D1';
const account2 = '0xc860c73f034D9182fafF474ACA6B61bdC4cF1997';

const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1,'hex');
const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2,'hex');

// web3.eth.getBalance(account1,(err,bal)=>{
//     console.log('account1',web3.utils.fromWei(bal,'ether'))
// })

const contractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"tranfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"inputs":[],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
const contractAddress = '0x903b840265899285E849bB16f95cd746cacb1990'

const contract = new web3.eth.Contract(contractABI,contractAddress)

const data = contract.methods.tranfer(account2,1000).encodeABI()

contract.methods.balanceOf(account2).call((err,bal)=>{
    console.log('account1',bal)
})//check account balance 

web3.eth.getTransactionCount(account1,(err,txCount)=>{

    //build the transaction
    const txObject = {
        nonce:web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(800000),//raise this
        gasPrice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
        to:contractAddress,
        data:data
    }

    // sign the transaction
    const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})
    tx.sign(privateKey1)

    const serializedTransaction = tx.serialize()
    const raw = '0x'+serializedTransaction.toString('hex')
    // broadcast the transaction
    web3.eth.sendSignedTransaction(raw,(err,txHash)=>{
        console.log(err)
        console.log('txHash: ',txHash)
    })
})



