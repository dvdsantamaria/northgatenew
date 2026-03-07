# 🚀 Core Web Vitals Optimization Plan
## Northgate Building Group - Mobile Performance 90+

**Current Score:** 61/100 (Mobile)  
**Target Score:** 90+/100  
**Gap to Close:** 29+ points  
**Analysis Date:** March 2026

---

## 📊 Current State Analysis

### Core Web Vitals (Mobile)

| Metric | Current | Target | Status | Priority |
|--------|---------|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | 7.4s | <2.5s | 🔴 Critical | P0 |
| **FCP** (First Contentful Paint) | 4.7s | <1.8s | 🔴 Critical | P0 |
| **TBT** (Total Blocking Time) | 130ms | <200ms | 🟢 Good | - |
| **CLS** (Cumulative Layout Shift) | 0 | <0.1 | 🟢 Good | - |
| **Speed Index** | 6.0s | <3.4s | 🔴 Critical | P0 |
| **TTI** (Time to Interactive) | 7.4s | <3.8s | 🔴 Critical | P1 |

### Performance Score Breakdown

| Category | Mobile | Desktop | Target |
|----------|--------|---------|--------|
| Performance | 🔴 61/100 | 🟢 90/100 | >90 |
| Accessibility | 🟡 88/100 | 🟡 88/100 | >90 |
| Best Practices | 🟢 96/100 | 🟢 96/100 | >90 |
| SEO | 🟢 92/100 | 🟢 92/100 | >90 |

---

## 🎯 Critical Issues (P0 - Fix First)

### 1. 🖼️ HERO IMAGES TOO LARGE (Biggest Impact)

**Problem:**
- Hero image: 5,228 KB (5.2 MB!)
- Secondary hero: 4,035 KB (4.0 MB!)
- These two images alone = 9.2 MB
- Page total: 11 MB

**Impact on Metrics:**
- Directly causes LCP of 7.4s (target: <2.5s)
- Massive bandwidth usage
- Mobile users on 3G/4G suffer

**Solutions (in order of impact):**

#### Option A: Aggressive Compression (Quick Win)
```bash
# Current: ~9MB hero images
# Target: <500KB combined

1. Re-export hero images with:
   - Quality: 60-70% (currently likely 90%+)
   - Dimensions: Max 1920px width (resize if larger)
   - Format: WebP with fallbacks

2. Expected savings: ~8.5MB (92% reduction)
3. Expected LCP improvement: 7.4s → ~2.5s
```

#### Option B: Responsive Images
```html
<!-- Implement srcset for different screen sizes -->
<img 
  src="hero-mobile.webp" 
  srcset="hero-mobile.webp 768w, hero-tablet.webp 1200w, hero-desktop.webp 1920w"
  sizes="100vw"
  alt="Northgate Building Group"
  width="1920" 
  height="1080"
  fetchpriority="high"
>
```

#### Option C: Video Instead of Images
If the hero is a video (as suspected from file sizes):
```html
<!-- Optimize video delivery -->
<video 
  autoplay 
  muted 
  loop 
  playsinline
  poster="hero-poster.webp"
  preload="none"
>
  <source src="hero-video-mobile.mp4" media="(max-width: 768px)">
  <source src="hero-video-desktop.mp4">
</video>
```

**Implementation Priority:**
1. ✅ Compress existing images to <500KB each
2. ✅ Add proper sizing attributes (width/height)
3. ✅ Preload LCP image: `<link rel="preload" as="image" href="hero.webp">`
4. ✅ Implement responsive images with srcset

**Expected Result:** LCP 7.4s → 2.0-2.5s (+20-25 points)

---

### 2. 🔄 ELIMINATE REDIRECTS

**Problem:**
- Redirect chain wastes 780ms
- `www.northgatebuilding.com.au/` → `northgatebuilding.com.au/`

**Impact:**
- Directly affects FCP and LCP
- 0.78s delay before any content loads

**Solution:**
```apache
# .htaccess or server config
# Option 1: Remove www redirect entirely
# Option 2: Ensure all internal links use consistent domain

# If keeping non-www as canonical:
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.northgatebuilding\.com\.au$ [NC]
RewriteRule ^(.*)$ https://northgatebuilding.com.au/$1 [R=301,L]
```

**Also check:**
- All internal links should point to `northgatebuilding.com.au/` (not www)
- Update canonical tags
- Update sitemap.xml

**Expected Result:** FCP 4.7s → 3.9s (+5-8 points)

---

### 3. 📜 REDUCE UNUSED JAVASCRIPT

**Problem:**
- Google Tag Manager: 60KB unused (41% of script)
- Tailwind CSS (CDN): 37KB unused (31% of script)
- **Total wasted: ~98KB**

**Solutions:**

#### For GTM:
```javascript
// Load GTM asynchronously after page load
// Current (blocking):
<script async src="https://www.googletagmanager.com/gtag/js?id=G-D6BNWWCL93"></script>

// Better (lazy load):
<script>
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Load GTM here
    }, 2000);
  });
</script>
```

#### For Tailwind:
```bash
# Option 1: Purge unused CSS (recommended)
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify --purge

# Option 2: Use Tailwind CDN with config (for dev only)
# For production, build custom CSS file with only used classes
```

**Expected Result:** TBT reduction, faster interactivity (+3-5 points)

---

## 🔧 High Impact Issues (P1)

### 4. ⛔ RENDER-BLOCKING RESOURCES

**Problem:**
- CSS and JavaScript blocking first paint
- No critical CSS inlined

**Solution:**
```html
<!-- Critical CSS (inline in <head>) -->
<style>
  /* Above-the-fold styles only */
  /* Hero section, header, navigation */
  /* ~10-15KB max */
</style>

<!-- Non-critical CSS (async load) -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- JavaScript (defer non-critical) -->
<script src="analytics.js" defer></script>
<script src="main.js" defer></script>
```

**Tool for Critical CSS:**
```bash
npm install -g critical
npx critical https://northgatebuilding.com.au/ --width=375 --height=667 > critical.css
```

**Expected Result:** FCP 3.9s → 2.5s (+5-8 points)

---

### 5. 🔤 FONT DISPLAY OPTIMIZATION

**Problem:**
- Custom fonts likely blocking text rendering
- No `font-display: swap`

**Solution:**
```css
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback font immediately */
  font-weight: 400;
}
```

**Also:**
- Preload critical fonts:
```html
<link rel="preload" href="/fonts/primary.woff2" as="font" type="font/woff2" crossorigin>
```

**Expected Result:** FCP improvement, better perceived performance (+2-3 points)

---

### 6. 🗜️ COMPRESSION & CACHING

**Current State:**
- Server latency: 10ms (good)
- RTT: 0ms (measured locally)

**Optimizations:**
```nginx
# nginx.conf or .htaccess

# Enable Brotli compression (better than gzip)
brotli on;
brotli_comp_level 6;
brotli_types text/plain text/css application/javascript image/svg+xml;

# Long-term caching for static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

**Expected Result:** Faster repeat visits (+2-3 points)

---

## 📋 Complete Implementation Checklist

### Phase 1: Critical Fixes (Expected: 61 → 80+)

- [ ] **Compress hero images** from 9MB to <500KB
  - [ ] Re-export with 60-70% quality
  - [ ] Resize to max 1920px width
  - [ ] Verify WebP format
  
- [ ] **Add preload for LCP image**
  ```html
  <link rel="preload" as="image" href="/assets/hero.webp" type="image/webp">
  ```

- [ ] **Fix redirect chain**
  - [ ] Update all internal links to use non-www
  - [ ] Verify .htaccess redirect is 301 (not 302)
  - [ ] Update canonical tags

- [ ] **Implement responsive images**
  ```html
  <img srcset="hero-768.webp 768w, hero-1200.webp 1200w, hero-1920.webp 1920w"
       sizes="100vw"
       width="1920" height="1080">
  ```

### Phase 2: Advanced Optimizations (Expected: 80 → 90+)

- [ ] **Extract and inline critical CSS**
  - [ ] Use Critical npm package
  - [ ] Inline ~10-15KB of above-fold styles
  - [ ] Async load remaining CSS

- [ ] **Defer non-critical JavaScript**
  - [ ] Add `defer` to analytics
  - [ ] Lazy load GTM
  - [ ] Purge Tailwind CSS

- [ ] **Optimize font loading**
  - [ ] Add `font-display: swap`
  - [ ] Preload primary font
  - [ ] Use system font stack as fallback

- [ ] **Enable compression & caching**
  - [ ] Enable Brotli
  - [ ] Set long-term cache headers
  - [ ] Verify CDN configuration

### Phase 3: Polish (Expected: 90 → 95+)

- [ ] **Minify all assets**
  - [ ] Minify CSS
  - [ ] Minify JS
  - [ ] Remove unused CSS rules

- [ ] **Optimize third-party scripts**
  - [ ] Lazy load chat widgets
  - [ ] Async load social media scripts
  - [ ] Self-host critical fonts

- [ ] **Monitor Core Web Vitals**
  - [ ] Set up CrUX monitoring
  - [ ] Configure GSC Core Web Vitals report
  - [ ] Schedule monthly performance audits

---

## 📈 Expected Results

| Phase | Actions | Expected Score | LCP | FCP |
|-------|---------|----------------|-----|-----|
| **Current** | - | 61/100 | 7.4s | 4.7s |
| **Phase 1** | Image optimization, fix redirects | 80-85/100 | ~2.5s | ~3.0s |
| **Phase 2** | Critical CSS, defer JS, fonts | 90-93/100 | ~2.0s | ~1.5s |
| **Phase 3** | Polish, monitoring | 95+/100 | <2.0s | <1.2s |

---

## 🛠️ Testing & Validation

After each phase, test with:

```bash
# Local testing
npm install -g lighthouse
lighthouse https://northgatebuilding.com.au/ --preset=desktop --output=html
lighthouse https://northgatebuilding.com.au/ --preset=mobile --output=html

# Or use the API script
cd Reporting
python3 pagespeed_analyzer.py
```

**Validation Checklist:**
- [ ] LCP < 2.5s on mobile
- [ ] FCP < 1.8s on mobile
- [ ] Performance score > 90
- [ ] No render-blocking resources
- [ ] All images lazy loaded except hero
- [ ] Fonts use `font-display: swap`

---

## 💰 ROI & Business Impact

**Why this matters:**
- **SEO:** Google uses Core Web Vitals as ranking factor
- **Conversions:** 1s delay = 7% conversion loss
- **Bounce Rate:** 53% of mobile users abandon sites >3s load time
- **User Experience:** Better performance = better brand perception

**Expected Outcomes:**
- Higher search rankings for local keywords
- Lower bounce rate
- Higher contact form submissions
- Better mobile user engagement

---

**Next Steps:**
1. Start with Phase 1 (image compression)
2. Test after each change
3. Document improvements
4. Move to Phase 2 once score >80

*Document generated by PageSpeed Insights API Analysis*  
*For questions: Doop UX - dax@doopux.com*
