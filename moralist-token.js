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
    //0xc2e9678a71e50e5aed036e00e9c5caeb1ac5987d https://ipfs.moralis.io:2053/ipfs/Qmb9pd2gZswkfoSi63tD9DRKghQd1CddFKcRxbergzPBG9
    // 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/8881
    // 0x0b4b2ba334f476c8f41bfe52a428d6891755554d https://storage.googleapis.com/mintpass/voyager4728.json
    //0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a https://api.sandbox.game/lands/82572/metadata.json
    // 0x031920cc2d9f5c10b444fd44009cd64f829e7be2 https://zunks.s3.amazonaws.com/metadata/11657
    // 0x8c186802b1992f7650ac865d4ca94d55ff3c0d17 https://hxg058ork2.execute-api.eu-west-1.amazonaws.com/prod/metadata/1897
    // 0xa5f1ea7df861952863df2e8d1312f7305dabf215 https://api.zed.run/api/v1/horses/metadata/100878
    const options = { address: "0x3d23a6926d9acb60e080adf565b1f1a27d2058bc", chain: "eth" };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
console.log(NFTs)
}

main()