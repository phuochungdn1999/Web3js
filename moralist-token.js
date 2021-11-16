const Moralis = require('moralis/node');
const serverUrl = "https://a0wlgsrl84ut.usemoralis.com:2053/server";
const appId = "cAsiJ7iPBhIPTuxfhJWaPJylSo6kgrdQwDLdRWNn";
Moralis.start({ serverUrl, appId });
async function main(){
    // const options = { address: "0xA52d7C9594df0E06Da700A00D7D30D2bDEF43a5b", order: "name.ASC",chain: "0x4"  };
    // const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
    // console.log(nftOwners)

//     const options = { address: "0xa8fFEeb4b412EA1E819d4f09302c3459520e34c9", order: "name.ASC",chain: "mumbai", offset:0};
//     const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
//     console.log(nftOwners)

//     const options1 = { address: "0x5f855e730f50029526b111ae3f2706b6f99dd01b", chain: "mumbai" };
// const NFTs = await Moralis.Web3API.token.getAllTokenIds(options1);
// console.log(NFTs)
    // const options = { address: "0xa5f1ea7df861952863df2e8d1312f7305dabf215", limit: "500", chain: "polygon" };
    // const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
    // console.log(NFTTrades)

    const options = { address: "0x495f947276749ce646f68ac8c248420045cb7b5e", chain: "eth" };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
console.log(NFTs)
}

main()