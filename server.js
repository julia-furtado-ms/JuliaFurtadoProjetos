import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, budgetRange, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Nome, e-mail e mensagem são obrigatórios.' });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(503).json({
        success: false,
        error: 'Configuração SMTP incompleta. Defina SMTP_HOST, SMTP_USER e SMTP_PASS no arquivo .env.',
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const normalizedMessage = String(message).replace(/\r\n/g, '\n');

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO || 'julifurtado22@gmail.com',
      replyTo: email,
      subject: `Nova mensagem do site - ${subject || 'Mensagem do site'}`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Assunto: ${subject || 'Mensagem do site'}`,
        `Estimativa de Orçamento: ${budgetRange || 'Não se aplica'}`,
        '',
        'Mensagem:',
        normalizedMessage,
      ].join('\n'),
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject || 'Mensagem do site'}</p>
        <p><strong>Estimativa de Orçamento:</strong> ${budgetRange || 'Não se aplica'}</p>
        <br />
        <p><strong>Mensagem:</strong></p>
        <p>${normalizedMessage.replace(/\n/g, '<br />')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ success: false, error: 'Erro interno ao processar o formulário.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de contato rodando na porta ${port}`);
});
