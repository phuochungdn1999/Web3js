const Web3 = require("web3");
// const Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(
  "https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/eth/rinkeby"
);

// const abi = require('./abis/UniRouter.json')
// const bytecode = require('./abis/bytecode.json')
// const BigNumber = require('bignumber.js');

// const transactionHash = '0x27c434cf56a44547a4a638df85745b62af0894ad1f857d765e1c0f256ae0d7d3';
// web3.eth.getTransaction(transactionHash, function (error, result){
//     console.log("567567567")
//     console.log(result);
// });

// const {
//   account1,
//   account2,
//   contractAddress,
//   privateKey1,
//   privateKey2,
// } = require("./contract");

// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option

// const {
//   ChainId,
//   Token,
//   Fetcher,
//   Percent,
//   Route,
//   TradeType,
//   TokenAmount,
//   Trade,
// } = require("@uniswap/sdk");

// const DAI = new Token(
//   ChainId.RINKEBY,
//   "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
//   18
// );
// const WETH = new Token(
//   ChainId.RINKEBY,
//   "0xc778417e063141139fce010982780140aa0cd5ab",
//   18
// );

async function getAmountMin(amountOfEth, percent) {
  const pair = await Fetcher.fetchPairData(DAI, WETH);

  const routeWethForDai = new Route([pair], WETH);
  const tradeWethForDai = new Trade(
    routeWethForDai,
    new TokenAmount(WETH, amountOfEth),
    TradeType.EXACT_INPUT
  );
  const slippageTolerance = new Percent("1", "100");
  console.log(slippageTolerance.toString());

  return tradeWethForDai.minimumAmountOut(slippageTolerance).raw.toString();
}
async function test() {
  const amount = 1000;
  var count = await web3.eth.getTransactionCount(account1);

  const message = web3.utils
    .soliditySha3(
      { t: "address", v: "0xc860c73f034D9182fafF474ACA6B61bdC4cF1997" },
      { t: "address", v: "0xc860c73f034D9182fafF474ACA6B61bdC4cF1997" },
      { t: "uint256", v: amount },
      { t: "uint256", v: count }
    )
    .toString("hex");
  const { signature } = await web3.eth.accounts.sign(message, privKey);
  console.log(signature);
}

test();

const fetch = async () => {
  const pair = await Fetcher.fetchPairData(DAI, WETH);

  const routeWethForDai = new Route([pair], WETH);
  const tradeWethForDai = new Trade(
    routeWethForDai,
    new TokenAmount(WETH, BigInt(3e18)),
    TradeType.EXACT_INPUT
  );
  const tradeWethForDai1 = new Trade(
    routeWethForDai,
    new TokenAmount(DAI, BigInt(22363.2e18)),
    TradeType.EXACT_OUTPUT
  );

  const routeDaiForWeth = new Route([pair], DAI);
  const tradeDaiForWeth = new Trade(
    routeDaiForWeth,
    new TokenAmount(DAI, BigInt(22583e18)),
    TradeType.EXACT_INPUT
  );

  console.log(
    tradeWethForDai.executionPrice.toSignificant(9) + " DAI for 1 WETH"
  );

  console.log(
    tradeDaiForWeth.executionPrice.toSignificant(6) + " WETH for 1 DAI"
  );
  console.log(tradeWethForDai1.inputAmount.toSignificant(9) + " Eth for ? DAL");
  console.log(
    tradeWethForDai.priceImpact.toSignificant(9) + "    Eth for ? DAL"
  );
  const slippageTolerance = new Percent("50", "10000");
  // console.log(slippageTolerance)
  console.log(
    tradeWethForDai.minimumAmountOut(slippageTolerance).raw +
      "    123Eth for ? DAL"
  );
  console.log(
    tradeWethForDai.outputAmount.toSignificant(10) + " DAL for ? Eth"
  );
  console.log(
    tradeDaiForWeth.outputAmount.toSignificant(6) + " WETH for ? DAI"
  );
};

const privateKey =
  "9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef";

const uniswapAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

function loadContract() {
  return new web3.eth.Contract(abi, uniswapAddress);
}

const load = async () => {
  const ERC = await loadContract();
  return ERC;
};

async function buyOnlyone(min, amount, ERC) {
  // const minOut = "0x" + min.toString(16);
  const minOut = new BigNumber(min);
  var tokenAddress = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea"; // ONLYONE contract address
  var WBNBAddress = "0xc778417e063141139fce010982780140aa0cd5ab"; // WBNB token address
  const account1 = "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1";

  var pancakeSwapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  var data = ERC.methods.swapExactETHForTokensSupportingFeeOnTransferTokens(
    web3.utils.toHex(min),
    [WBNBAddress, tokenAddress],
    account1,
    web3.utils.toHex("1662928302")
  );

  var count = await web3.eth.getTransactionCount(account1);
  var txObject = {
    from: account1,
    to: pancakeSwapRouterAddress,
    value: web3.utils.toHex(amount),
    data: data.encodeABI(),
    nonce: web3.utils.toHex(count),
  };

  txObject.gasLimit = await web3.eth.estimateGas(txObject);
  txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice());
  console.log(txObject);
  //sign the transaction
  const tx = new Tx(txObject, { chain: "rinkeby" });
  const privateKeyToHex = Buffer.from(privateKey, "hex");
  tx.sign(privateKeyToHex);

  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");
  console.log(raw);
  // //broadcast the transaction
  try {
    const transaction = await web3.eth.sendSignedTransaction(raw);

    console.log(transaction);
  } catch (error) {
    console.log(error);
  }
}

async function getAmountOut(amount, ERC) {
  const DALAddress = "0x547370B9607B16B517958764326a2Fd198Fc9CE3";
  // const DAL_LPAddress = '0x4eCbC91397384D861b44002FDDA7e40A3dd48684'
  const WETH = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

  const address = [WETH, DALAddress];
  try {
    console.log({ amount });
    return await ERC.methods.getAmountsOut(amount, address).call();
  } catch (error) {
    console.log(error);
  }
}

async function getAmountIn(amount, ERC) {
  const DALAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
  const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

  const address = [WETH, DALAddress];
  try {
    console.log({ amount });
    return await ERC.methods.getAmountsIn(amount, address).call();
  } catch (error) {
    console.log(error);
  }
}

const run = async () => {
  const ERC = await load();
  var out = await getAmountOut(new BigNumber(1000000000000000), ERC);
  console.log(out);
  // var outMin = new BigNumber(out[1])
  // console.log(outMin)
  // const percent = 99.5
  // outMin = outMin.multipliedBy(percent)
  // outMin = outMin.div(100)
  // outMin = outMin.toFixed(0)
  // console.log(BigNumber.isBigNumber(outMin))
  // console.log(await getAmountIn(new BigNumber(1000000000000000000), ERC))
  // console.log(await buyOnlyone(new BigNumber(1000000000000000000),new BigNumber(135210521744283),ERC))
  // console.log(await getAmountMin(new BigNumber(3000000000000000000),50) )
  // fetch()
};
// run()

// send('9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef','0xc860c73f034D9182fafF474ACA6B61bdC4cF1997','0.00000001');
