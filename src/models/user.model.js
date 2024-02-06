const mongoose = require("mongoose");

// Kullanıcı şemasını tanımla
const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    reset: {
      code: {
        type: String,
        default: null,
      },
      time: {
        type: Date,
        default: null,
      },
    },
  },
  { collation: "users", timestamps: true }
);

// Kullanıcı modelini oluştur
const user = mongoose.model("users", userShema);

module.exports = user;
