const stakers = require('./abis/staker.json')
const BigNumber = require("bignumber.js")
const decimal = new BigNumber(1000000000000000000);
let value = new BigNumber(0)
stakers.forEach(staker => {
    let  bignumber = new BigNumber(staker.amount, 16);
    let temp = bignumber.toString(10);
    let temp1 = new BigNumber(temp).dividedBy(decimal)
    console.log(temp1.toString())
    // console.log(staker.address)
    value = value.plus(temp1)

});
console.log("value",value.toString())