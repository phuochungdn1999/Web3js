const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/ERC1155.json')

const {account1,account2,contractAddress,privateKey1,privateKey2} = require('./contract');

function loadContract() {
    return new web3.eth.Contract(abi, contractAddress);
}


const load = async ()=>{
    const ERC = await loadContract();
    return ERC;
}

const getDetail = async (ERC)=>{
    const name = await ERC.methods.name().call()
    const symbol = await ERC.methods.symbol().call()
    return  {name,symbol}
}
const getBalanceOf = async (ERC,account,tokenId)=>{
    const balance = await ERC.methods.balanceOf(account,tokenId).call()
    return  {balance}
}
const getBalanceOfBatch = async (ERC,arrayAccount,arrayTokenId)=>{
    const balance = await ERC.methods.balanceOfBatch(arrayAccount,arrayTokenId).call()
    return  {balance}
}

const ownerOf = async (ERC,tokenId)=>{
    const owner = await ERC.methods.ownerOf(tokenId).call()
    return  {owner}
}

const getApproved = async (ERC,tokenId)=>{
    const address = await ERC.methods.getApproved(tokenId).call()
    return  {address}
}

const transfer = async (from,to,contractAddress,tokenId,ERC)=>{
    const data = ERC.methods.transferFrom(from,to,tokenId).encodeABI()
    console.log({data})
    const nonce = await web3.eth.getTransactionCount(from);
    const txObject = {
        nonce: nonce,
        from:from,
        to: contractAddress,
        value: web3.utils.toHex(0), 
        data:data
    }

    txObject.gasLimit = await web3.eth.estimateGas(txObject)
    txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())

    const raw = await signTransaction(txObject,privateKey1)
    console.log(raw)

    const transaction = await web3.eth.sendSignedTransaction(raw)

    console.log({transaction})
}

const safeTransfer = async (from,to,contractAddress,tokenId,ERC)=>{
    const data = ERC.methods.safeTransferFrom(from,to,tokenId).encodeABI()
    console.log({data})
    const nonce = await web3.eth.getTransactionCount(from);
    const txObject = {
        nonce: nonce,
        from:from,
        to: contractAddress,
        value: web3.utils.toHex(0), 
        data:data
    }

    txObject.gasLimit = await web3.eth.estimateGas(txObject)
    txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())

    const raw = await signTransaction(txObject,privateKey1)
    console.log(raw)

    const transaction = await web3.eth.sendSignedTransaction(raw)

    console.log({transaction})
}


const getLog = async (ERC,name)=>{
    // ERC.getPastEvents(name, { fromBlock: 0 }).then((events) => console.log({events}));
    const events = await ERC.getPastEvents(name, {
        filter: {to:'0x0448858fCAF2c8E3F1aAd5426D1494031eA4532c'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 0,
        toBlock: 'latest'})
    events.forEach(event => {
        console.log({event: event.returnValues})
    });
    

}

const approve = async (from,to,tokenId,ERC)=>{
    try{
        const data = ERC.methods.approve(to,tokenId).encodeABI()
        const nonce = await web3.eth.getTransactionCount(from);
        const txObject = {
            nonce: nonce,
            from:from,
            to: contractAddress,
            value: web3.utils.toHex(0), 
            data:data
        }
            txObject.gasLimit = await web3.eth.estimateGas(txObject)
            txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())

            const raw = await signTransaction(txObject,privateKey1)

            // console.log(raw)
            const approve = await web3.eth.sendSignedTransaction(raw)

            console.log({approve})
    }catch(error){
        console.log({error})
    }
    
}

const signTransaction = async (txObject,privateKey)=>{
    const tx = new Tx(txObject, {chain:'rinkeby'})
    const privateKeyToHex = Buffer.from(privateKey,'hex');
    tx.sign(privateKeyToHex)

    const serializedTransaction = tx.serialize()
    const raw = '0x'+serializedTransaction.toString('hex')

    return raw;
}
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
            nonce: nonce,
            to: receiver,
            value: web3.utils.toHex(web3.utils.toWei(amount,'ether')), 
        }

        txObject.gasLimit = await web3.eth.estimateGas(txObject)
        txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())
        console.log(txObject)
        //sign the transaction
        const tx = new Tx(txObject, {chain:'rinkeby'})
        tx.sign(privateKeyToHex)
    
        const serializedTransaction = tx.serialize()
        const raw = '0x'+serializedTransaction.toString('hex')
        console.log(raw)
        // //broadcast the transaction
        const transaction = await web3.eth.sendSignedTransaction(raw)
        
        console.log(transaction)
        
        
    }catch(err){
        console.log('error: ',err)
    }
    


}
const run = async ()=>{
    const ERC = await load()
    console.log(await getBalanceOf(ERC,account1,1))
    const array = [account1,account1]
    const tokenId = [1,2]
    console.log(await getBalanceOfBatch(ERC,array,tokenId))
    // transfer(account1,account2,contractAddress,5,ERC)
    // safeTransfer(account1,account2,contractAddress,6,ERC)
    // approve(account1,account2,7,ERC);
    // getLog(ERC,'Transfer')
    // getLog(ERC,'Approval')
    // console.log(await ownerOf(ERC,1))
    // console.log(await getApproved(ERC,3))

    
}   
// run()


send('9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef','0xc860c73f034D9182fafF474ACA6B61bdC4cF1997','0.00000001');