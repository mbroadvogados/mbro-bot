app.get('/qrcode', async (req, res) => {
  try {
    const EVOLUTION_URL = process.env.EVOLUTION_URL;
    const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
    const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE;

    const url = `${EVOLUTION_URL}/instance/connect/${EVOLUTION_INSTANCE}`;
    
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
