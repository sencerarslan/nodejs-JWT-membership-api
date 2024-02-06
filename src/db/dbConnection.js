const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB veritabanına bağlan
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Veritabanında bağlandı.");
  })
  .catch((err) => {
    console.log("Veritabanına bağlantı hatası: ", err);
  });
