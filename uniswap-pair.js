const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transaction;
const web3 = new Web3(
  "https://mainnet.infura.io/v3/fffda8246d9241f2aa056b563090838d"
);

const abi = require("./abis/UniPair.json");

const pairAddress  = "0xDFC14d2Af169B0D36C4EFF567Ada9b2E0CAE044f"

function loadContract() {
    return new web3.eth.Contract(abi, pairAddress);
  }
  
  const load = async () => {
    const ERC = await loadContract();
    return ERC;
  };
  const loadData = async () => {
    const ERC = await load();
    // console.log(ERC)
    const balance = await ERC.methods
    .price0CumulativeLast()
    .call();
  console.log(balance)
  console.log( await ERC.methods
    .getReserves()
    .call())
  
  };

  const run = async () => {
    await loadData()
   
  };
run()
const a = (-24501281759005549717265513966115776052508 + 24503854954890803059083959020150076200426)/1634115912;
console.log(a)
