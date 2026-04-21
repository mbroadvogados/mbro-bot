# 🤖 MBRO Bot — WhatsApp com Inteligência Artificial

Bot de atendimento automático do **MBRO Advogados**, powered by Claude AI.

---

## ✅ O que o bot faz

- Recebe mensagens de clientes no WhatsApp
- Identifica a área jurídica do caso
- Dá orientação geral sobre os serviços do escritório
- Agenda consultas (coleta nome, telefone e horário)
- Transfere para atendimento humano quando necessário
- Simula "digitando..." para parecer mais natural

---

## 🚀 Como colocar no ar (passo a passo)

### ETAPA 1 — Obter a chave da API do Claude

1. Acesse: https://console.anthropic.com
2. Crie uma conta e adicione crédito (mínimo $5 — dura meses)
3. Vá em **API Keys** → **Create Key**
4. Guarde a chave: `sk-ant-...`

---

### ETAPA 2 — Subir o código no GitHub

1. Acesse: https://github.com e crie uma conta (gratuito)
2. Clique em **New repository** → nome: `mbro-bot` → **Create**
3. Clique em **uploading an existing file**
4. Arraste TODOS os arquivos desta pasta (exceto `node_modules` se existir)
5. Clique em **Commit changes**

---

### ETAPA 3 — Subir a Evolution API no Render

1. Acesse: https://render.com e crie uma conta (gratuito)
2. Clique em **New → Web Service**
3. Escolha **Deploy an existing image from a registry**
4. Imagem: `atendai/evolution-api:latest`
5. Nome: `mbro-evolution`
6. Em **Environment Variables**, adicione:
   - `AUTHENTICATION_API_KEY` = uma senha forte (ex: `MbroEvolution2025!`)
   - `SERVER_URL` = (deixe em branco por enquanto — preencha após o deploy)
7. Clique em **Deploy**
8. Após o deploy, copie a URL gerada (ex: `https://mbro-evolution.onrender.com`)
9. Volte nas variáveis e coloque essa URL no `SERVER_URL`

---

### ETAPA 4 — Subir o Bot no Render

1. No Render, clique em **New → Web Service**
2. Conecte ao repositório `mbro-bot` do GitHub
3. Em **Environment Variables**, adicione:

| Variável | Valor |
|---|---|
| `CLAUDE_API_KEY` | `sk-ant-SUA_CHAVE_AQUI` |
| `EVOLUTION_URL` | `https://mbro-evolution.onrender.com` |
| `EVOLUTION_API_KEY` | `MbroEvolution2025!` (a senha que você criou) |
| `EVOLUTION_INSTANCE` | `mbro-bot` |

4. Clique em **Deploy**
5. Após o deploy, copie a URL do bot (ex: `https://mbro-bot.onrender.com`)

---

### ETAPA 5 — Conectar o WhatsApp

1. Acesse o painel da Evolution API:
   `https://mbro-evolution.onrender.com/manager`
   - Usuário: `admin`
   - Senha: a que você definiu

2. Clique em **Create Instance**:
   - Nome: `mbro-bot`
   - Clique em **Create**

3. Clique em **Connect** e **QR Code**
4. Abra o WhatsApp no celular → Configurações → Dispositivos conectados → Conectar dispositivo
5. Escaneie o QR Code

6. Configure o Webhook:
   - Vá em **Webhook** dentro da instância
   - URL: `https://mbro-bot.onrender.com/webhook`
   - Ative o evento: **MESSAGES_UPSERT**
   - Salve

---

### ETAPA 6 — Testar

Mande uma mensagem para o número conectado pelo WhatsApp de outro celular.
O bot deve responder em 2-5 segundos.

---

## ⚠️ Avisos Importantes

1. **O número conectado ao bot não poderá ser usado normalmente no celular** enquanto estiver ativo. Use um número exclusivo para o bot (chip secundário ou linha virtual).

2. **Custo estimado:**
   - Render gratuito: serviço "dorme" após 15 min sem uso (plano pago ~$7/mês para produção)
   - Claude API: aproximadamente R$0,01 por mensagem com o modelo Haiku
   - Evolution API: gratuita

3. **LGPD:** O bot coleta nome e número dos clientes. Certifique-se de incluir aviso de privacidade no atendimento.

4. **WhatsApp Terms:** O uso de automação em número pessoal pode violar os termos do WhatsApp. Para uso profissional sem risco de banimento, considere a **WhatsApp Business API oficial** via Meta/Twilio.

---

## 📞 Suporte

Site: www.mbroadvogados.com.br
E-mail: mbroadvogados@gmail.com
WhatsApp: (83) 98882-5983
