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

app.get('/', (req, res) => res.send('MBRO Bot ativo ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor MBRO rodando na porta ${PORT}`));
