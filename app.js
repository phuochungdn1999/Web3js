const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/ERC20.json')

const {account1,account2,contractAddress,privateKey1,privateKey2} = require('./contract');

async function loadContract() {
    return await new web3.eth.Contract(abi, contractAddress);
}

const load = async ()=>{
    const ERC = await loadContract();
    // console.log( await ERC.methods.totalSupply().call())
    return ERC;
}

const getDetail = async (ERC)=>{
    const name = await ERC.methods.name().call()
    const symbol = await ERC.methods.symbol().call()
    const totalSupply = await ERC.methods.totalSupply().call()
    return  {name,symbol,totalSupply}
}
const getBalance = async (ERC)=>{
    const balance = await ERC.methods.balanceOf(account2).call()
    return  {balance}
}

const transfer = async (from,to,amount,ERC)=>{
    const data = ERC.methods.transfer(to,amount).encodeABI()
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
    //get all event
    // ERC.getPastEvents("Transfer", { fromBlock: 0 }).then((events) => console.log(events));
}

const getLog = async (ERC,name)=>{
    ERC.getPastEvents(name, { fromBlock: 0 }).then((events) => console.log({events}));

}

const approve = async (from,to,amount,ERC)=>{
    try{
        const data = ERC.methods.approve(to,amount).encodeABI()
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
    transfer(account1,account2,167,ERC)
    // console.log(await getBalance(ERC))
    // console.log(account1)
    // approve(account1,account2,111111,ERC);
    // getLog(ERC,'Transfer')
    // getLog(ERC,'Approval')
}
run()

