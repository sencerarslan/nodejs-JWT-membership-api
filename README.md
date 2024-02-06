# Node.js JWT ile Üyelik Sistemi API

Bu proje, Node.js kullanılarak geliştirilmiş bir üyelik sistemi API'si sağlar. JSON Web Token (JWT) kullanılarak kimlik doğrulama ve yetkilendirme sağlanır. Kullanıcı kaydı, girişi, profil bilgilerinin alınması, şifre sıfırlama gibi işlemleri gerçekleştirebilirsiniz.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Token) ile kimlik doğrulama
- bcrypt ile şifreleme
- Joi ile veri doğrulama
- Nodemailer ile e-posta gönderme
- express-rate-limit ile API isteklerinin sınırlanması
- express-mongo-sanitize ile MongoDB sorgularının güvenli hale getirilmesi
- cors ile Cross-Origin Resource Sharing (CORS) yönetimi

## Başlarken

1. Projeyi klonlayın: `git clone https://github.com/sencerarslan/nodejs-authentication-app.git`
2. Proje dizinine gidin: `cd nodejs-auth-app`
3. Gerekli bağımlılıkları yükleyin: `npm install`
4. `.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ayarlayın (örneğin, veritabanı bağlantısı, JWT anahtarı, e-posta hesabı vb.).
5. Uygulamayı başlatın: `npm start`

## Endpoints (Rotalar)

- `POST /api/login`: Kullanıcı girişi için
- `POST /api/register`: Kullanıcı kaydı için
- `GET /api/me`: Mevcut kullanıcı bilgilerini getirir
- `GET /api/users`: Tüm kullanıcıları getirir (Yönetici için)
- `POST /api/forget-password`: Şifreyi sıfırlamak için sıfırlama kodu oluşturur ve e-posta gönderir
- `POST /api/reset-code-check`: Sıfırlama kodunun doğruluğunu kontrol eder
- `POST /api/reset-password`: Şifreyi sıfırlar
 