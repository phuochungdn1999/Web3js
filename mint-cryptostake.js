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
  "QmecxcFjiEXqLGwqHeGBTQzcbWG7wZR4QETezvUzHujypM",
  "QmaWFTJkMXLgo8eEXWWJuU3pCP2BBsifJhei1q11ju8jHv",
  "QmQbkdfmDsEyjW4PnGYZYxJvgo2gr7o23FvatVndAonZEF",
  "QmSfpjaHNv7QXCosoVhovAMmtafAu5kqeQSmwEKjVhB7zR",
  "QmSfpjaHNv7QXCosoVhovAMmtafAu5kqeQSmwEKjVhB7zR",
  "QmSfpjaHNv7QXCosoVhovAMmtafAu5kqeQSmwEKjVhB7zR",
  "QmSfpjaHNv7QXCosoVhovAMmtafAu5kqeQSmwEKjVhB7zR",
  "QmUKgb5rQtuw5qaoUMNd62UQpxmvw8yPmmPGJEqggg8Wzb",
  "Qmd1Q13u7iKJb8a3PozwJ47XTJCdiAVkx53BVUz9Jrb4iW",
];

const obj2 = [
  "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1",
  "0x3F387f51a903F883A4213410Da89E6d10F0849F2",
  "0xe8b11559b14ad52537C13722b62305fA25113E43",
  "0xAf53d1f495Db205577B76aA4996a0C0bD9c4f4A5",
  "0xbb4E146a9c8b41A23113Da253a1c9c24Ae786519",
  "0xbb4E146a9c8b41A23113Da253a1c9c24Ae786519",
  "0x96B18a23114003902c7ee6b998037ACbD1B4332b",
  "0x31a756Ee691adEEFB62D71cF13e9Da5D47828F38",
  "0xbFc8E9F2a0E08141aa785e90c6C4fdbC15c5cbF3",
  "0xbFc8E9F2a0E08141aa785e90c6C4fdbC15c5cbF3",
];
let arrAddress = [];
let url = [];
let id = [];
const a = 207;
for (let index = 0; index < 100; index++) {
  const result = index % 10;
  arrAddress.push(obj2[result]);
  url.push(obj1[result]);
  id.push(a + index);
}

const deploy = async (abi, address) => {
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
