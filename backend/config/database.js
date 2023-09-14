const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then((data) => {
      console.log(
        `Mongo DB connected host : ${data.connection.host}`.green.bgBlue
      );
    })
    .catch((error) => {
      console.log(`error ${error.message}`.bgRed);
      process.exit();
    });
};

module.exports = connectToDB;
