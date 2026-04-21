const express = require('express');
const { processMessage } = require('./claude');
const { sendMessage, sendTyping } = require('./evolution');
const { getSession, updateSession } = require('./sessions');
const app = express();
app.use(express.json());
app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  const body = req.body;
  if (!body?.data?.message?.conversation) return;
  if (body?.data?.key?.fromMe) return;
  const from = body.data.key.remoteJid;
  const text = body.data.message.conversation;
  const name = body.data.pushName || 'Cliente';
  try {
    await sendTyping(from);
    const session = getSession(from);
    const reply = await processMessage({ from, text, name, session });
    updateSession(from, text, reply);
    await sendMessage(from, reply);
  } catch (err) {
    await sendMessage(from, 'Tive um problema técnico. Tente novamente em instantes.');
  }
});
app.get('/qrcode', async (req, res) => {
  try {
    const url = `${process.env.EVOLUTION_URL}/instance/connect/${process.env.EVOLUTION_INSTANCE || 'mbro-bot'}`;
    const response = await fetch(url, { headers: { 'apikey': process.env.EVOLUTION_API_KEY } });
    const data = await response.json();
    if (data.base64) {
      res.send(`<html><body style="background:#111;color:white;text-align:center;padding:40px;font-family:sans-serif"><h2>Escaneie com WhatsApp</h2><img src="${data.base64}" style="width:300px;border:8px solid white"/><p><a href="/qrcode" style="color:#25D366">Atualizar</a></p></body></html>`);
    } else {
      res.send(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    }
  } catch (err) {
    res.send(`Erro: ${err.message}`);
  }
});
app.get('/', (req, res) => res.send('MBRO Bot ativo ✅'));
app.listen(process.env.PORT || 3000, () => console.log('Servidor MBRO iniciado'));
