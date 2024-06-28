const nodemailer = require("nodemailer")
const sendEmail = async (emailData) =>{
    try {
        const transporter = nodemailer.createTransport({

            service: 'gmail',
            auth: {
              user: process.env.SMTP_USERNAME,
              pass: process.env.SMTP_PASSWORD,
            },
          });
        
          const mailOptions = {
            from: process.env.SMTP_USERNAME,
            to: emailData.email,
            subject: emailData.subject,
            html: emailData.html,
          };
        
          const info = await transporter.sendMail(mailOptions);
          console.log("🚀 ~ exports.sendEmail= ~ info:", info)
          
    } catch (error) {
    console.log("🚀 ~ sendEmail ~ error:", error)
    throw error
    }
}

module.exports = sendEmail