const nodemailer = require('nodemailer');

async function mail(to, subject, mail_body, mail_html) {
    try {
        const transport = await nodemailer.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            auth: {
                user: "olxgroup@mail.ru",
                pass: "kndUynkV9HqCFTneEuJ5",
            }
        })
    
        return await transport.sendMail({
            from: "'OLX group'  <olxgroup@mail.ru>",
            to,
            subject,
            text: mail_body,
            html: mail_html,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = mail