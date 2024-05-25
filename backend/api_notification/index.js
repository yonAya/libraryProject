import express from 'express';
import amqp from 'amqplib';
import nodemailer from 'nodemailer';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const app = express();

var connection, channel;
const url_rabbit = process.env.url_rabbit;
const qNotif = process.env.q3;
const qRequest = process.env.qRequest;
const qResponse = process.env.qResponse;

const connectRabbitMQ = async () => {
  connection = await amqp.connect(url_rabbit);
  channel = await connection.createChannel();
  await channel.assertQueue(qNotif);
  await channel.assertQueue(qRequest);
  await channel.assertQueue(qResponse);
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayaallahyani@gmail.com',
    pass: '', // I removed my app password
  },
});

const requestClientEmails = async () => {
  return new Promise((resolve, reject) => {
    channel.sendToQueue(qRequest, Buffer.from('Requesting client emails'));

    channel.consume(
      qResponse,
      (msg) => {
        const clientEmails = JSON.parse(msg.content.toString());
        channel.ack(msg);
        resolve(clientEmails);
      },
      { noAck: false }
    );
  });
};

connectRabbitMQ().then(() => {
  console.log('Notification service connected to RabbitMQ');

  channel.consume(qNotif, async (data) => {
    const book = JSON.parse(data.content.toString());
    const clientEmails = await requestClientEmails();

    var mailOptions = {
      from: 'ayaallahyani@gmail.com',
      to: clientEmails.join(','),
      subject: 'New Book Added!',
      text: `A new book titled "${book.title}" by ${book.author} has been added.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
});

app.listen(process.env.port, (err) => {
  if (err) console.log('Unable to start server');
  else console.log('Server started');
});
