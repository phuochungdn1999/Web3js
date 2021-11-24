const Web3 = require("web3");

const web3 = new Web3(
  "https://speedy-nodes-nyc.moralis.io/8050153ba727567749f63d00/polygon/mumbai"
);
const abi = require("./abis/CryptoStake.json");

const address = "0xa8fFEeb4b412EA1E819d4f09302c3459520e34c9"


const main = async (txn)=>{
    const transaction = await web3.eth.getTransactionReceipt(txn)
    console.log(transaction.logs)
    // transaction.logs.forEach(element => {
    //     console.log(element.topics)
    // });

    const data  = web3.eth.abi.decodeLog([
        
        {
        type: 'address',
        name: 'from',
        indexed: true
    },
    {
        type: 'address',
        name: 'to',
        indexed: true
    },{
        type: 'unit256',
        name: 'tokenId',
        indexed: true
    }],
    '0x',
    ['0x0000000000000000000000000000000000000000000000000000000000000000', '0x0000000000000000000000003f387f51a903f883a4213410da89e6d10f0849f2','0x0000000000000000000000000000000000000000000000000000000000000143']);
    // console.log(data)
    
}

main('0xa6a08aaa3f8cc2246cc119e545de065de6031284a0d5c66eae2e72528ae7aa72')
