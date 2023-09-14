const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });
require("colors");

// Handle Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shuting down the server due to Uncaught Promise Rejection`);
  process.exit(1);
});

//Config
const connectDataBase = require("./config/database");

//Connect to database
connectDataBase();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`listing on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
