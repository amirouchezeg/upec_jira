var nodemailer = require('nodemailer');


module.exports = class Email {

  constructor(email,type,token) {
    var message;
    if (type=="email_confirmer") {
      message='<p>Merci de cliquez sur le lien pour confirmer votre compte </p> <a href="http://localhost:4200/user/check_email?token='+token+'">lien</a>  <p> localhost:4200/user/check_email?token='+token+'</p>';
    } else {
      message=" <p>Quelqu'un vous a ajouté dans un projet sur le site JiraUpec connecter vous pour avoir vos projets </p><a href='http://localhost:4200/user'>Se connecter</a> <p> </p>"  
    }
    this.email = email;
    // console.log("constructor(email): "+email);
    this.isSend=false;
    this.isWait=true;
    this.transporter = nodemailer.createTransport({
      // service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'inmyblog656@gmail.com',
        pass: 'InmYblOg12341!'
      }
    });
    
    this.mailOptions = {
      from: 'inmyblog656@gmail.com',
      to: this.email,
      subject: 'Jira  Upec',
      html: message
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



