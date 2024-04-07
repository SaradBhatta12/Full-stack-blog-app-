const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.mongo_uri, {
        dbName: "meeeeeeeeeee",
      })
      .then(() => {
        console.log("successfully connectd to db ");
      })
      .catch((err) => {
        console.log("something went to wrong " + err);
      });
  } catch (err) {
    console.log("faild to connect with database  " + err);
  }
};

module.exports = connectDB;
