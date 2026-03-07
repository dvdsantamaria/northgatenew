# SEO Performance Protection Lessons
## Northgate Building Group

**Purpose:** Document lessons learned to prevent Core Web Vitals degradation during SEO implementations.

---

## 🚨 CRITICAL RULE #1: NO AFECTAR CORE VITALS

**Mandato Principal:** Ninguna implementación SEO debe degradar métricas de Core Web Vitals.

**Métricas Protegidas:**
- Mobile Performance: ≥ 71/100 (current baseline)
- Desktop Performance: ≥ 93/100 (current baseline)
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- TBT (Total Blocking Time): < 200ms

---

## ⚠️ Cambios PROHIBIDOS (Proven to Damage Metrics)

### ❌ FONT LOADING CHANGES
**Intentos fallidos:**
- `font-display: swap` → Desktop 97→93
- `font-display: optional` → Sin mejora, riesgo de CLS
- Preload font before hero image → Desktop 97→81
- System font substitution → Desktop 97→82

**Prohibido:** Cualquier modificación a la carga de fuentes GravesendSans.

### ❌ ASYNC CSS LOADING
**Intentos fallidos:**
- Inline critical CSS + async Tailwind → Mobile 71→52, Desktop 97→67
- Defer Tailwind loading → FOUC (Flash of Unstyled Content)

**Prohibido:** Cargar CSS de forma asíncrona o diferida.

### ❌ VISUAL EFFECT MODIFICATIONS
**Intentos fallidos:**
- Remove `mix-blend-exclusion` → Desktop 97→89
- Replace with `text-shadow` → Desktop 97→94
- Hide scroll cue → Desktop 97→77

**Prohibido:** Modificar efectos visuales en hero section.

### ❌ DOM STRUCTURE CHANGES
**Intentos fallidos:**
- Simplify hero DOM → Sin mejora, riesgo visual
- Hide video element → Desktop 97→89
- Remove nested divs → Sin mejora

**Prohibido:** Modificar estructura HTML del hero.

### ❌ LAYOUT SHIFTS
**Intentos fallidos:**
- Smaller H2 text → Desktop 97→88
- Single line H2 (remove `<br>`) → Desktop 97→89
- Move H2 position → Afecta CLS

**Prohibido:** Cualquier cambio que cause Layout Shift.

---

## ✅ CAMBIOS PERMITIDOS (Safe for Core Vitals)

### ✅ SCHEMA MARKUP
- JSON-LD addition → No impact on render
- Must be in `<head>` or end of `<body>`
- Validated before deployment

### ✅ META TAGS
- Title tags
- Meta descriptions  
- Canonical URLs
- Open Graph tags

### ✅ IMAGE OPTIMIZATION
- Alt text additions
- Width/height attributes (must not change dimensions)
- Lazy loading (below fold only)
- Compression (without quality loss)

### ✅ CONTENT ADDITIONS
- Blog posts (new pages)
- FAQ sections (below fold)
- Service descriptions (text only)

### ✅ INTERNAL LINKING
- Navigation links
- Footer links
- Related content links

---

## 🔍 PROTOCOLO DE VALIDACIÓN

### Pre-Deployment Checklist
```
□ Cambio aislado en branch feature/xxx
□ Test en PageSpeed Insights (Mobile + Desktop)
□ Comparar vs baseline actual
□ Verificar no hay LCP regressión
□ Verificar no hay CLS regressión
□ Desktop ≥ 93/100
□ Mobile ≥ 71/100
```

### Testing Procedure
1. **Deploy to staging** (if available)
2. **Run PageSpeed Insights** (3 tests, take median)
3. **Compare metrics:**
   - Performance score ±2 points = Acceptable
   - Performance score -3+ points = REJECTED
   - LCP regression > 0.3s = REJECTED
   - CLS regression > 0.05 = REJECTED

### Rollback Trigger
**Si cualquier métrica cae por debajo de:**
- Mobile: 71/100
- Desktop: 93/100
- LCP: 5.5s (current baseline)
- CLS: 0.05 (current baseline)

→ **ROLLBACK INMEDIATO** (no exceptions)

---

## 📊 BASELINE PROTEGIDO

### Current Stable Metrics (March 7, 2026)
| Metric | Mobile | Desktop | Status |
|--------|--------|---------|--------|
| Performance | 71/100 | 93-97/100 | ✅ Protected |
| LCP | 5.5s | 1.0-1.5s | ✅ Protected |
| CLS | 0 | 0 | ✅ Protected |
| A11y | 95/100 | 95/100 | ✅ Protected |
| Best Practices | 100/100 | 100/100 | ✅ Protected |
| SEO | 100/100 | 100/100 | ✅ Protected |

---

## 🎯 IMPLEMENTACIONES SEGURAS (Aprobadas)

### Schema Markup
- ✅ JSON-LD en `<head>`
- ✅ BreadcrumbList
- ✅ HomeAndConstructionBusiness
- ✅ Service schemas
- ✅ FAQPage

### Content SEO
- ✅ Title tag optimization
- ✅ Meta descriptions
- ✅ Header structure (H1-H6)
- ✅ Internal linking
- ✅ Alt text images

### GBP (Google Business Profile)
- ✅ Descriptions
- ✅ Posts
- ✅ Photos
- ✅ Reviews
- ✅ Q&A

### Technical
- ✅ Canonical URLs
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ SSL/HTTPS

---

## 🚫 IMPLEMENTACIONES BLOQUEADAS

### Performance-Risk
- ❌ Font loading changes
- ❌ CSS async/defer
- ❌ JavaScript in head
- ❌ Third-party scripts
- ❌ Heavy animations

### Visual-Risk
- ❌ Hero structure changes
- ❌ Mix-blend modifications
- ❌ Video element changes
- ❌ H2 position/size changes

---

## 📝 DOCUMENTATION REQUIREMENT

Cada implementación debe documentar:
1. **Baseline pre-cambio** (screenshot PSI)
2. **Cambio específico** (qué se modificó)
3. **Resultado post-cambio** (screenshot PSI)
4. **Delta** (diferencia en métricas)

**Si el delta es negativo → Rollback + Documentar por qué falló**

---

## 🔗 LINKS RELACIONADOS

- Optimization Log: `OPTIMIZATION_LOG.md`
- Core Web Vitals Plan: `core-web-vitals-optimization-plan.md`
- Implementation Rules: `implementation-rules.md` (this doc)

---

**Last Updated:** March 7, 2026  
**Maintained by:** AI SEO Assistant  
**Review Schedule:** Weekly during active implementations
