# Implementation Rules
## Northgate Building Group - SEO & Development

**Effective Date:** March 7, 2026  
**Version:** 1.0  
**Status:** Mandatory for all implementations

---

## 🚨 REGLA #1: NO AFECTAR CORE VITALS

**Esta es la regla principal y no negociable.**

### Métricas Protegidas
Ninguna implementación puede degradar las siguientes métricas:

| Metric | Mobile Minimum | Desktop Minimum | Action if Breached |
|--------|---------------|-----------------|-------------------|
| Performance Score | 71/100 | 93/100 | **ROLLBACK** |
| LCP | 5.5s | 1.5s | **ROLLBACK** |
| CLS | 0.05 | 0.05 | **ROLLBACK** |
| Accessibility | 95/100 | 95/100 | **ROLLBACK** |
| Best Practices | 100/100 | 100/100 | **ROLLBACK** |
| SEO | 100/100 | 100/100 | **ROLLBACK** |

### Protocolo de Protección
1. **Test baseline** antes de cualquier cambio (screenshot PSI)
2. **Test post-implantación** (3 corridas de PSI, tomar mediana)
3. **Comparar métricas**
4. Si hay degradación → **ROLLBACK INMEDIATO**
5. Documentar fallo en `SEO-PERFORMANCE-LESSONS.md`

---

## 📝 REGLA #2: Documentar Todo

### Pre-Implementation
- [ ] Crear branch `feature/nombre-cambio`
- [ ] Screenshot de baseline PSI (mobile + desktop)
- [ ] Documentar qué se va a cambiar y por qué
- [ ] Revisar `SEO-PERFORMANCE-LESSONS.md` por intentos similares fallidos

### Post-Implementation
- [ ] Screenshot de resultado PSI (mobile + desktop)
- [ ] Documentar delta (cambio en métricas)
- [ ] Si es exitoso → Merge a main
- [ ] Si falla → Rollback + documentar por qué falló

---

## 🔄 REGLA #3: Cambios Aislados

### Un cambio por implementación
- **NO** combinar múltiples optimizaciones
- **NO** hacer cambios grandes en batch
- **SÍ** cambios pequeños, medibles, reversibles

### Ejemplos válidos
✅ "Agregar Schema FAQ a home page"  
✅ "Optimizar title tag de services.html"  
✅ "Agregar alt text a 5 imágenes"  

### Ejemplos inválidos
❌ "Agregar schemas + optimizar imágenes + cambiar fonts"  
❌ "Rediseñar hero section completo"  
❌ "Actualizar todas las páginas a la vez"  

---

## 🧪 REGLA #4: Testing Obligatorio

### PageSpeed Insights (PSI)
- Correr **3 tests** por dispositivo (mobile + desktop)
- Tomar la **mediana** de los 3 resultados
- Comparar vs baseline (no vs estimaciones)

### Herramientas adicionales
- Google Rich Results Test (para schemas)
- Google Mobile-Friendly Test
- Lighthouse CLI (opcional, para CI/CD)

### Timing de tests
- Pre-deployment: Baseline
- Post-deployment: < 5 minutos después de deploy
- 24 horas después: Confirmar estabilidad

---

## 🚫 REGLA #5: Lista de Prohibiciones

### Cambios que NUNCA se deben hacer (proven to fail)

#### Fonts
- ❌ `font-display: swap`
- ❌ `font-display: optional`
- ❌ Preload font before hero image
- ❌ System font substitution for H2
- ❌ Media queries para fonts en hero

#### CSS Loading
- ❌ Async CSS loading
- ❌ Defer Tailwind
- ❌ Inline critical CSS
- ❌ Remove unused CSS (puede afectar render)

#### Visual Effects
- ❌ Remove `mix-blend-exclusion`
- ❌ Replace with `text-shadow`
- ❌ Hide scroll cue
- ❌ Modify hero animations

#### DOM Structure
- ❌ Simplify hero DOM
- ❌ Hide video element
- ❌ Remove nested containers
- ❌ Change H2 position/size

#### Layout
- ❌ Smaller H2 text
- ❌ Single line H2 (remove `<br>`)
- ❌ Move hero elements
- ❌ Change z-index values

---

## ✅ REGLA #6: Cambios Aprobados (Safe List)

### Schemas & Meta Data
- ✅ JSON-LD schemas
- ✅ Title tags
- ✅ Meta descriptions
- ✅ Canonical URLs
- ✅ Open Graph tags

### Content
- ✅ Text content additions
- ✅ Blog posts
- ✅ FAQ sections
- ✅ Service descriptions

### Images
- ✅ Alt text
- ✅ Width/height attributes
- ✅ Lazy loading (below fold)
- ✅ Compression (sin pérdida de calidad)

### Links
- ✅ Internal linking
- ✅ Navigation updates
- ✅ Footer links

### GBP (Google Business Profile)
- ✅ Descriptions
- ✅ Posts
- ✅ Photos
- ✅ Reviews
- ✅ Q&A
- ✅ Service listings

---

## 🔒 REGLA #7: Rollback Priority

### Si una métrica cae por debajo del mínimo:

**Paso 1:** Rollback inmediato (sin preguntar)
```bash
git revert HEAD --no-edit
git push origin main --force
```

**Paso 2:** Cache purge
```
Cloudflare → Caching → Purge Everything
```

**Paso 3:** Documentar
- Actualizar `SEO-PERFORMANCE-LESSONS.md`
- Agregar a "Intentos Fallidos"
- Notificar qué cambio falló y por qué

**Paso 4:** Test de confirmación
- Esperar 60 segundos (propagación CDN)
- Correr PSI de nuevo
- Confirmar métricas volvieron a baseline

---

## 📋 REGLA #8: Approval Process

### Cambios que requieren aprobación explícita:
- Cualquier modificación al hero section
- Cambios de fuentes o typography
- Adición de JavaScript nuevo
- Cambios de color o branding
- Modificaciones al menú de navegación

### Cambios automáticos (no requieren aprobación):
- Agregar schemas (JSON-LD)
- Actualizar meta tags
- Agregar alt text
- Crear contenido nuevo (blogs, FAQs)
- GBP updates

---

## 📊 REGLA #9: Métricas de Éxito

### KPIs por tipo de implementación

#### SEO On-Page
- Organic traffic (semanal)
- Keyword rankings (semanal)
- Click-through rate (CTR) (mensual)

#### Schemas
- Rich Results appearances (mensual)
- SERP feature captures (mensual)

#### GBP
- Views (semanal)
- Direction requests (semanal)
- Website clicks (semanal)
- Calls (semanal)

### Core Vitals (siempre protegidos)
- Performance score (no puede bajar)
- LCP (no puede aumentar)
- CLS (no puede aumentar)

---

## 📚 REGLA #10: Knowledge Base

### Documentos de referencia obligatorios:

Antes de cualquier implementación, revisar:
1. `SEO-PERFORMANCE-LESSONS.md` - Lecciones aprendidas
2. `OPTIMIZATION_LOG.md` - Historial de intentos
3. `IMPLEMENTATION-RULES.md` - Este documento

### Archivos protegidos (NO modificar):
- `index.html` hero section (líneas 218-293 aprox)
- `styles.css` font-face definitions
- `scripts.js` GSAP loading logic

---

## ⚡ Emergency Contacts

### Rollback rápido (si algo sale mal):
```bash
# Revertir último commit
git revert HEAD --no-edit
git push origin main --force

# Purge Cloudflare cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/[ZONE_ID]/purge_cache" \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Baseline restoration:
Branch `backup-before-mobile-optimization` contiene versión estable.

---

## ✅ Pre-Flight Checklist

Antes de cualquier implementación:

```
□ Revisé SEO-PERFORMANCE-LESSONS.md
□ Creé branch aislado
□ Tomé screenshot baseline PSI
□ El cambio está en "Safe List"
□ No está en "Prohibited List"
□ Tengo plan de rollback listo
□ Tengo tiempo para testear post-deploy
```

---

## 📅 Review Schedule

- **Weekly:** Revisar métricas de Core Vitals
- **Monthly:** Actualizar este documento con nuevas lecciones
- **Quarterly:** Revisión completa de reglas y baseline

---

**Created:** March 7, 2026  
**Maintained by:** AI SEO Assistant  
**Enforced by:** Git hooks + Manual review

---

## 🔗 Quick Links

- [Optimization Log](OPTIMIZATION_LOG.md)
- [Performance Lessons](SEO-PERFORMANCE-LESSONS.md)
- [Schema Plan](schema-implementation-plan.md)
- [Keyword Strategy](keyword-seo-strategy.md)
- [GBP Strategy](gbp-optimization-strategy.md)
