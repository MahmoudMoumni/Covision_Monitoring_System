var nodemailer = require('nodemailer');
var emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mahmoudmoumni12340@gmail.com',
        pass: 'jkxfxlrnjknqrxji'
    }
});

module.exports = emailTransporter;