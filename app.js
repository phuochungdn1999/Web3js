const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://mainnet.infura.io/v3/fffda8246d9241f2aa056b563090838d');

async function send(privateKey,receiver,amount){
    
    try{
        try {
            var sender  = web3.eth.accounts.privateKeyToAccount(privateKey);
        } catch (error) {
            throw new Error('Invalid Private key')
        }
        if(!web3.utils.isAddress(receiver)){
            throw new Error('Invalid receiver address')
        }
        const privateKeyToHex = Buffer.from(privateKey,'hex');
        const nonce = await web3.eth.getTransactionCount(sender.address);
        console.log('address',sender.address)

        //build the transaction
        const txObject = {
            from:sender.address,
            nonce: nonce,
            to: receiver,
            value: web3.utils.toHex(web3.utils.toWei(amount,'ether')), 
            // chainId:4 // chainid of rinkeby
        }
        web3.eth.getAccounts();

        txObject.gasLimit = await web3.eth.estimateGas(txObject)
        txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())
        console.log(txObject)
        //sign the transaction
        const tx = new Tx(txObject, {chain:'rinkeby'})
        tx.sign(privateKeyToHex)
    
        const serializedTransaction = tx.serialize()
        const raw = '0x'+serializedTransaction.toString('hex')
        console.log(raw)

        // const raw = (await web3.eth.accounts.signTransaction(txObject,privateKey)).rawTransaction

        // //broadcast the transaction
        // const transaction = await web3.eth.sendSignedTransaction(raw)
        
        console.log(transaction)
        
        console.log("tx",await web3.eth.getTransactionReceipt("0x2abf814337751f37a8953fa66cf254e331785c5ca7e6328cebc8d9c4895dda02"))

    }catch(err){
        console.log('error: ',err)
    }
    

}

// send('9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef','0xc860c73f034D9182fafF474ACA6B61bdC4cF1997','0.00000001');
// console.log(web3.eth.accounts.create());

const hung = async (string1)=>{
    console.log(await web3.eth.getTransactionReceipt("0x2abf814337751f37a8953fa66cf254e331785c5ca7e6328cebc8d9c4895dda02"))
    console.log(string1)
}
hung()
