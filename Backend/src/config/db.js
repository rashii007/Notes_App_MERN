const mongoose = require("mongoose");

async function connectDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected success");
    })
    .catch(() => {
      console.log("There is same error in connecting");
    });
}

module.exports = connectDB;
