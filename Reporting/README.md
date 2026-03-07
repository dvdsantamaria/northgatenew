# 📊 Weekly SEO Report Automation

Automated weekly SEO report generator for Northgate Building Group.

## 🚀 Archivos

| Archivo | Descripción |
|---------|-------------|
| `weekly_seo_report.py` | Script principal que genera el reporte |
| `run_weekly_report.sh` | Script shell para cron job |
| `search-console-api-*.json` | Credenciales de Google Cloud |

## 📋 Requisitos

```bash
pip3 install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client google-analytics-data
```

## 🔄 Configuración de Cron Job (Automático)

Para ejecutar el reporte automáticamente cada lunes a las 9:00 AM:

```bash
# Editar crontab
crontab -e

# Agregar esta línea:
0 9 * * 1 /Users/dax/Documents/Doop/Northgate\ Building/new/Reporting/run_weekly_report.sh >> /Users/dax/Documents/Doop/Northgate\ Building/new/Reporting/cron.log 2>&1
```

### Opciones de frecuencia:

| Frecuencia | Configuración Cron |
|------------|-------------------|
| Semanal (lunes 9am) | `0 9 * * 1` |
| Diario (9am) | `0 9 * * *` |
| Dos veces por semana | `0 9 * * 1,4` (lunes y jueves) |

## 🏃 Ejecución Manual

```bash
cd "/Users/dax/Documents/Doop/Northgate Building/new/Reporting"
python3 weekly_seo_report.py
```

## 📤 Integración con Notion / Email

Para enviar automáticamente el reporte a Notion o por email, modificar `weekly_seo_report.py`:

### Opción 1: Email (SMTP)
```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Agregar al final de generate_report()
```

### Opción 2: Slack Webhook
```python
import requests

# Agregar integración con Slack
```

## 📊 Datos Incluidos

- **GSC (Search Console)**: Clics, impresiones, CTR, posición, top keywords
- **GA4 (Analytics)**: Usuarios, sesiones, pageviews
- **Contact Page**: Tráfico específico a página de contacto
- **Comparativa**: Semana actual vs semana anterior
- **One Key Win**: Logro destacado automático
- **Recomendación**: Acción sugerida basada en datos

## 🐛 Troubleshooting

### Error: "Permission denied"
Verificar que la cuenta de servicio tenga acceso en:
- Google Search Console → Settings → Users
- GA4 → Admin → Property Access Management

### Error: "API not enabled"
Habilitar APIs en Google Cloud Console:
- Search Console API
- Google Analytics Data API
- Google Analytics Admin API

## 📝 Notas

- Los reportes se guardan como `weekly_report_YYYY-MM-DD.md`
- El script automáticamente detecta cambios y genera insights
- GA4 puede tardar 24-48h en mostrar datos después de la instalación
