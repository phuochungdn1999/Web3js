const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/ERC20.json')
// console.log(abi)

async function loadContract() {
    return await new web3.eth.Contract(abi, '0xFb911c5c75d951e04054fd84c021568c0f11985D');
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
    const balance = await ERC.methods.balanceOf('0xc860c73f034D9182fafF474ACA6B61bdC4cF1997').call()
    return  balance
}


const run = async ()=>{
    const ERC = await load()
    console.log(await getDetail(ERC))
    console.log(await getBalance(ERC))
}
run()

