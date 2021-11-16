// require the express module
const express = require("express");
// create an object from the express function which we contains methods for making requests and starting the server
const app = express();
const userRoutes = require("./router/userRouter");

app.use(express.json());

app.use(function (req, res, next) {
  console.log("our middleware ran!");
  return next();
});
app.use(userRoutes);
app.use("/", (req, res) => {
  return res.json("Hello world");
});

app.listen(3000, function () {
  console.log(
    "The server has started on port 3000. Head to localhost:3000 in the browser and see what's there!"
  );
});
