import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const recipientEmail = process.env.CONTACT_TO || 'julifurtado22@gmail.com';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    supabaseConfigured: Boolean(supabaseUrl && supabaseKey),
  });
});

async function saveWithSupabase(payload) {
  if (!supabase) {
    throw new Error('SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY não configurados.');
  }

  const { error } = await supabase.from('contact_messages').insert([
    {
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      budget_range: payload.budgetRange,
      message: payload.message,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw error;
  }
}

async function sendWithSmtp(payload, res) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error('SMTP não configurado.');
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
        return await sendWithSmtp(payload, res);
      } catch (smtpError) {
        console.warn('SMTP falhou, tentando Supabase:', smtpError);
      }
    }

    if (supabase) {
      try {
        await saveWithSupabase(payload);
        return res.json({ success: true, mode: 'supabase' });
      } catch (supabaseError) {
        console.warn('Supabase falhou:', supabaseError);
      }
    }

    return res.status(500).json({ success: false, error: 'Não foi possível enviar a mensagem. Configure SMTP ou Supabase.' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ success: false, error: 'Não foi possível enviar a mensagem neste momento.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de contato rodando na porta ${port}`);
});
