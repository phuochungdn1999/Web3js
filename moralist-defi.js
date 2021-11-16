const Moralis = require('moralis/node');

const serverUrl = "https://cq3wxyxczdtu.usemoralis.com:2053/server";
const appId = "au2Urg5BPMsHBVo0ngFic3eOM4qL2NFW1ibQTogZ";
Moralis.start({ serverUrl, appId });
async function main(){
    try {
        const options = {
            token0_address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
            token1_address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
            exchange: "pancakeswapv2",
            chain: "bsc"
           };
          const pairAddress = await Moralis.Web3API.defi.getPairAddress(options);
          console.log(pairAddress)


          const options1 = {
            address: "0x58f876857a02d6762e0101bb5c46a8c1ed44dc16",
            pair_address:'0x58f876857a02d6762e0101bb5c46a8c1ed44dc16',
            chain: "bsc"
           };
          const reserves = await Moralis.Web3API.defi.getPairReserves(options1);
          console.log(reserves)
          console.log(await Moralis.Web3API.defi)
        
    } catch (error) {
        console.log(error)
    }
}
main()
