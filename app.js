require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Express uygulaması oluşturulur
const app = express();

// Ortam değişkenlerini yükler
require("dotenv").config();

// MongoDB bağlantısı yapılır
require("./src/db/dbConnection");

// Hata yönetimi middleware'ini alır
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");

// CORS politikalarını belirlemek için kullanılan seçenekler alınır
const corsOptions = require("./src/helpers/corsOptions");

// API isteklerini sınırlamak için kullanılan limiter alınır
const apiLimiter = require("./src/middlewares/rateLimit");

// Uygulamanın çalışacağı port belirlenir
const port = process.env.PORT || 5001;

// Ana rotaları içeren router modülü alınır
const router = require("./src/routers");

// JSON ve URL kod çözücüler eklenir
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// CORS middleware'i eklenir
app.use(cors(corsOptions));

// API isteklerini sınırlayan limiter middleware'i eklenir
app.use("/api", apiLimiter);

// MongoDB sorgu güvenliği sağlayan middleware eklenir
app.use(mongoSanitize({ replaceWith: "_" }));

// Ana rotaların bulunduğu router modülü kullanılır
app.use("/api", router);

// Hata yönetimi middleware'i uygulamaya eklenir
app.use(errorHandlerMiddleware);

// Uygulama belirtilen portta başlatılır ve başlatma bilgisi konsola yazdırılır
app.listen(port, () => {
  console.log(`Server ${port} çalışıyor`);
});
