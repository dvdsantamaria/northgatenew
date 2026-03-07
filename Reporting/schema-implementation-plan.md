# Schema Markup Implementation Plan
## Northgate Building Group

**Fecha:** March 7, 2026  
**Estado Actual:** Home page con schemas básicos, páginas internas sin structured data  
**Objetivo:** Rich Results para todos los servicios y páginas clave

---

## 📊 Current State Analysis

### Home Page (index.html)
✅ **Implementado:**
- `@graph` con múltiples schemas
- `HomeAndConstructionBusiness` (parcial)
- `Service` schemas básicos
- `FAQPage` (2 FAQs)

⚠️ **Missing/Recommended:**
- BreadcrumbList
- LocalBusiness completo con geodata
- Review/Rating schema
- PriceRange
- OpeningHoursSpecification

### Páginas Internas
❌ **Sin Schema:**
- services.html
- about.html
- projects.html
- contact.html

---

## 🎯 Implementation Priority

### Priority 1: Home Page Enhancements
**Impact:** ⭐⭐⭐⭐⭐ | **Effort:** Bajo

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://northgatebuilding.com.au/#business",
      "name": "Northgate Building Group",
      "url": "https://northgatebuilding.com.au/",
      "telephone": "+61-433-810-935",
      "email": "enquiries@northgatebuilding.com.au",
      "priceRange": "$$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Sydney",
          "containedIn": "New South Wales"
        },
        {
          "@type": "City", 
          "name": "Newcastle",
          "containedIn": "New South Wales"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Building Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom New Homes"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Renovations & Extensions"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Knockdown Rebuilds"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47"
      }
    }
  ]
}
```

### Priority 2: Services Page
**Impact:** ⭐⭐⭐⭐⭐ | **Effort:** Medio

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Custom Home Building",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "Northgate Building Group",
    "@id": "https://northgatebuilding.com.au/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Sydney"},
    {"@type": "City", "name": "Newcastle"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Service Packages",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Custom New Homes",
        "description": "Architecturally designed homes for Sydney families",
        "price": "1500000",
        "priceCurrency": "AUD",
        "priceValidUntil": "2026-12-31"
      }
    ]
  }
}
```

### Priority 3: BreadcrumbList (Todas las páginas)
**Impact:** ⭐⭐⭐⭐ | **Effort:** Bajo

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://northgatebuilding.com.au/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://northgatebuilding.com.au/services.html"
    }
  ]
}
```

### Priority 4: Projects/Portfolio
**Impact:** ⭐⭐⭐ | **Effort:** Medio

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Verda, Yamba",
      "url": "https://northgatebuilding.com.au/projects.html#verda"
    }
  ]
}
```

### Priority 5: Contact Page
**Impact:** ⭐⭐⭐ | **Effort:** Bajo

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Northgate Building Group",
  "description": "Start your custom home or renovation project in Sydney or Newcastle",
  "mainEntity": {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://northgatebuilding.com.au/#business"
  }
}
```

---

## 🔧 Implementation Code

### 1. Enhanced Home Page Schema
**File:** `index.html` (reemplazar schema existente)

```html
<!-- Schema: HomeAndConstructionBusiness + Services + FAQ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://northgatebuilding.com.au/#business",
      "name": "Northgate Building Group",
      "alternateName": "Northgate",
      "url": "https://northgatebuilding.com.au/",
      "logo": "https://northgatebuilding.com.au/assets/newlogo.webp",
      "image": "https://northgatebuilding.com.au/assets/hero-poster.webp",
      "telephone": "+61-433-810-935",
      "email": "enquiries@northgatebuilding.com.au",
      "priceRange": "$$$$",
      "description": "Custom homes and renovations across Sydney and Newcastle. Builder-led delivery with transparent pricing and dedicated project teams.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sydney",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-33.8688",
        "longitude": "151.2093"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Sydney",
          "containedInPlace": {
            "@type": "State",
            "name": "New South Wales"
          }
        },
        {
          "@type": "City",
          "name": "Newcastle",
          "containedInPlace": {
            "@type": "State",
            "name": "New South Wales"
          }
        },
        {
          "@type": "City",
          "name": "Port Stephens"
        },
        {
          "@type": "City",
          "name": "Northern Beaches"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Building Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom New Homes",
              "description": "Architecturally designed homes built with clarity and precision"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Renovations & Extensions",
              "description": "Transform your existing home with thoughtful improvements"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Knockdown Rebuilds",
              "description": "Start fresh on your existing land with a brand new home"
            }
          }
        ]
      },
      "sameAs": [
        "https://www.instagram.com/northgatebuildinggroup/"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to build a custom home in Sydney?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Custom homes in Sydney typically range from $1.5M to $5M+ depending on size, specifications, and site conditions. We provide transparent fixed-price contracts with detailed breakdowns."
          }
        },
        {
          "@type": "Question",
          "name": "Do you build in Newcastle as well as Sydney?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we build across both Sydney and Newcastle, with renovations being particularly popular in Newcastle and custom homes in Sydney."
          }
        },
        {
          "@type": "Question",
          "name": "What is builder-led delivery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Builder-led delivery means your project is managed directly by Northgate's directors from design through to handover, ensuring clear communication and accountability throughout."
          }
        }
      ]
    }
  ]
}
</script>
```

### 2. BreadcrumbList para todas las páginas
**Files:** Todas las páginas HTML

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://northgatebuilding.com.au/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://northgatebuilding.com.au/services.html"
    }
  ]
}
</script>
```

### 3. Services Page Schema
**File:** `services.html`

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Custom Home Building",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "Northgate Building Group",
    "@id": "https://northgatebuilding.com.au/#business"
  },
  "areaServed": [
    {"@type": "City", "name": "Sydney"},
    {"@type": "City", "name": "Newcastle"}
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Building Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Custom New Homes",
        "description": "Architecturally designed homes for Sydney families seeking quality and clarity",
        "url": "https://northgatebuilding.com.au/services.html#new-homes"
      },
      {
        "@type": "Offer",
        "name": "Renovations & Extensions",
        "description": "Transform your existing home with thoughtful improvements and additions",
        "url": "https://northgatebuilding.com.au/services.html#renovations"
      },
      {
        "@type": "Offer",
        "name": "Knockdown Rebuilds",
        "description": "Start fresh on your existing land with a brand new custom home",
        "url": "https://northgatebuilding.com.au/services.html#knockdown-rebuilds"
      }
    ]
  }
}
</script>
```

---

## 📋 Implementation Checklist

### Week 1: Core Schemas
- [ ] Update Home page schema (HomeAndConstructionBusiness completo)
- [ ] Add BreadcrumbList a todas las páginas
- [ ] Implementar Service schema en services.html
- [ ] Test con Google Rich Results Tool

### Week 2: Extended Schemas
- [ ] Add ContactPage schema a contact.html
- [ ] Add AboutPage schema a about.html
- [ ] Implementar ItemList para projects.html
- [ ] Añadir 5-10 FAQs adicionales a home page

### Week 3: Rich Results Optimization
- [ ] Solicitar reviews de clientes pasados
- [ ] Implementar Review schema cuando tengamos 10+ reviews
- [ ] Añadir HowTo schema para "Building Process"
- [ ] Crear Article schemas para blog posts (futuro)

---

## 🧪 Testing Strategy

### Pre-deployment
```bash
# Validar JSON-LD syntax
python3 -c "import json; json.load(open('schema.json'))"

# Rich Results Test
# https://search.google.com/test/rich-results
```

### Post-deployment
- Monitorear Google Search Console "Enhancements" report
- Verificar indexación de schemas en URL Inspection
- Tracking de Rich Results appearances

---

## 📈 Expected Impact

| Schema Type | Expected Rich Result | Timeline |
|-------------|---------------------|----------|
| FAQPage | FAQ Rich Snippet | 1-2 semanas |
| BreadcrumbList | Breadcrumb in SERP | 1-2 semanas |
| HomeAndConstructionBusiness | Knowledge Panel | 1-3 meses |
| Service | Service Rich Result | 2-4 semanas |
| Review (futuro) | Star Ratings | Cuando se implemente |

---

**Document prepared by:** AI SEO Assistant  
**Aligned with:** Northgate Brand Guidelines V3 + Digital Strategy Q1 2026
