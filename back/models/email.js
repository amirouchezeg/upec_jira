var nodemailer = require('nodemailer');


module.exports = class Email {

  constructor(email) {
    this.email = email;
    console.log("constructor(email): "+email);
    this.isSend=false;
    this.isWait=true;
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'inmyblog656@gmail.com',
        pass: 'InmYblOg12341!'
      }
    });
    
    this.mailOptions = {
      from: 'notReplay@gmail.com',
      to: this.email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

  }

  async sendOne () {
    return await sendMail();
  }

  async sendMail(){
    console.log("sendEmail(email) " + this.email);
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("error Send Email ",error);
        // this.isSend=false;
        this.isWait=false;
      } else {
        console.log('Email sent:...... ' + info.response);
        // this.isSend=true;
        this.isWait=false;
        console.log('Sended Done');
      }
    });
  }

  isWaitFun(){
    return this.isWait;
  }

}



