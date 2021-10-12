let Jimp = require("jimp");

// let image = new Jimp(300, 530, "green", (err, image) => {
//   if (err) throw err;
// });

let message = "Hello!";
let x = 10;
let y = 10;
// const client = require("ipfs-http-client");

// const test =async ()=>{
//     let image = new Jimp(300, 530, "green")
//     console.log({image})
//     const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
//     // console.log({font})
//     await image.print(font, x, y, message);
//     console.log(image.getExtension())
//     let file = `new_name.${image.getExtension()}`;
//     console.log(Buffer(image.bitmap.data));
//     return image.write(file);
// }
const fs = require('fs')
fs.readFile("new_name.png", {encoding: 'base64'}, function(err, base64data) {
    console.log(base64data)
 });
// const run = async()=>{
//     await test()
// }
// try {
//     run()

// } catch (error) {
//     console.log(error)
// }
// Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
//   .then((font) => {
//     console.log("123123");
//     image.print(font, x, y, message);
//     return image;
//   })
//   .then(async(image) => {
//     let file = `new_name.${image.getExtension()}`;
//     console.log(image);
//     return await image.write(file); // save
//   });
