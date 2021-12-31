const nodemailer=require('nodemailer');
let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});
const sendEMail =(to,subject,emailMessage)=> {
    const message={
        from: 'anuragkrgupta14@gmail.com', // Sender address
        to: 'anuragkrgupta14@gmail.com',         // List of recipients
        subject: subject, // Subject line
        html: emailMessage
    }  
    let success=true;  
    transport.sendMail(message, function(err, info) {
        if (err) {
            //throw new Error('Something wrong');
            success=false;
        } 
    });
    return success;
};

module.exports={
    sendEMail:sendEMail
};