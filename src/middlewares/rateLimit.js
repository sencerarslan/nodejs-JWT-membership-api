const rateLimit = require("express-rate-limit");

// İzin verilen IP adreslerinin listesi
const allowList = [];

// rate limiter middleware'i oluştur
const apiLimiter = rateLimit({
  // İsteğin belli bir zaman diliminde (15 dakika) yapabileceği maksimum istek sayısı
  windowMs: 15 * 60 * 1000,
  // Maksimum istek sayısını belirle
  max: (req, res) => {
    // İstek URL'sine göre farklı maksimum istek sayıları belirlenebilir
    if (req.url === "/login" || req.url === "/register" || req.url === "/forget-password") return 10;
    else return 100;
  },
  message: {
    success: false,
    message: "Çok fazla istekte bulunuldu!",
  },
  // İzin verilen IP adreslerini atla (sınırlamayı uygulama)
  skip: (req, res) => allowList.includes(req.ip),
  standarHeaders: true,
  leganceyHeaders: false,
});

module.exports = apiLimiter;
