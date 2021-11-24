const Web3 = require("web3");

const web3 = new Web3(
  "https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/polygon/mumbai"
);
const abi = require("./abis/CryptoStake.json");
const address = "0xa8fFEeb4b412EA1E819d4f09302c3459520e34c9";
const privKey =
  "9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef"; // Genesis private key
const addressFrom = "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1";

const obj1 = [
  "QmT9TtdyvE4AFVLWprks3NxFWU5LMYC73XEKK2D8HZ9Cjz",
];

const obj2 = [
  "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1",
  
];
let arrAddress = [];
let url = [];
let id = [];
const a = 326;
for (let index = 0; index < 100; index++) {
  const result = index % 10;
  arrAddress.push(obj2[result]);
  url.push(obj1[result]);
  id.push(a + index);
}

const deploy = async (abi, address) => {
  console.log(address)
  const contract = new web3.eth.Contract(abi, address);

  var data = contract.methods.mintBatch(arrAddress,id,url);

  var obj = {
    from: addressFrom,
    to: address,
    data: data.encodeABI(),
  };
  obj.gasLimit = await web3.eth.estimateGas(obj);

  const createTransaction = await web3.eth.accounts.signTransaction(
    obj,
    privKey
  );

  // Deploy transaction
  const createReceipt = await web3.eth.sendSignedTransaction(
    createTransaction.rawTransaction
  );
  console.log(createReceipt);
};

deploy(abi, address);
