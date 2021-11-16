import { decodeAddress } from "@polkadot/util-crypto";
import BigNumber from "bignumber.js";
const Web3 = require("web3");

const web3 = new Web3(
  "https://shiden-api.bwarelabs.com/7f715b14-4659-46e8-8f33-9e6d0c206bf3"
);

const convertToEvmAddress = () => {
  const temp = [
    "VwLiPuRiYarBMFWBmzB7KU3Ku5x9GvqNSt4LQgNP2Dat3Qz",
    "VwcZz1E9hQkQtMKX7tX25RCtPx6mpgo9uxyLMu4hUMyW2xZ",
    "VwtGNoNomECjs53mKVTvzBnsTU7mqL4VTD24qjaBqFhADkn",
    "Vx9HTrb8RLYsMAo3QD5T9K71JmCX1i4diH3DT5fSgo5MTXQ",
    "VxKQJYPqPQhuF4haU4M2BGYy434f2KWo2Ak4Z2PjUhtrChH",
    "Zt3WMRfzxuXrKA4zasHN4cVaWJ3xpcSZMf7cUrB7Uytkv64",
    "Zth6J9oCAsxGQ3L4jo1nvedXgBv2J63jqiwp6r9ddUHGvvw",
  ];
  temp.forEach((element) => {
    // console.log(element);
    let addressBytes = decodeAddress(element);
    let a = "0x" + Buffer.from(addressBytes.subarray(0, 20)).toString("hex");
    console.log(a);
  });
};

// convertToEvmAddress();
const desArr = [
  "0x38d4357b798522f3b4e3d89d8b0c606eb09ba9c1",
  "0xca437a095a5ae35460139c2bceda1e591e894d4e",
];
const {
  account1,
  account2,
  contractAddress,
  privateKey1,
  privateKey2,
} = require("./contract");
const abi = require("./abis/send-sdn.json");
const address = "0xEbAA02469D1D21928f57889a01A72a6d928Dfb94";

const privateKey =
  "9c36bd51fd273f4b4843a76a6c83ab0931c7f5876806297e0b8112b29dd6c0ef";
// send(account1, abi, address, privateKey);

// Variables definition
const privKey =
  "bfb16b7a1f7d5623d902791b61747a9e5b9f9b40a7fd247bfbcdd4a3e844fbad"; // Genesis private key
const addressFrom = "0x96B18a23114003902c7ee6b998037ACbD1B4332b";
const addressTo = "0xEbAA02469D1D21928f57889a01A72a6d928Dfb94";
console.log(desArr.length);

// Create transaction
const deploy = async (abi, address) => {
  const contract = new web3.eth.Contract(abi, address);
  const number = desArr.length;
const amount = "10000000000000000";
const value = new BigNumber(amount).multipliedBy(number).toString();
  var data = contract.methods.batchEtherSend(web3.utils.toHex(amount), desArr);
  console.log(
    `Attempting to make transaction from ${addressFrom} to ${addressTo}`
  );
  var obj = {
    from: addressFrom,
    to: addressTo,
    value: value,
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
