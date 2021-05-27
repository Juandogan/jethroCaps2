
//mail
const nodemailer = require('nodemailer');
module.exports = (formulario) => {
 var transporter = nodemailer.createTransport({
 service: 'Ferozo',
 host: "c2010888.ferozo.com",
 port: 465,   
 secure: true,
 auth: {
 user: 'info@jethrocaps.com', // Cambialo por tu email
 pass: 'PatricioRobles1' // Cambialo por tu password
        
 }

 });
const mailOptions = {
    from: `"${formulario.nombre}" <${formulario.email}>`,
    to: formulario.email, // Cambia esta parte por el destinatario
    subject: formulario.asunto,
    html: `
    <strong>Nombre:</strong> ${formulario.nombre} <br/>
    <strong>E-mail:</strong> ${formulario.email} <br/>
    <strong>Mensaje:</strong> ${formulario.mensaje}<br/>
    `
 };
transporter.sendMail(mailOptions, function (err, info) {
 if (err)
 console.log(err)
 else
 console.log(info);
 });
}
//mail