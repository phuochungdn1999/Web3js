const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3('https://rinkeby.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const abi = require('./abis/UniRouter.json')
const BigNumber = require('bignumber.js');

const {account1,account2,contractAddress,privateKey1,privateKey2} = require('./contract');
const  { ChainId, Token, Fetcher,Percent , Route, TradeType, TokenAmount, Trade } = require('@uniswap/sdk')

const DAI = new Token(ChainId.RINKEBY, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea', 18)
const WETH = new Token(ChainId.RINKEBY, '0xc778417e063141139fce010982780140aa0cd5ab', 18)

const privateKey = "9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef"

const uniswapAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
function loadContract() {
    return new web3.eth.Contract(abi,uniswapAddress);
}

const load = async ()=>{
    const ERC = await loadContract();
    return ERC;
}



async function getAmountFromEth(amountOfEth,percent){
    const pair = await Fetcher.fetchPairData(DAI, WETH) 

    const routeWethForDai = new Route([pair], WETH);
    const tradeWethForDai = new Trade(routeWethForDai, new TokenAmount(WETH,  BigInt(amountOfEth*1E18)), TradeType.EXACT_INPUT);
    const slippageTolerance = new Percent('10', '1000')

    const amountMinDAL =  tradeWethForDai.minimumAmountOut(slippageTolerance).toSignificant(6)
    const amountOf1Eth = tradeWethForDai.executionPrice.toSignificant(6)
    const amountOfOutputDAL = tradeWethForDai.outputAmount.toSignificant(6) 
    const priceImpact = tradeWethForDai.priceImpact.toSignificant(6)


    return {amountMinDAL,amountOf1Eth,amountOfOutputDAL,priceImpact}

}

async function getAmountFromEth1(amountOfEth,percent){
    const pair = await Fetcher.fetchPairData(DAI, WETH) 

    const routeWethForDai = new Route([pair], DAI);
    const tradeWethForDai = new Trade(routeWethForDai, new TokenAmount(DAI,  BigInt(amountOfEth*1E18)), TradeType.EXACT_INPUT);
    const slippageTolerance = new Percent('10', '1000')

    const amountMinDAL =  tradeWethForDai.minimumAmountOut(slippageTolerance).toSignificant(6)
    const amountOf1Eth = tradeWethForDai.executionPrice.toSignificant(6)
    const amountOfOutputDAL = tradeWethForDai.outputAmount.toSignificant(6) 
    const priceImpact = tradeWethForDai.priceImpact.toSignificant(6)


    return {amountMinDAL,amountOf1Eth,amountOfOutputDAL,priceImpact}

}

async function getAmountFromDAL(amountOfDAL,percent){
    const pair = await Fetcher.fetchPairData(DAI, WETH) 
    console.log({amountOfDAL})
    const routeWethForDai = new Route([pair], WETH);
    const tradeWethForDai = new Trade(routeWethForDai, new TokenAmount(DAI,  BigInt(amountOfDAL*1E18)), TradeType.EXACT_OUTPUT);
    const slippageTolerance = new Percent('10', '1000')

    const amountMaxOfEth =  tradeWethForDai.maximumAmountIn(slippageTolerance).toSignificant(6)
    const amountOf1Eth = tradeWethForDai.executionPrice.toSignificant(6)
    const amountOfInputOfEth = tradeWethForDai.inputAmount.toSignificant(6) 

    return {amountMaxOfEth,amountOf1Eth,amountOfInputOfEth}
}





async function buyOnlyone(min,amount,ERC) {
    // const minOut = "0x" + min.toString(16);
    console.log(min)
    console.log(amount)
    const minOut = new BigNumber(min)                      
    const value = new BigNumber(amount)                      
    var tokenAddress = '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea'; // ONLYONE contract address
    var WBNBAddress = '0xc778417e063141139fce010982780140aa0cd5ab'; // WBNB token address
    const account1 = '0x6456be06d125C0B7F661E6E09E695AF4d59D58D1';

    var pancakeSwapRouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
    var data = ERC.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(
        web3.utils.toHex(minOut),
        [WBNBAddress,
         tokenAddress],
        account1,
        web3.utils.toHex("1662928302"),
    );

    var count = await web3.eth.getTransactionCount(account1);
    var txObject = {
        from:account1,
        to:pancakeSwapRouterAddress,
        value:web3.utils.toHex(value),
        data:data.encodeABI(),
        nonce:web3.utils.toHex(count)
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
    try {
        const transaction = await web3.eth.sendSignedTransaction(raw)
    
        console.log(transaction)
    } catch (error) {
        console.log(error)
    }

}

const run = async ()=>{

    const ERC = await load()
    // const output = await getAmountFromEth(1,1)
    // console.log({output})
    const output = await getAmountFromDAL(12312,1)
    console.log({output})
    // buyOnlyone(output.amountMinDAL,new BigNumber(1000000000000000000),ERC)
    buyOnlyone(BigInt(12312*1E18),BigInt(output.amountMaxOfEth*1E18),ERC)
    
}   
run()