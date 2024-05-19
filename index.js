require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

//const supplierModel = require("./model/supplier.model");

const mongoose = require("mongoose");


const PORT = process.env.PORT || 9000;

connectDB();
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => process.exit(1));
});
