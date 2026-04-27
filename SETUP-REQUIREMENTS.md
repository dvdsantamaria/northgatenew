# Setup Requirements — Northgate Automations

Checklist de todo lo que necesito de Jordan para implementar los 7 workflows.

---

## 1. ACCESOS QUE PEDIRLE A JORDAN

### n8n Cloud
- **Qué necesito:** Acceso al workspace de n8n Cloud (invitarme como admin o editor)
- **Dónde lo consigue:** [n8n.io](https://n8n.io) → su cuenta trial activa
- **Costo:** Ya lo tiene (trial)
- **Bloquea:** Todo. Sin esto no puedo importar workflows.

### OpenAI API
- **Qué necesito:** API key (`sk-...`) + tarjeta de crédito asociada
- **Dónde lo consigue:** [platform.openai.com](https://platform.openai.com) → API keys → Create new secret key
- **Costo:** Pay-as-you-go, ~$3-10/mes para el MVP
- **Bloquea:** WF-01, WF-02, WF-04, WF-05, WF-06 (todos usan OpenAI)

### Fathom (Meeting Transcription)
- **Qué necesito:** API key + app instalada en Zoom/Teams
- **Dónde lo consigue:**
  - Cuenta: [fathom.video](https://fathom.video)
  - API key: [developers.fathom.ai](https://developers.fathom.ai)
  - App: instalar desde marketplace de Zoom/Teams
- **Costo:** Free tier (15 meetings/mes). Si necesita más: ~$15/mes
- **Bloquea:** WF-01 completamente

### GoHighLevel (GHL)
- **Qué necesito:** API key + Location ID de Northgate
- **Dónde lo consigue:**
  - GHL → Settings → Business Profile → copy Location ID
  - GHL → Settings → API → Private Integration → Generate API key
- **Costo:** Ya lo paga Jordan
- **Bloquea:** WF-02, WF-03, WF-04 (lectura/escritura de contactos, notas, tasks)

### Xero
- **Qué necesito:** Client ID + Client Secret de app registrada
- **Dónde lo consigue:** [developer.xero.com](https://developer.xero.com) → My apps → New app → OAuth 2.0
- **Costo:** Ya lo paga Jordan
- **Bloquea:** WF-05 (progress claims), WF-06 (expense categorization)

### Microsoft 365 (Outlook + SharePoint)
- **Qué necesito:** App registration en Azure AD con permisos de Graph API
- **Datos específicos:**
  - Tenant ID
  - Client ID
  - Client Secret
  - Permisos: `Mail.ReadWrite`, `Mail.Send`, `Sites.Read.All`, `Files.ReadWrite.All`
- **Dónde lo consigue:** [portal.azure.com](https://portal.azure.com) → Azure Active Directory → App registrations → New registration
- **Alternativa:** Darme acceso como admin delegado en el tenant
- **Costo:** Ya lo paga Jordan
- **Bloquea:** WF-02, WF-03, WF-04 (lectura de emails), WF-07 (SharePoint)

### Outlook — Aliases de Email
- **Qué necesito:** Crear estas direcciones de reenvío en su dominio:
  - `leads@northgatebuilding.com.au`
  - `variations@northgatebuilding.com.au`
  - `agents@northgatebuilding.com.au`
  - `estimations@northgatebuilding.com.au`
  - `expenses@northgatebuilding.com.au`
- **Cómo:** Microsoft 365 Admin → Exchange → Mail flow → Rules (o crear shared mailboxes)
- **Costo:** Ya lo paga Jordan (son aliases, no nuevas licencias)
- **Bloquea:** Todos los workflows de email (WF-02, WF-03, WF-04, WF-06)

### Supabase (PostgreSQL)
- **Qué necesito:** Project URL + `anon` public API key
- **Dónde lo consigue:** [supabase.com](https://supabase.com) → New Project → Settings → API
- **Costo:** Free tier (500MB, suficiente por años)
- **Bloquea:** Persistencia de datos de WF-01 (meetings DB). Otros workflows pueden seguir funcionando sin esto, pero sin memoria compartida.

### SMTP / Servidor de Email
- **Qué necesito:** Host, port, username, password del SMTP de Northgate
- **Alternativa:** Usar Microsoft Graph API para enviar emails desde Outlook (misma credencial de M365)
- **Costo:** Ya lo paga Jordan
- **Bloquea:** Notificaciones a Jordan (WF-01, WF-02, WF-04, WF-05, WF-06)

### Telegram (opcional)
- **Qué necesito:** Bot token
- **Dónde lo consigue:** En Telegram, buscar @BotFather → /newbot → copiar token
- **Costo:** Gratis
- **Bloquea:** Nada esencial. Es un plus para notificaciones push.

---

## 2. SERVICIOS A CONTRATAR (Nuevos)

Servicios que Jordan NO tiene todavía y necesita contratar:

| Servicio | Plan recomendado | Costo mensual | Para qué | Prioridad |
|---|---|---|---|---|
| **n8n Cloud** | Starter (2,500 executions/mes) | **$20** | Orquestador de todos los workflows | 🔴 Crítico |
| **OpenAI API** | Pay-as-you-go (no subscription) | **$3-10** | GPT-4o-mini para resúmenes, extracción, clasificación | 🔴 Crítico |
| **Claude API** | Pay-as-you-go | **$2-5** | Sonnet solo para reasoning avanzado (variations, análisis de contratos) | 🟡 Media |
| **Fathom** | Free tier (15 meetings/mes) | **$0** | Transcripción de Zoom/Teams | 🔴 Crítico |
| **Fathom** | Team (ilimitado) | **$15** | Si supera los 15 meetings/mes | 🟡 Media |
| **Supabase** | Free tier (500MB) | **$0** | PostgreSQL para guardar meetings, leads, variations | 🔴 Crítico |

### Costo total estimado

| Escenario | n8n | OpenAI | Claude | Fathom | Supabase | **Total/mes** |
|---|---|---|---|---|---|---|
| **MVP mínimo** (free Fathom, sin Claude) | $20 | $3 | $0 | $0 | $0 | **$23** |
| **MVP completo** (con Claude, Fathom pago) | $20 | $8 | $3 | $15 | $0 | **$46** |
| **Escala** (más executions, más storage) | $50 | $15 | $5 | $15 | $25 | **$110** |

---

## 3. CHECKLIST RÁPIDO PARA JORDAN

Copiar y pegar en un email:

```
Hi Jordan,

Para arrancar las automatizaciones necesito que consigas esto:

[ ] 1. Invitarme a tu workspace de n8n Cloud (link de invitación)
[ ] 2. Crear API key en OpenAI (platform.openai.com) y asociar tarjeta
[ ] 3. Crear cuenta en Fathom + instalar en Zoom/Teams + API key
[ ] 4. API key de GoHighLevel (Settings → API → Private Integration)
[ ] 5. Client ID/Secret de Xero (developer.xero.com → New app)
[ ] 6. App registration en Azure AD (para Outlook + SharePoint)
[ ] 7. Crear aliases: leads@, variations@, agents@ en su dominio
[ ] 8. Crear proyecto en Supabase (supabase.com) y pasarme URL + key
[ ] 9. Datos SMTP de Northgate (host, port, user, pass)
[ ] 10. (Opcional) Crear bot de Telegram con @BotFather

Costos nuevos: ~$23-46/mes en el MVP.

```

---

## 4. BLOQUEANTES POR WORKFLOW

| Workflow | Sin qué no arranca |
|---|---|
| WF-01 Meeting Summaries | Fathom API + OpenAI API + n8n |
| WF-02 Lead Intake | Outlook alias `leads@` + OpenAI API + GHL API + n8n |
| WF-03 Email Context | Outlook alias `agents@` + Claude API + GHL API + n8n |
| WF-04 Variation Drafts | Outlook alias `variations@` + Claude API + GHL API + n8n |
| WF-05 Progress Claims | Xero API + OpenAI API + n8n |
| WF-06 Expense Categorization | Xero API + OpenAI API + n8n |
| WF-07 Document Workflows | SharePoint API + n8n |

---

*Actualizado: 26/04/2026*
