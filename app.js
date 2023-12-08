const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const errorMiddleware = require("./backend/middleware/error");

app.use(express.json());
app.use(cookieParser());

//Route Imports
const product = require("./backend/routes/productRoute");
const user = require("./backend/routes/userRoute");
const order = require("./backend/routes/orderRoute");
const payment = require("./backend/routes/paymentRoute");

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "build", "index.html"));
});

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
