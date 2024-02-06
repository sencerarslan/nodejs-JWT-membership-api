const nodemailer = require("nodemailer");

// sendEmail adında bir asenkron fonksiyon tanımla, mailOptions parametresi alır
const sendEmail = async (mailOptions) => {
  // SMTP taşıyıcısını oluştur
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // SMTP sunucu adresi
    port: 587, // SMTP port numarası
    secure: false, // Güvenli bağlantı kullanılmayacak (TLS kullanılacak)
    auth: {
      user: process.env.EMAIL_USER, // E-posta kullanıcı adı
      pass: process.env.EMAIL_PASSWORD, // E-posta parolası
    },
  });

  // E-posta gönderme işlemini gerçekleştir
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error mail gönderilemedi: ", error);
    }
    return true;
  });
};

module.exports = sendEmail;
