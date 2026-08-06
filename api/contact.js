import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    if (!resend) {
      res.status(500).json({ success: false, error: 'RESEND_API_KEY não configurada.' });
      return;
    }

    const recipientEmail = process.env.CONTACT_TO || 'julifurtado22@gmail.com';
    const emailResponse = await resend.emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: [recipientEmail],
      replyTo: email,
      subject: `Nova mensagem do site - ${subject || 'Mensagem do site'}`,
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

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message || 'Falha ao enviar com Resend.');
    }

    res.status(200).json({ success: true, mode: 'resend' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ success: false, error: 'Não foi possível enviar a mensagem neste momento.' });
  }
}
