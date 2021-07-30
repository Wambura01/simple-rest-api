const express = require("express");

const app = express(); //initialize express app

const PORT = 3000;

//setting the first endpoint response
app.get("/", (req, res) => {
  res.send("Hello Wambura, from Express!");
});

//setting the listening port
app.listen(PORT, () => {
  console.log(`The app is listening to port: ${PORT}`);
});
