const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/ERC20.json')
// console.log(abi)

const account1 = '0x6456be06d125C0B7F661E6E09E695AF4d59D58D1';
const account2 = '0xc860c73f034D9182fafF474ACA6B61bdC4cF1997';
const contractAddress = '0xc4b151f58Ae6eE80CD5A3829245ba8fAF1411dd5';
const privateKey1 = '9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef';
const privateKey2 = '57830367ec4b86607cf21e48c178698a3082bfb709cb6bd4b5fcc0a5dae5279d';


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
    // console.log(raw)

    const transaction = await web3.eth.sendSignedTransaction(raw)

    console.log({transaction})
    //get all event
    // ERC.getPastEvents("Transfer", { fromBlock: 0 }).then((events) => console.log(events));
}

const getLog = async (ERC)=>{
    ERC.getPastEvents("Transfer", { fromBlock: 0 }).then((events) => console.log(events));

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
        const transaction = await web3.eth.sendSignedTransaction(raw)
    
        console.log({transaction})
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
    // console.log(await getDetail(ERC))
    // transfer(account1,account2,120,ERC)
    // console.log(await getBalance(ERC))
    // getLog(ERC)
    approve(account1,account2,41688,ERC);
}
run()

