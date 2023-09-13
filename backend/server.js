const express = require("express");

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  console.log(`get request`);
  res.send("ji");
});

app.listen(port, () => {
  console.log(`listing on port ${port}`);
});
