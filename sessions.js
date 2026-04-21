// Gerencia histórico de conversas em memória
// Para produção com reinicializações frequentes, substitua por Redis

const sessions = new Map();
const MAX_PARES  = 10;           // últimas 10 trocas (20 mensagens)
const TIMEOUT_MS = 30 * 60 * 1000; // sessão expira após 30 min de inatividade

function getSession(phone) {
  const s = sessions.get(phone);
  if (!s) return { history: [] };
  if (Date.now() - s.lastActivity > TIMEOUT_MS) {
    sessions.delete(phone);
    return { history: [] };
  }
  return s;
}

function updateSession(phone, userText, botText) {
  const s = getSession(phone);
  s.history.push(
    { role: 'user',      content: userText },
    { role: 'assistant', content: botText  }
  );
  if (s.history.length > MAX_PARES * 2) {
    s.history = s.history.slice(-MAX_PARES * 2);
  }
  s.lastActivity = Date.now();
  sessions.set(phone, s);
}

module.exports = { getSession, updateSession };
