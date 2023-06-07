const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("[server/mongoose] Connected to MongoDB");
  })
  .catch((error) => {
    console.log("[server/mongoose] Error while connecting to MongoDB.", error);
  });
