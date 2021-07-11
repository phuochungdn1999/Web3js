const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/ERC721.json')

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
const getBalanceOf = async (ERC,account)=>{
    const balance = await ERC.methods.balanceOf(account).call()
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


const run = async ()=>{
    const ERC = await load()
    console.log(await getDetail(ERC))
    console.log(await getBalanceOf(ERC,account2))
    // transfer(account1,account2,contractAddress,5,ERC)
    // safeTransfer(account1,account2,contractAddress,6,ERC)
    // approve(account1,account2,7,ERC);
    // getLog(ERC,'Transfer')
    // getLog(ERC,'Approval')
    console.log(await ownerOf(ERC,1))
    console.log(await getApproved(ERC,3))

    
}   
run()

