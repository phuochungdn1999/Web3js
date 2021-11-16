const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction
const common = require('ethereumjs-common').default;
// const web3 = new Web3('https://rpc-mumbai.matic.today');
const Moralis = require('moralis/node');

const serverUrl = "https://cq3wxyxczdtu.usemoralis.com:2053/server";
const appId = "au2Urg5BPMsHBVo0ngFic3eOM4qL2NFW1ibQTogZ";
Moralis.start({ serverUrl, appId });
const abi = require("./abis/ERC721.json");

const web3 = new Moralis.Web3('https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/polygon/mumbai');

const contract = new web3.eth.Contract(abi, '0x5F855E730F50029526B111ae3f2706b6F99dd01B');
const {account1,account2,contractAddress,privateKey1,privateKey2} = require('./contract');

async function mint() {
  
  var data = contract.methods.mint('0x479Dc3d96A1C8F7Be1306d6a8a381795e8097E3c','4','QmSFCUAJ8Kw1S1J5Bgro1ZmpiJQhWaQ2Nm8ikQ2ahivvVK');

  var count = await web3.eth.getTransactionCount(account1);
  var txObject = {
      from:'0x6456be06d125C0B7F661E6E09E695AF4d59D58D1',
      to:'0x5F855E730F50029526B111ae3f2706b6F99dd01B',
      value:0x0,
      data:data.encodeABI(),
      nonce:web3.utils.toHex(count)
  };

  txObject.gasLimit = await web3.eth.estimateGas(txObject)
  txObject.gasPrice = web3.utils.toHex(await web3.eth.getGasPrice())
  console.log(txObject)

  const commonMatic = common.forCustomChain(
    'mainnet',
    {
      name: 'matic-test',
      networkId: 80001,
      chainId: 80001,
      url: 'https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/polygon/mumbai'
    },
    'petersburg'
  )
  //sign the transaction
  const tx = new Tx(txObject, {common:commonMatic})
  const privateKeyToHex = Buffer.from('9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef','hex');
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

mint()


