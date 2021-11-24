import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import { Route } from "@uniswap/v3-sdk";
import { Trade } from "@uniswap/v3-sdk";
import { abi as QuoterABI } from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";

const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/eth/rinkeby");

const poolAddress = "0x936e7A850948350501Cd567E06C8Ca6f53B95bF5";

const poolContract = new ethers.Contract(
  poolAddress,
  IUniswapV3PoolABI,
  provider
);

const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, provider);

async function getPoolImmutables() {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);


  const immutables = {
    factory,
    token0,
    token1,
    fee,
    tickSpacing,
    maxLiquidityPerTick,
  };
  console.log(immutables)
  return immutables;
}

async function getPoolState() {
  // note that data here can be desynced if the call executes over the span of two or more blocks.
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  const PoolState = {
    liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };

  return PoolState;
}

async function main() {
  // query the state and immutable variables of the pool
  const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
  ]);

  // create instances of the Token object to represent the two tokens in the given pool
  const TokenA = new Token(3, immutables.token0, 6, "USDC", "USD Coin");

  const TokenB = new Token(3, immutables.token1, 18, "WETH", "Wrapped Ether");

  // create an instance of the pool object for the given pool
  const poolExample = new Pool(
    TokenA,
    TokenB,
    immutables.fee,
    state.sqrtPriceX96.toString(), //note the description discrepancy - sqrtPriceX96 and sqrtRatioX96 are interchangable values
    state.liquidity.toString(),
    state.tick
  );

  // assign an input amount for the swap
  const amountIn = 100000000000000;

  // call the quoter contract to determine the amount out of a swap, given an amount in
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    immutables.token1,
    immutables.token0,
    immutables.fee,
    amountIn.toString(),
    0
  );
  console.log('123123',quotedAmountOut)

  // create an instance of the route object in order to construct a trade object
  const swapRoute = new Route([poolExample], TokenA, TokenB);

  // create an unchecked trade instance
  const uncheckedTradeExample = await Trade.createUncheckedTrade({
    route: swapRoute,
    inputAmount: CurrencyAmount.fromRawAmount(TokenA, amountIn.toString()),
    outputAmount: CurrencyAmount.fromRawAmount(
      TokenB,
      quotedAmountOut.toString()
    ),
    tradeType: TradeType.EXACT_INPUT,
  });

  // print the quote and the unchecked trade instance in the console
  console.log("The quoted amount out is", quotedAmountOut.toString());
  console.log("The unchecked trade object is", uncheckedTradeExample.swaps[0].outputAmount);
}

main();