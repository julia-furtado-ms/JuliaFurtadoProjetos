import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false, autoRefreshToken: false } })
  : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Método não permitido.' });
    return;
  }

  try {
    const { name, email, subject, budgetRange, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ success: false, error: 'Nome, e-mail e mensagem são obrigatórios.' });
      return;
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = (await import('nodemailer')).default;
      const recipientEmail = process.env.CONTACT_TO || 'julifurtado22@gmail.com';
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: recipientEmail,
        replyTo: email,
        subject: `Nova mensagem do site - ${subject || 'Mensagem do site'}`,
        text: [
          `Nome: ${name}`,
          `E-mail: ${email}`,
          `Assunto: ${subject || 'Mensagem do site'}`,
          `Estimativa de Orçamento: ${budgetRange || 'Não se aplica'}`,
          '',
          'Mensagem:',
          String(message).replace(/\r\n/g, '\n'),
        ].join('\n'),
        html: `
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Assunto:</strong> ${subject || 'Mensagem do site'}</p>
          <p><strong>Estimativa de Orçamento:</strong> ${budgetRange || 'Não se aplica'}</p>
          <br />
          <p><strong>Mensagem:</strong></p>
          <p>${String(message).replace(/\n/g, '<br />')}</p>
        `,
      });

      res.status(200).json({ success: true, mode: 'smtp' });
      return;
    }

    if (!supabase) {
      res.status(500).json({ success: false, error: 'Configure SMTP ou Supabase para receber mensagens.' });
      return;
    }

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: String(name),
        email: String(email),
        subject: String(subject || 'Mensagem do site'),
        budget_range: String(budgetRange || 'Não se aplica'),
        message: String(message).replace(/\r\n/g, '\n'),
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      throw error;
    }

    res.status(200).json({ success: true, mode: 'supabase' });
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    res.status(500).json({ success: false, error: 'Não foi possível processar a mensagem neste momento.' });
  }
}
