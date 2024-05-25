import nodemailer from 'nodemailer';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayaallahyani@gmail.com',
    pass: 'rcspvqgbqsjmmdah'
  }
});

var mailOptions = {
  from: 'ayaallahyani@gmail.com',
  to: 'rimoelharras@gmail.com; rimoelharras@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});