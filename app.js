const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/ERC20.json')

const {account1,account2,contractAddress,privateKey1,privateKey2} = require('./contract');


factoryAddress = "0x5aEF7f124CC539F623f24f566223e92DA0378b9E"

bytecode = "0x6080604052600560005534801561001557600080fd5b5060b3806100246000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806306540f7e14602d575b600080fd5b60336047565b604051603e9190605a565b60405180910390f35b60005481565b6054816073565b82525050565b6000602082019050606d6000830184604d565b92915050565b600081905091905056fea264697066735822122007c98ae01b83d513026c944b73f15dd1f1fafe9e2f8231a21b4a5bcd92e646a464736f6c63430008010033"

salt = 1;

console.log("0x" + web3.utils.sha3('0xff' + factoryAddress.slice(2) + web3.eth.abi.encodeParameter('uint256',salt).slice(2).toString() + web3.utils.sha3(bytecode).slice(2).toString()).slice(-40));

console.log(web3.eth.abi.encodeParameter('address', "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1"))

console.log(web3.utils.keccak256("PROXIABLE"))

function loadContract() {
    return new web3.eth.Contract(abi, contractAddress);
}

const temp = "0x6080604052600560005534801561001557600080fd5b5060b3806100246000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806306540f7e14602d575b600080fd5b60336047565b604051603e9190605a565b60405180910390f35b60005481565b6054816073565b82525050565b6000602082019050606d6000830184604d565b92915050565b600081905091905056fea264697066735822122007c98ae01b83d513026c944b73f15dd1f1fafe9e2f8231a21b4a5bcd92e646a464736f6c634300080100330000000000000000000000006456be06d125c0b7f661e6e09e695af4d59d58d1"

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
    const balance = await ERC.methods.balanceOf(account1).call()
    return  {balance}
}

const transfer = async (from,to,amount,ERC)=>{
    const data = ERC.methods.transfer(to,amount).encodeABI()
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
    //get all event
    // ERC.getPastEvents("Transfer", { fromBlock: 0 }).then((events) => console.log(events));
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
    transfer(account1,contractAddress,456,ERC)
    // console.log(await getBalance(ERC))
    // console.log(account1)
    // approve(account1,account2,111111,ERC);
    // getLog(ERC,'Transfer')
    // getLog(ERC,'Approval')
}
// run()

