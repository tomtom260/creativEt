import mail from "@sendgrid/mail"

mail.setApiKey(process.env.SENDGRID_API_KEY!)

type MailOptions = {
  to: string
  subject: string
  message: string
}

export default async function sendMail({ to, subject, message }: MailOptions) {
  await mail
    .send({
      from:"creative.et251@gmail.com",
      to,
      subject,
      html: message.replace(/\r\n/g, "<br/>"),
      text: message,
    })
    .then(
      (data) => {
        console.log(data)
      },
      (err) => console.log(err)
    )
}
