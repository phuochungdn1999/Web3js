const OpenseaScraper = require("opensea-scraper");

// which nft project to scrape?

async function main(){
const slug = "zed-run-official";

// get basic info (from the opensea API)
// const basicInfo = await OpenseaScraper.basicInfo(slug);

// scrape the correct floor price from opensea
// const floorPrice = await OpenseaScraper.floorPrice(slug);
// console.log(floorPrice)
// scrape the correct floor price from opensea by inserting a custom link
// this is usefull for example if you need the floor price for a sandbox LAND
// token, because the sandbox collection holds both assets and land, with assets
// traditionally being a lot cheaper
// const floorPriceByUrl = await OpenseaScraper.floorPriceByUrl(
//   "https://opensea.io/collection/zed-run-official"
// );


// console.log(floorPriceByUrl)

// get offers from opensea. Each offer holds not only the floor price but also the tokenId.
// the resultSize is the number of offers you want to fetch.
const resultSize = 10;
const offers = await OpenseaScraper.offers(slug, resultSize);
console.log(offers.offers.length)
for (const offer of offers.offers) {
    console.log(offer.floorPrice)
}
// get offers from opensea using a custom link. Each offer holds not only the floor price but also the tokenId.
// the resultSize is the number of offers you want to fetch.
// // const resultSize = 10;
// const url =
//   "https://opensea.io/collection/sandbox?search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Type&search[stringTraits][0][values][0]=Land&search[toggles][0]=BUY_NOW";
// const offers = await OpenseaScraper.offersByUrl(url, resultSize);

// scrape all slugs, names and ranks from the top collections from the rankings page sorted by all time volume:
// => https://opensea.io/rankings?sortBy=total_volume
// const pagesToScrape = 5; // 100 results per page. 5 pages = 200 results...
// const ranking = await OpenseaScraper.rankings(pagesToScrape);
// console.log(ranking)
}

main()