import re

with open("GUI/GUI.html", "r") as f:
    content = f.read()

# Replace the entire style block with a highly polished, fully responsive version
new_styles = """  <style>
    :root {
      --gui-max-width: 1600px;
      --gui-pad-x: clamp(24px, 5vw, 80px);
      --gui-pad-y: clamp(48px, 6vw, 88px);
      --gui-gap: clamp(40px, 5vw, 80px);
      --gui-panel-radius: 20px;
      --gui-border: rgba(0, 0, 0, 0.06);
      --gui-body: clamp(16px, 1.2vw, 18px);
      --gui-body-lg: clamp(17px, 1.3vw, 20px);
      --gui-body-sm: clamp(14px, 1vw, 15px);
      --gui-eyebrow: 11px;
      --gui-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      --c-bg: #ffffff;
      --c-dark: #0f172a;
      --c-gray-100: #f8fafc;
      --c-gray-200: #f1f5f9;
      --c-brand: #527B72;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--c-gray-200); /* Elegant neutral technical gray */
      color: var(--c-dark);
      font-family: "Open Sans", sans-serif;
      font-size: var(--gui-body);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Layout Containers */
    .roadmap-wrap {
      max-width: var(--gui-max-width);
      width: 100%;
      margin: 22px auto 46px;
      padding: 0 var(--gui-pad-x);
      position: relative;
      z-index: 2;
      font-family: "Plus Jakarta Sans", "Avenir Next", "Segoe UI", sans-serif;
    }

    .brand-header {
      margin: 12px 0 60px;
    }

    .brand-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 21px;
      flex-wrap: wrap; /* Responsive wrap */
    }

    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 13px;
    }

    .brand-logo img {
      height: 48px;
      width: auto;
      display: block;
    }

    .brand-right {
      display: inline-flex;
      align-items: center;
      gap: 16px;
    }

    .brand-subtitle {
      margin: 0;
      font-size: clamp(13px, 1vw, 16px);
      text-transform: uppercase;
      letter-spacing: 0.28em;
      color: #64748b;
      font-weight: 700;
      white-space: nowrap;
    }

    .brand-icon {
      width: clamp(48px, 5vw, 60px);
      height: clamp(48px, 5vw, 60px);
      display: grid;
      place-items: center;
      background: var(--c-bg);
      border: 1px solid var(--gui-border);
      border-radius: 14px;
      padding: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .brand-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }

    .gui-artboard {
      max-width: var(--gui-max-width);
      width: 100%;
      margin: 0 auto;
      padding: clamp(40px, 5vw, 72px) clamp(16px, 3vw, 40px) 96px;
      display: grid;
      gap: var(--gui-gap);
    }

    .gui-page {
      background: var(--c-bg);
      border: 1px solid var(--gui-border);
      padding: var(--gui-pad-y) var(--gui-pad-x);
      border-radius: var(--gui-panel-radius);
      box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0,0,0,0.02);
      display: grid;
      gap: clamp(32px, 4vw, 48px);
    }

    .gui-header {
      display: grid;
      gap: 16px;
    }

    .gui-kicker {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 600;
    }

    .gui-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(36px, 5vw, 64px);
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .gui-subtitle {
      max-width: 780px;
      color: #475569;
      font-size: var(--gui-body-lg);
      margin: 0;
    }

    .gui-section-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(24px, 3vw, 32px);
      line-height: 1.2;
      margin: 0;
      color: var(--c-dark);
    }

    .gui-divider {
      height: 1px;
      background: var(--c-gray-200);
      width: 100%;
    }

    /* Grids */
    .gui-grid-2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(24px, 4vw, 40px);
      align-items: start;
    }
    @media (min-width: 900px) {
      .gui-grid-2 { grid-template-columns: 1fr 1fr; }
    }

    .gui-grid-3 {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(24px, 3vw, 32px);
      align-items: start;
    }
    @media (min-width: 768px) {
      .gui-grid-3 { grid-template-columns: 1fr 1fr; }
    }
    @media (min-width: 1024px) {
      .gui-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
    }

    /* Token Cards */
    .gui-token {
      background: var(--c-gray-100);
      border: 1px solid var(--gui-border);
      border-radius: 12px;
      padding: clamp(20px, 3vw, 32px);
      display: grid;
      gap: 16px;
    }

    .gui-token-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 10px;
      color: #64748b;
      font-size: var(--gui-body-sm);
    }
    
    .gui-token-list li {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .gui-token-list li::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #cbd5e1;
    }

    .gui-token-label {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 700;
    }

    /* Responsive Table Wrap */
    .gui-table-wrap {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      border: 1px solid var(--gui-border);
      border-radius: 12px;
      background: var(--c-bg);
    }

    .gui-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--gui-body-sm);
      min-width: 800px; /* Force minimum width to scroll on mobile */
    }

    .gui-table th,
    .gui-table td {
      padding: 16px 20px;
      border-bottom: 1px solid var(--gui-border);
      text-align: left;
      vertical-align: middle;
    }

    .gui-table th {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 700;
      background: var(--c-gray-100);
    }
    
    .gui-table tr:last-child td {
      border-bottom: none;
    }

    .gui-table code {
      font-family: var(--gui-mono);
      font-size: 13px;
      color: #64748b;
      background: var(--c-gray-100);
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      border: 1px solid var(--gui-border);
    }

    /* Badges */
    .gui-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid var(--gui-border);
      border-radius: 999px;
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #475569;
      background: var(--c-gray-100);
      font-weight: 600;
      justify-self: start;
    }

    /* Components */
    .gui-component {
      display: grid;
      gap: 24px;
    }

    .gui-component-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(24px, 4vw, 32px);
      align-items: start;
    }
    @media (min-width: 1100px) {
      .gui-component-row {
        grid-template-columns: 1fr 340px;
      }
    }

    .gui-panel {
      background: var(--c-bg);
      border: 1px solid var(--gui-border);
      border-radius: 16px;
      padding: clamp(32px, 5vw, 56px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      overflow: hidden;
    }

    .gui-spec {
      background: var(--c-gray-100);
      border: 1px solid var(--gui-border);
      border-radius: 12px;
      padding: 24px 28px;
      display: grid;
      gap: 12px;
      font-family: var(--gui-mono);
      font-size: 13px;
      color: #475569;
    }

    .gui-spec strong {
      font-weight: 600;
      color: var(--c-dark);
      font-family: "Open Sans", sans-serif;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.1em;
      display: inline-block;
      width: 70px;
    }

    /* Specific Modules */
    .gui-service {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(32px, 4vw, 48px);
      align-items: center;
    }
    @media (min-width: 768px) {
      .gui-service { grid-template-columns: 1fr 1fr; }
    }
    @media (min-width: 1100px) {
      .gui-service { grid-template-columns: 380px 1fr; }
    }

    .gui-service-label {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 700;
    }

    .gui-service-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1;
      letter-spacing: -0.02em;
      margin: 18px 0 20px;
    }

    .gui-service-desc {
      font-size: var(--gui-body);
      color: #475569;
      margin: 0;
      max-width: 100%;
    }

    .gui-viewport-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(16px, 2vw, 24px);
    }
    @media (min-width: 768px) {
      .gui-viewport-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .gui-viewport-grid { grid-template-columns: repeat(3, 1fr); }
    }

    .gui-viewport-card {
      border: 1px solid var(--gui-border);
      border-radius: 12px;
      background: var(--c-gray-100);
      padding: clamp(20px, 3vw, 32px);
      display: grid;
      gap: 16px;
      transition: transform 0.3s ease;
    }
    .gui-viewport-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.04);
    }

    .gui-viewport-label {
      font-size: var(--gui-eyebrow);
      text-transform: uppercase;
      letter-spacing: 0.28em;
      color: #64748b;
      font-weight: 700;
    }

    .gui-viewport-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(24px, 3vw, 32px);
      line-height: 1.05;
      margin: 0;
    }

    .gui-viewport-metrics {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 12px;
      font-size: var(--gui-body-sm);
      color: #475569;
    }

    .gui-viewport-metrics code {
      font-family: var(--gui-mono);
      font-size: 12px;
      color: #334155;
      background: var(--c-bg);
      padding: 2px 6px;
      border: 1px solid var(--gui-border);
      border-radius: 4px;
    }

    .gui-service-image {
      width: 100%;
      height: clamp(280px, 30vw, 360px);
      background: var(--c-gray-200);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--gui-border);
    }

    .gui-service-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }
    .gui-service-image:hover img {
      transform: scale(1.05);
    }

    .gui-project {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(32px, 4vw, 48px);
      align-items: center;
    }
    @media (min-width: 768px) {
      .gui-project { grid-template-columns: 1fr 1fr; }
    }
    @media (min-width: 1100px) {
      .gui-project { grid-template-columns: 1fr 520px; }
    }

    .gui-project-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(28px, 4vw, 40px);
      line-height: 1.05;
      margin: 12px 0 12px;
    }

    .gui-project-meta {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 16px;
      font-weight: 700;
    }

    .gui-project-desc {
      font-size: var(--gui-body);
      color: #475569;
      margin: 0 0 24px;
    }

    .gui-tag-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .gui-tag {
      padding: 6px 14px;
      border-radius: 999px;
      background: var(--c-gray-200);
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: #475569;
      font-weight: 600;
    }

    .gui-project-image {
      width: 100%;
      height: clamp(280px, 30vw, 360px);
      background: var(--c-gray-200);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--gui-border);
    }

    .gui-project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .gui-process-panel {
      background: #0f172a;
      color: #fff;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: clamp(32px, 5vw, 56px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.1);
    }

    .gui-process-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(32px, 5vw, 48px);
      align-items: start;
    }
    @media (min-width: 900px) {
      .gui-process-grid { grid-template-columns: 280px 1fr; }
    }

    .gui-process-label {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.32em;
      text-transform: uppercase;
      color: #94a3b8;
      font-weight: 600;
    }

    .gui-process-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(36px, 5vw, 48px);
      line-height: 0.95;
      margin: 16px 0 0;
    }

    .gui-process-accordion {
      display: grid;
      gap: 0;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
    }

    .gui-process-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      padding: 20px 0;
      cursor: pointer;
      transition: background 0.3s;
    }
    .gui-process-item:hover {
      background: rgba(255,255,255,0.02);
    }

    .gui-process-toggle {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 16px;
      font-size: clamp(18px, 2vw, 20px);
      font-weight: 500;
      color: #f8fafc;
    }

    .gui-process-index {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #64748b;
    }

    .gui-process-panel-text {
      margin-top: 12px;
      font-size: var(--gui-body-sm);
      line-height: 1.6;
      color: #94a3b8;
      max-width: 420px;
    }

    .gui-process-item.is-collapsed .gui-process-panel-text {
      display: none;
    }

    .gui-button-row {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .gui-cta-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 28px;
      border-radius: 999px;
      background: var(--c-brand);
      color: #fff;
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .gui-cta-primary:hover {
      background: #3e5f58;
      transform: translateY(-1px);
    }

    .gui-cta-outline {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      color: #475569;
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      background: transparent;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .gui-cta-outline:hover {
      background: #f1f5f9;
      color: #0f172a;
    }

    .gui-form {
      display: grid;
      gap: 24px;
    }

    .gui-form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      padding: 24px 0;
      border-bottom: 1px dashed #cbd5e1;
    }
    @media (min-width: 768px) {
      .gui-form-row { grid-template-columns: 200px 1fr; gap: 32px; }
    }

    .gui-form-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(20px, 3vw, 24px);
      line-height: 1.1;
      color: var(--c-dark);
    }

    .gui-form-field {
      display: grid;
      gap: 12px;
    }

    .gui-form-field label {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #64748b;
      font-weight: 700;
    }

    .gui-form-field input,
    .gui-form-field textarea {
      border: none;
      border-bottom: 1px solid #cbd5e1;
      padding: 8px 0;
      background: transparent;
      font-size: var(--gui-body);
      font-family: var(--font-body);
      color: var(--c-dark);
      transition: border-color 0.2s;
    }
    .gui-form-field input:focus,
    .gui-form-field textarea:focus {
      outline: none;
      border-bottom-color: var(--c-brand);
    }

    .gui-form-field textarea {
      min-height: 120px;
      resize: vertical;
    }

    .gui-footer-title {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(32px, 5vw, 52px);
      line-height: 0.95;
      margin: 0;
      color: var(--c-dark);
    }

    .gui-type-sample {
      font-family: "GravesendSans", "Plus Jakarta Sans", sans-serif;
      font-size: clamp(28px, 4vw, 36px);
      line-height: 1.1;
      margin: 0;
      color: var(--c-dark);
    }

    .gui-type-sample-body {
      font-size: var(--gui-body);
      margin: 0;
    }

    .gui-type-sample-eyebrow {
      font-size: var(--gui-eyebrow);
      letter-spacing: 0.32em;
      text-transform: uppercase;
      margin: 0;
      color: #64748b;
    }

    /* Spacing Visualizers */
    .gui-spacing-bar {
      height: 24px;
      background: var(--c-gray-200);
      border-radius: 6px;
      border: 1px dotted rgba(0,0,0,0.15);
      background-image: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.02) 4px, rgba(0,0,0,0.02) 8px);
    }
    .gui-spacing-bar.primary {
      background-color: #e0e7ff;
      border-color: #818cf8;
      background-image: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(129,140,248,0.2) 4px, rgba(129,140,248,0.2) 8px);
    }

    .gui-spacing-stack {
      display: grid;
      gap: 16px;
      background: var(--c-bg);
      border: 1px solid var(--gui-border);
      border-radius: 12px;
      padding: 24px;
    }

    .gui-spacing-item {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    @media (min-width: 640px) {
      .gui-spacing-item { grid-template-columns: 120px 1fr; align-items: center; }
    }
    
    .gui-spacing-item strong {
      display: inline-block;
      width: 32px;
      font-weight: 700;
      color: var(--c-dark);
    }

    .gui-fonts {
      display: grid;
      gap: 12px;
      font-size: var(--gui-body-sm);
      color: #475569;
    }

    .page-footer {
      margin: 56px auto 32px;
      max-width: var(--gui-max-width);
      width: 100%;
      padding: 0 var(--gui-pad-x);
      color: #64748b;
      font-size: 13px;
      font-family: "Plus Jakarta Sans", "Avenir Next", "Segoe UI", sans-serif;
    }

    .footer-top {
      background: var(--c-bg);
      border-radius: 16px;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      border: 1px solid var(--gui-border);
    }

    .footer-locations {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 18px;
      color: #334155;
      font-weight: 600;
    }

    .footer-locations span {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .footer-flag {
      width: 18px;
      height: 12px;
      border-radius: 2px;
      object-fit: cover;
      display: inline-block;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    }

    .footer-contact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #0f172a;
      font-weight: 700;
      text-decoration: none;
      padding-left: 20px;
      border-left: 1px solid #cbd5e1;
    }

    .footer-bottom {
      text-align: center;
      margin-top: 16px;
      color: #94a3b8;
      font-size: 12px;
    }
  </style>"""

# Read the HTML content
style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)
content = style_pattern.sub(new_styles, content)

# Additional HTML structuring

# 1. Update the intentionally non-responsive text to modern responsive text
content = content.replace("Fixed artboard for web typography, spacing, and component standards. Layout is intentionally non-responsive to represent stable design decisions.", "Fluid artboard for web typography, spacing, and component standards. Layout is highly responsive to accommodate mobile, tablet, desktop, and widescreen viewports seamlessly.")

# 2. Wrap the .gui-table inside a .gui-table-wrap for responsive scrolling
table_str = '<table class="gui-table">'
table_wrap_open = '<div class="gui-table-wrap">\n      <table class="gui-table">'
content = content.replace(table_str, table_wrap_open)

table_close_str = '</table>'
table_wrap_close = '</table>\n      </div>'
content = content.replace(table_close_str, table_wrap_close)

# Write out the updated file
with open("GUI/GUI.html", "w") as f:
    f.write(content)

print("Successfully redesigned GUI.html with responsive logic and polished aesthetic!")
