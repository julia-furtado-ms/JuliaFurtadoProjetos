import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

app.use(express.json());

const recipientEmail = process.env.CONTACT_TO || 'julifurtado22@gmail.com';

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

async function sendWithResend(payload, res) {
  if (!resend) {
    throw new Error('RESEND_API_KEY não configurada.');
  }

  const emailResponse = await resend.emails.send({
    from: process.env.RESEND_FROM || 'onboarding@resend.dev',
    to: [recipientEmail],
    replyTo: payload.email,
    subject: `Nova mensagem do site - ${payload.subject}`,
    html: `
      <p><strong>Nome:</strong> ${payload.name}</p>
      <p><strong>E-mail:</strong> ${payload.email}</p>
      <p><strong>Assunto:</strong> ${payload.subject}</p>
      <p><strong>Estimativa de Orçamento:</strong> ${payload.budgetRange}</p>
      <br />
      <p><strong>Mensagem:</strong></p>
      <p>${payload.message.replace(/\n/g, '<br />')}</p>
    `,
  });

  if (emailResponse.error) {
    throw new Error(emailResponse.error.message || 'Falha ao enviar com Resend.');
  }

  return res.json({ success: true, mode: 'resend' });
}

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, budgetRange, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Nome, e-mail e mensagem são obrigatórios.' });
    }

    const normalizedMessage = String(message).replace(/\r\n/g, '\n');
    const payload = {
      name: String(name),
      email: String(email),
      subject: String(subject || 'Mensagem do site'),
      budgetRange: String(budgetRange || 'Não se aplica'),
      message: normalizedMessage,
    };

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: recipientEmail,
          replyTo: payload.email,
          subject: `Nova mensagem do site - ${payload.subject}`,
          text: [
            `Nome: ${payload.name}`,
            `E-mail: ${payload.email}`,
            `Assunto: ${payload.subject}`,
            `Estimativa de Orçamento: ${payload.budgetRange}`,
            '',
            'Mensagem:',
            payload.message,
          ].join('\n'),
          html: `
            <p><strong>Nome:</strong> ${payload.name}</p>
            <p><strong>E-mail:</strong> ${payload.email}</p>
            <p><strong>Assunto:</strong> ${payload.subject}</p>
            <p><strong>Estimativa de Orçamento:</strong> ${payload.budgetRange}</p>
            <br />
            <p><strong>Mensagem:</strong></p>
            <p>${payload.message.replace(/\n/g, '<br />')}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, mode: 'smtp' });
      } catch (smtpError) {
        console.warn('SMTP falhou, tentando fallback:', smtpError);
      }
    }

    return sendWithResend(payload, res);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ success: false, error: 'Não foi possível enviar a mensagem neste momento.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de contato rodando na porta ${port}`);
});
