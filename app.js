import {Transaction as Tx} from'ethereumjs-tx';
import Web3 from 'web3';
const web3 = new Web3('https://mainnet.infura.io/v3/fffda8246d9241f2aa056b563090838d');

const _ = web3.utils._
_.each({key1:'value1',key2:'value2'},(value,key)=>{
    console.log(key)
})

// web3.eth.getGasPrice(function(error, result) {
//     console.log(web3.utils.fromWei(result,'ether'))
// });

console.log(web3.utils.soliditySha3('123'))

// web3.eth.getBlockNumber().then((latest)=>{
//     for(let i=0;i<10;i++){
//         web3.eth.getBlock(latest-i, true, function(error, result) {
//             console.log(result.hash)
//         });
//     }
// });