
emailTransporter=require("../config/email.config")

function sendMail(mailOptions){
    emailTransporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return 0;
        } else {
            return 1;
        }
    });
    return true;
}
  
  const emailSender={}
  emailSender.sendMail=sendMail;
  module.exports = emailSender;