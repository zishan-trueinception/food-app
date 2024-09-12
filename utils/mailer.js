
const nodemailer = require('nodemailer');


function sendEmail(
    userEmail,
    emailBody,
    emailSubject

) { 

// Create a transporter object using Gmail SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mustkim.trueinception.in@gmail.com',  // Your email
      pass: 'okdx hnvf elsv fqvg',  // Your app password
    },
  });
  
  // Email data
  let mailOptions = {
    from: 'mustkim@truelink.ai',
    to: userEmail,     
    subject: emailSubject,           
    text: emailBody,         
  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
  
}
module.exports ={ sendEmail}

