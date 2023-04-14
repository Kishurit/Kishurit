import { Mailer } from 'nodemailer-react'

const PasswordEmail = () => ({
  subject: `Welcome to Kishurit!`,
  body: (
    <body>
      <h1>Hello Benny,</h1>
      <p>Your password is:</p>
      <p>Qwerty60</p>
    </body>
  ),
})

const email = () => {
  const sendMail = () => {
    
    const mailerConfig = {
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        auth: { user: 'drushimgalil@gmail.com', pass: 'qwerti60' },
      },
      defaults: {
        from: { name: 'mathieutu', address: 'oss@mathieutu.dev' },
      },
    }
        
    /** Instance of mailer to export */
    const mailer = Mailer(mailerConfig, PasswordEmail)
    
    /**
     * Send mail in your application, by passing:
     * - Your email template name: key of the email in the record you've provided.
     * - The props of your email component
     * - The options of email (to, from, attachments, etc.) @see https://nodemailer.com/message/
     */
    
    /** A first email sent */
    mailer.send('PasswordEmail', {
      firstName: 'Mathieu',
      brand: 'MyWebsite',
      newAccount: true,
      password: Math.random().toString(36).substring(7),
    }, {
      to: 'foo@bar.fr',
      attachments: [{ content: 'bar', filename: 'foo.txt' }],
    })
    
    /** A second email sent 
    mailer.send('ReminderEmail', {
      firstName: 'Mathieu',
      task: 'Write package documentation!',
    }, {
      to: 'foo@bar.fr',
    })
  }*/
  }
  return sendMail;
}
export default email;