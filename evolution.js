const EVOLUTION_URL = process.env.EVOLUTION_URL;
const EVOLUTION_KEY = process.env.EVOLUTION_API_KEY;
const INSTANCE    = process.env.EVOLUTION_INSTANCE || 'mbro-bot';

async function sendMessage(to, text) {
  const response = await fetch(`${EVOLUTION_URL}/message/sendText/${INSTANCE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': EVOLUTION_KEY
    },
    body: JSON.stringify({ number: to, text, delay: 1200 })
  });

  if (!response.ok) throw new Error(`Evolution API erro: ${await response.text()}`);
  return response.json();
}

async function sendTyping(to) {
  try {
    await fetch(`${EVOLUTION_URL}/chat/sendPresence/${INSTANCE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': EVOLUTION_KEY },
      body: JSON.stringify({ number: to, options: { presence: 'composing', delay: 2500 } })
    });
  } catch (_) {}
}

module.exports = { sendMessage, sendTyping };
