const Moralis = require('moralis/node');

const serverUrl = "https://cq3wxyxczdtu.usemoralis.com:2053/server";
const appId = "au2Urg5BPMsHBVo0ngFic3eOM4qL2NFW1ibQTogZ";
Moralis.start({ serverUrl, appId })

async function main(){
// get BSC transactions for a given address
// with most recent transactions appearing first
const options = { chain: "0x13881", address: "0x6456be06d125C0B7F661E6E09E695AF4d59D58D1", order: "desc", from_block: "0" };
const transactions = await Moralis.Web3API.account.getTransactions(options);
console.log(transactions)
}
main()