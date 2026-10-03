import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = Number(process.env.PORT ?? 3001)
const adminEmail = process.env.ADMIN_EMAIL ?? 'monajuan236@gmail.com'

app.use(express.json({ limit: '1mb' }))

app.post('/api/send-itinerary', async (req, res) => {
  const { to, cc, subject, text, html } = req.body ?? {}

  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'Missing required email fields.' })
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = Number(process.env.SMTP_PORT ?? 587)
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    return res.status(500).json({
      message:
        'Email service is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS to the environment before sending emails.',
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: smtpUser,
      to,
      cc: cc ?? adminEmail,
      subject,
      text,
      html: html ?? `<pre>${String(text)}</pre>`,
    })

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error sending itinerary email:', error)

    res.status(500).json({
      message: 'There was an error sending the itinerary email.',
    })
  }
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Email API listening on http://localhost:${port}`)
})
