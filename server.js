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
  console.log(`[${new Date().toISOString()}] Mensagem de ${name} (${from}): ${text}`);
  try {
    await sendTyping(from);
    const session = getSession(from);
    const reply = await processMessage({ from, text, name, session });
    updateSession(from, text, reply);
    await sendMessage(from, reply);
  } catch (err) {
    console.error('Erro ao processar mensagem:', err);
    await sendMessage(from, 'Tive um problema técnico. Tente novamente em instantes.');
  }
});

app.get('/qrcode', async (req, res) => {
  try {
    const EVOLUTION_URL = process.env.EVOLUTION_URL;
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
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
  console.log(`[${new Date().toISOString()}] Mensagem de ${name} (${from}): ${text}`);
  try {
    await sendTyping(from);
    const session = getSession(from);
    const reply = await processMessage({ from, text, name, session });
    updateSession(from, text, reply);
    await sendMessage(from, reply);
  } catch (err) {
    console.error('Erro ao processar mensagem:', err);
    await sendMessage(from, 'Tive um problema técnico. Tente novamente em instantes.');
  }
});

app.get('/qrcode', async (req, res) => {
  try {
    const EVOLUTION_URL = process.env.EVOLUTION_URL;
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
    const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || 'mbro-bot';

    const url = `${EVOLUTION_URL}/instance/fetchInstances`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = { raw: text }; }

    if (data.base64) {
      res.send(`<html><body style="background:#111;color:white;display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif"><h2>Escaneie com WhatsApp</h2><img src="${data.base64}" style="width:300px;border:8px solid white;border-radius:12px"/><p><a href="/qrcode" style="color:#25D366">Atualizar QR Code</a></p></body></html>`);
    } else {
      res.send(`<pre>URL: ${url}\nChave: ${EVOLUTION_API_KEY}\nResposta: ${JSON.stringify(data, null, 2)}</pre>`);
    }
  } catch (err) {
    res.send(`Erro: ${err.message}`);
  }
});

app.get('/', (req, res) => res.send('MBRO Bot ativo ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor MBRO rodando na porta ${PORT}`));

    const url = `${EVOLUTION_URL}/instance/fetchInstances`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = { raw: text }; }

    if (data.base64) {
      res.send(`<html><body style="background:#111;color:white;display:flex;flex-direction:column;align-items:center;padding:40px;font-family:sans-serif"><h2>Escaneie com WhatsApp</h2><img src="${data.base64}" style="width:300px;border:8px solid white;border-radius:12px"/><p><a href="/qrcode" style="color:#25D366">Atualizar QR Code</a></p></body></html>`);
    } else {
      res.send(`<pre>URL: ${url}\nChave: ${EVOLUTION_API_KEY}\nResposta: ${JSON.stringify(data, null, 2)}</pre>`);
    }
  } catch (err) {
    res.send(`Erro: ${err.message}`);
  }
});

app.get('/', (req, res) => res.send('MBRO Bot ativo ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor MBRO rodando na porta ${PORT}`));
