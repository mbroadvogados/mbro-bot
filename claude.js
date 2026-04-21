const { buildSystemPrompt } = require('./prompts');

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const MODEL = 'claude-haiku-4-5-20251001'; // rápido e econômico para atendimento

async function processMessage({ from, text, name, session }) {
  const messages = [
    ...session.history,
    { role: 'user', content: text }
  ];

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: buildSystemPrompt(name),
      messages
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API erro: ${err}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

module.exports = { processMessage };
