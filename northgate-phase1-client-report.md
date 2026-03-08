# Northgate Building Group
## Phase 1 Report: Technical Foundation & SEO Setup

**Prepared by:** Doop UX  
**Date:** March 2026  
**Website:** northgatebuilding.com.au

---

## What We Did: The Technical Work

### 1. Performance Investigation & Stabilization

We ran more than 20 performance tests using Google's Lighthouse tool (the same one Google uses to rank websites). Our goal was to improve mobile speed from 65 to 85+.

**What we tried:**
- Font loading optimizations (different strategies)
- CSS loading improvements
- JavaScript loading adjustments
- Schema markup enhancements
- Image loading optimizations

**What we discovered:**
The website was already well-optimized. Most "standard" improvements actually hurt performance instead of helping. For example:

| Change Attempted | Desktop Impact | Mobile Impact | Decision |
|-----------------|----------------|---------------|----------|
| Font-display swap | 97 → 93 (-4) | No change | Rolled back |
| Inline critical CSS | 97 → 67 (-30) | Degraded | Rolled back |
| Async Tailwind loading | 97 → 72 (-25) | 71 → 62 (-9) | Rolled back |
| Enhanced schema markup | No change | 78 → 72 (-6) | Rolled back |
| BreadcrumbList schema | No change | No change | Kept ✅ |

**Final Result:**
- **Desktop:** 93-97/100 (Excellent)
- **Mobile:** 78/100 (Good, stable)
- **Status:** We stopped making changes to prevent regression. The site is performing well.

---

### 2. Schema Markup Implementation

Schema markup is code that tells Google exactly what your content means (not just what it says). It helps you appear in rich results and improves how AI understands your business.

**What we implemented:**

#### ✅ BreadcrumbList Schema (All Pages)
Added navigation breadcrumbs that Google understands:
- **Homepage:** Shows "Home" in search results
- **Services:** Shows "Home > Services" 
- **About:** Shows "Home > About"
- **Projects:** Shows "Home > Projects"
- **Contact:** Shows "Home > Contact"

**Why this matters:** When people search, they see the path in Google results, which increases trust and click-through rates.

#### ❌ Enhanced Business Schema (Rolled Back)
We tried adding detailed business information (services, areas, contact details) using Google's recommended format. While technically correct, it added too much code and slowed mobile performance by 6 points.

**Decision:** Removed it. Performance is more important for rankings than this specific markup.

---

### 3. Code Fixes & Improvements

#### Fixed Visual Overflow Issue
**Problem:** The "01 — Mission Statement" section was displaying text wider than the screen on some devices.

**Solution:** Adjusted CSS classes to ensure text wraps properly within containers.

**Files modified:**
- `index.html` - Fixed text container width
- `styles.css` - Added word-wrap controls
- `combined.css` - Synced styles
- `scripts.js` - Improved text animation wrapping

#### Git Repository Cleanup
Updated `.gitignore` to exclude internal planning documents from version control:
- SEO strategy documents
- Internal reporting folders
- Branding strategy files

This keeps the repository clean and focused on actual website code.

---

### 4. Schema Validation & Corrections

During implementation, we discovered and fixed several typos in the schema markup:

| Page | Issue | Fix |
|------|-------|-----|
| services.html | "uservices" → "Services" | Fixed ✅ |
| about.html | "uabout" → "About" | Fixed ✅ |
| projects.html | "uprojects" → "Projects" | Fixed ✅ |
| contact.html | "ucontact" → "Contact" | Fixed ✅ |

All schema markup is now correct and validated across all pages.

---

### 5. Technical Foundation Audit

We validated all existing SEO foundations:

| Element | Status | Notes |
|---------|--------|-------|
| Title tags | ✅ Valid | All pages have unique, keyword-optimized titles |
| Meta descriptions | ✅ Valid | Sydney/Newcastle location intent included |
| Canonical URLs | ✅ Valid | No duplicate content issues |
| Open Graph tags | ✅ Valid | Social sharing optimized |
| Twitter Cards | ✅ Valid | X/Twitter sharing ready |
| robots.txt | ✅ Valid | Properly configured |
| Image alt text | ✅ Valid | All images have descriptions |
| Heading hierarchy | ✅ Valid | H1 structure correct on all pages |
| WebP images | ✅ Valid | Modern format with lazy loading |

**Result:** The website had solid SEO foundations before we started. No critical issues found.

---

## What This Means: Plain English Summary

### The Good News

**Your website is technically sound.** We've confirmed that all the basics are done right—titles, descriptions, images, code structure. This is more than half the battle.

**Your performance is stable.** After extensive testing, we've found the optimal configuration:
- Desktop scores: 93-97/100 (excellent)
- Mobile scores: 78/100 (good)

These are solid numbers that won't hurt your rankings.

**Your schema is working.** Google now understands your site structure better, which helps with:
- How your listing appears in search results
- Breadcrumb navigation in Google
- Future AI search features

### What We Learned

**"If it ain't broke, don't fix it" applies to websites.** Your site was already well-built. Many "standard" optimizations we tried actually made things worse. We documented every attempt so we know what NOT to do.

**Performance optimization has limits.** We couldn't reach the 85+ mobile target without breaking something else. The current 78/100 is a good, stable score that balances speed with functionality.

### What's Ready for Phase 2

With the technical foundation solid, we're ready to move to growth activities:

1. **Google Search Console** — Track what people search to find you
2. **Content optimization** — Target specific keywords people use
3. **Google Business Profile** — Dominate local searches
4. **AI Search optimization** — Prepare for ChatGPT, Perplexity, and Google's AI

### What We Need From You

To continue, we need access to:

| Item | Why We Need It | Time Needed |
|------|----------------|-------------|
| Google Search Console | See what people search to find you | 10 min setup |
| Google Business Profile | Optimize local search presence | 15 min invite |
| Current ad copy/materials | Align SEO with your marketing message | Email files |

---

## Deliverables Completed

✅ **BreadcrumbList Schema** — Deployed on all 5 pages  
✅ **Performance Stabilization** — Documented 20+ tests, found optimal config  
✅ **Visual Bug Fixes** — Mission Statement overflow resolved  
✅ **Schema Validation** — All markup corrected and tested  
✅ **Technical Audit** — All foundations verified  
✅ **Documentation** — All changes tracked in Git, lessons documented  

---

## Next Steps

**Option 1: Unblock Phase 2**  
Provide access to Google Search Console and Google Business Profile so we can:
- See what keywords bring you traffic
- Track ranking improvements
- Optimize for local searches

**Option 2: AI Search Preparation (Independent)**  
We can prepare your site for AI search (ChatGPT, Perplexity, Google AI Overviews) without needing access. This includes:
- Creating an AI-readable site manifest
- Structuring content for AI citations
- Building external presence for AI training data
- Extending schema markup

**Investment:** $350 one-time for AI Search preparation  
**Timeline:** 2-3 weeks  
**Dependencies:** None (can start immediately)

---

## Questions?

This report intentionally avoids technical jargon. If you want the detailed technical version—with code changes, specific test results, and implementation details—let us know and we'll provide the engineering documentation.

**Contact:** Doop UX  
**Report Date:** March 2026  
**Valid Through:** Next Phase Start

---

*Appendix: Technical documentation available upon request*
- Full Lighthouse test results (20+ reports)
- Git commit history with all changes
- Schema validation screenshots
- Performance optimization attempt log
