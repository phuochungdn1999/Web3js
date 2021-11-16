const  Web3 = require( "web3");
// import { abi as IUniswapV2Pair } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
// import { BigNumber } from "bignumber.js";
// import { ChainId, Token, WETH, Fetcher, Route } from "@uniswap/sdk";
const IUniswapV2Pair = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve1",
          "type": "uint112"
        }
      ],
      "name": "Sync",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MINIMUM_LIQUIDITY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PERMIT_TYPEHASH",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getReserves",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "reserve1",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "blockTimestampLast",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "kLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price0CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price1CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "skim",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "sync",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token0",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const BigNumber = require("bignumber.js");
const {
    ChainId, Token, WETH, Fetcher, Route
} = require("@uniswap/sdk");
// Create a new Web3 Instance
const web3 =  new Web3(
    "https://mainnet.infura.io/v3/fffda8246d9241f2aa056b563090838d"
  );

// Replace the addresses to point to your Farming Contract
// and LP Token Contract on the desired network
const FARMING_CONTRACT_ADDRESS = "0xc5B6488c7D5BeD173B76Bd5DCA712f45fB9EaEaB";
const LP_TOKEN_ADDRESS = "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e";

// Get DOGECOIN price in ETH
const getDogecoinPriceInETH = async () => {
  try {
    const DOGECOIN = new Token(
      ChainId.MAINNET, //ChainId for Ethereum Mainnet
      "0x4206931337dc273a630d328da6441786bfad668f", //DOGECOIN address on Ethereum Mainnet
      8 //Number of Decimals
    );
    const pair = await Fetcher.fetchPairData(DOGECOIN, WETH[DOGECOIN.chainId]);
    const route = new Route([pair], WETH[DOGECOIN.chainId]);
    return route.midPrice.toSignificant(6);
  } catch (e) {
    console.log(e);
    return 0;
  }
};

// Get DOGECOIN price in BNB
const getDodgecoinPriceInBNB = async () => {
  try {
    const response = await fetch("https://api.pancakeswap.info/api/v2/tokens");
    const priceData = await response.json();
    return priceData.data["0xbA2aE424d960c26247Dd6c32edC70B295c744C43"]
      .price_BNB; //Address of DOGECOIN on BSC Mainnet
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const getLpTokenReserves = async () => {
  try {
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );
    const totalReserves = await LpTokenContract.methods.getReserves().call();
    // For ETH/DOGE Pool totalReserves[0] = ETH Reserve and totalReserves[1] = DOGE Reserve
    // For BNB/DOGE Pool totalReserves[0] = BNB Reserve and totalReserves[1] = DOGE Reserve
    return [totalReserves[0], totalReserves[1]];
  } catch (e) {
    console.log(e);
    return [0, 0];
  }
};

const getLpTokenTotalSupply = async () => {
  try {
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );
    const totalSupply = await LpTokenContract.methods.totalSupply().call();
    return totalSupply;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const calculateLpTokenPrice = async () => {
  let rewardTokenPrice = 0;
  // For Price IN ETH
  // Reward Token is Dodgecoin in our case
  rewardTokenPrice = await getDogecoinPriceInETH();

  // For Price in BNB
  // If you want to do calculations in BNB uncomment the line below and comment line number 78
  // rewardTokenPrice = await getDodgecoinPriceInBNB()

  // 1 * rewardTokenPrice because 1 is the price of ETH or BNB in respective mainnet
  // This is square root of (p0 * p1) with reference to the image above
  const tokenPriceCumulative = new BigNumber(1 * rewardTokenPrice).sqrt();

  // For ETH / DOGE pair totalReserve[0] = ETH in the contract and totalReserve[1] = DOGE in the contract
  // For BNB / DOGE pair totalReserve[0] = BNB in the contract and totalReserve[1] = DOGE in the contract
  const totalReserve = await getLpTokenReserves();

  // This is square root of (r0 * r1) with reference to the image above
  const tokenReserveCumulative = new BigNumber(totalReserve[0])
    .times(totalReserve[1])
    .sqrt();

  // Total Supply of LP Tokens in the Market
  const totalSupply = await getLpTokenTotalSupply();

  // Calculate LP Token Price in accordance to the image above
  const lpTokenPrice = tokenReserveCumulative
    .times(tokenPriceCumulative)
    .times(2)
    .div(totalSupply);

  // If lpTokenPrice is a valid number return lpTokenPrice or return 0
  return lpTokenPrice.isNaN() || !lpTokenPrice.isFinite()
    ? 0
    : lpTokenPrice.toNumber();
};

const calculateAPY = async () => {
  try {
    //BLOCKS_PER_DAY varies acccording to network all values are approx and they keep changing
    //BLOCKS_PER_DAY = 21600 for Kovan Testnet
    //BLOCKS_PER_DAY = 28800 for BSC Testnet
    //BLOCKS_PER_DAY = 6400 for Ethereum Mainnet
    //I am using the value for Ethereum mainnet
    const BLOCKS_PER_YEAR = 6400 * 365;

    let rewardTokenPrice = 0;
    // For Price IN ETH
    // Reward Token is Dodgecoin in our case
    rewardTokenPrice = await getDogecoinPriceInETH();

    // For Price in BNB
    // If you want to do calculations in BNB uncomment the line below and comment line number 124
    // rewardTokenPrice = await getDodgecoinPriceInBNB()

    // REWARD_PER_BLOCK = Number of tokens your farming contract gives out per block
    const REWARD_PER_BLOCK = 10000000000;
    const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
      .times(REWARD_PER_BLOCK)
      .times(BLOCKS_PER_YEAR);

    // Get Total LP Tokens Deposited in Farming Contract
    const LpTokenContract = new web3.eth.Contract(
      IUniswapV2Pair,
      LP_TOKEN_ADDRESS
    );

    const totalLpDepositedInFarmingContract = await LpTokenContract.methods
      .balanceOf(FARMING_CONTRACT_ADDRESS)
      .call();

    // Calculate LP Token Price
    const lpTokenPrice = await calculateLpTokenPrice();

    // Calculate Total Price Of LP Tokens in Contract
    const totalPriceOfLpTokensInFarmingContract = new BigNumber(
      lpTokenPrice
    ).times(totalLpDepositedInFarmingContract);

    // Calculate APY
    const apy = totalRewardPricePerYear
      .div(totalPriceOfLpTokensInFarmingContract)
      .times(100);

    // Return apy if apy is a valid number or return 0
    return apy.isNaN() || !apy.isFinite() ? 0 : apy.toNumber();
  } catch (e) {
    console.log(e);
    return 0;
  }
};
async function test(){

    console.log(await calculateAPY())
}

test();