const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/UniRouter.json')
const bytecode = require('./abis/bytecode.json')

const {account1,account2,contractAddress,privateKey1,privateKey2} = require('./contract');
function loadContract() {
    return new web3.eth.Contract(abi,'0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa');
}
const privateKey = "9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef"

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
    const balance = await ERC.methods.balanceOf("0xf7C267A46BF8eE95454AEcbb33a762F0AEFD4c06").call()
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
const deploy = async (from)=>{
    var name_ ='New Token;'
var symbol_ = 'NT';
var totalSupply_ = 123123123 ;
var temp = '0x6456be06d125C0B7F661E6E09E695AF4d59D58D1' ;
var erc20Contract = new web3.eth.Contract(abi);

    const nonce = await web3.eth.getTransactionCount(from);
    const txObject = {
        nonce: nonce,
        from:from,
        value: web3.utils.toHex(0), 
        data:erc20.encodeABI()
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
async function send(privateKey,receiver,amount,ERC){
    
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

async function buyOnlyone(min, amount,ERC) {

    var amountToBuyWith = web3.utils.toHex(amount);
    // var privateKey = Buffer.from(targetAccount.privateKey.slice(2), 'hex')  ;
    // var abiArray = JSON.parse(JSON.parse(fs.readFileSync('onlyone-abi.json','utf-8')));
    var tokenAddress = '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'; // ONLYONE contract address
    var WBNBAddress = '0xc778417e063141139fce010982780140aa0cd5ab'; // WBNB token address
    const account1 = '0x6456be06d125C0B7F661E6E09E695AF4d59D58D1';

    // var onlyOneWbnbCakePairAddress = '0xd22fa770dad9520924217b51bf7433c4a26067c2';
    // var pairAbi = JSON.parse(fs.readFileSync('cake-pair-onlyone-bnb-abi.json', 'utf-8'));
    // var pairContract = new web3.eth.Contract(pairAbi, onlyOneWbnbCakePairAddress/*, {from: targetAccount.address}*/);
    var amountOutMin = '100' + Math.random().toString().slice(2,6);
    var pancakeSwapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

    var data = ERC.methods.swapExactETHForTokens(
        web3.utils.toHex(min),
        [WBNBAddress,
         tokenAddress],
        account1,
        web3.utils.toHex("1632928302"),
    );

    var count = await web3.eth.getTransactionCount(account1);
    var txObject = {
        "from":account1,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(290000),
        "to":pancakeSwapRouterAddress,
        "value":web3.utils.toHex(amountToBuyWith),
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count)
    };

    txObject.gasLimit = await web3.eth.estimateGas(txObject)
    txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())
    console.log(txObject)
    //sign the transaction
    const tx = new Tx(txObject, {chain:'rinkeby'})
    const privateKeyToHex = Buffer.from(privateKey,'hex');
    tx.sign(privateKeyToHex)

    const serializedTransaction = tx.serialize()
    const raw = '0x'+serializedTransaction.toString('hex')
    console.log(raw)
    // //broadcast the transaction
    const transaction = await web3.eth.sendSignedTransaction(raw)
    
    console.log(transaction)
}
const run = async ()=>{
    const ERC = await load()
    // console.log(await getBalanceOf(ERC,account1))
    console.log(await buyOnlyone(1799560000,100000,ERC))
    // const array = [account1,account1]
    // const tokenId = [1,2]
    // console.log(await getBalanceOfBatch(ERC,array,tokenId))
    // transfer(account1,account2,contractAddress,5,ERC)
    // safeTransfer(account1,account2,contractAddress,6,ERC)
    // approve(account1,account2,7,ERC);
    // getLog(ERC,'Transfer')
    // getLog(ERC,'Approval')
    // console.log(await ownerOf(ERC,1))
    // console.log(await getApproved(ERC,3))
    // await deploy(account1)
    
}   
run()


// send('9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef','0xc860c73f034D9182fafF474ACA6B61bdC4cF1997','0.00000001');