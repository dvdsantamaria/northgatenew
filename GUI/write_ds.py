html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System Spec</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Base Tokens from project */
      --c-brand: #527B72;
      --c-dark: #0A0A0A;
      --c-bg: #F5F5F7;
      --c-card: #FFFFFF;
      --c-border: rgba(0, 0, 0, 0.08);
      
      --font-display: 'GravesendSans', 'Open Sans', sans-serif;
      --font-body: 'Open Sans', sans-serif;

      /* Design System Spec Styles */
      --ds-bg: #ffffff;
      --ds-text: #1a1a1a;
      --ds-muted: #6b7280;
      --ds-border: #e2e8f0;
    }

    @font-face {
      font-family: 'GravesendSans';
      src: url('../GravesendSans-Medium.otf') format('opentype');
      font-weight: 500;
      font-style: normal;
      font-display: swap;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--ds-bg);
      color: var(--ds-text);
      font-family: var(--font-body);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .ds-header {
      padding: 80px 40px 20px;
      max-width: 1440px;
      margin: 0 auto;
    }
    .ds-main-title {
      font-family: var(--font-display);
      font-size: clamp(48px, 8vw, 112px);
      font-weight: 500;
      letter-spacing: -0.02em;
      margin: 0;
      color: var(--c-dark);
    }
    
    .ds-container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 40px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 60px 40px;
      align-items: start;
    }
    @media (min-width: 768px) { .ds-container { grid-template-columns: repeat(2, 1fr); align-items: start; } }
    @media (min-width: 1100px) { .ds-container { grid-template-columns: repeat(3, 1fr); align-items: start; } }

    .ds-section { display: flex; flex-direction: column; gap: 32px; }
    .ds-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 700;
      border-bottom: 1px solid var(--ds-border);
      padding-bottom: 16px;
      margin: 0;
      color: var(--c-dark);
    }

    /* Typo */
    .ds-typo-item { display: flex; flex-direction: column; gap: 6px; }
    .ds-typo-preview { font-family: var(--font-display); color: var(--c-dark); line-height: 1.1; margin: 0; }
    .ds-typo-preview.body { font-family: var(--font-body); line-height: 1.6; }
    .ds-typo-meta { font-size: 12px; color: var(--ds-muted); font-family: var(--font-body); }

    /* Colors */
    .ds-color-grid { display: grid; gap: 24px; }
    .ds-color-item { display: flex; align-items: center; gap: 16px; }
    .ds-color-swatch {
      width: 48px; height: 48px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      border: 1px solid var(--c-border);
    }
    .ds-color-meta { display: flex; flex-direction: column; font-size: 13px; line-height: 1.4; color: var(--ds-text); font-weight: 600; }
    .ds-color-meta span:last-child { color: var(--ds-muted); font-size: 12px; text-transform: uppercase; font-family: ui-monospace, monospace; font-weight: 400; margin-top:2px;}

    /* Spacing */
    .ds-space-item { display: flex; align-items: center; gap: 24px; }
    .ds-space-box { border: 1px solid #cbd5e1; background: #f8fafc; }
    .ds-space-meta { font-size: 13px; color: var(--ds-text); display: flex; gap: 12px; align-items: center; }
    .ds-space-meta span:last-child { color: var(--ds-muted); font-size: 12px; }

    /* Buttons */
    .ds-btn-grid { display: grid; grid-template-columns: auto 1fr; gap: 24px 32px; align-items: center; justify-content: start; }
    .ds-btn {
      display: inline-flex; align-items: center; justify-content: center;
      padding: 12px 24px; border-radius: 999px;
      font-size: 12px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
      font-family: var(--font-body); cursor: pointer; transition: all 0.2s;
      width: max-content;
    }
    .ds-btn-primary { background: var(--c-brand); color: #fff; border: none; }
    .ds-btn-primary:hover { background: #456860; }
    .ds-btn-primary.disabled { background: #cbd5e1; color: #f8fafc; cursor: not-allowed; }
    
    .ds-btn-alt { background: transparent; color: var(--c-dark); border: 1px solid #cbd5e1; }
    .ds-btn-alt:hover { border-color: var(--c-dark); background: #f8fafc; }
    .ds-btn-alt.disabled { color: #cbd5e1; border-color: #e2e8f0; cursor: not-allowed; }

    .ds-label { font-size: 12px; color: var(--ds-text); font-weight: 500;  }

    /* Forms */
    .ds-form-group { display: flex; flex-direction: column; gap: 8px; }
    .ds-form-label { font-size: 12px; color: var(--c-dark); font-weight: 600; }
    .ds-input {
      padding: 12px 16px; border: 1px solid #cbd5e1; border-radius: 4px;
      font-size: 14px; font-family: var(--font-body); width: 100%; max-width: 320px;
      background: #fff; color: var(--c-dark); outline: none; transition: border-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }
    .ds-input:focus, .ds-input.active { border-color: var(--c-brand); box-shadow: 0 0 0 1px var(--c-brand); }
    .ds-input.error { border-color: #ef4444; background: #fef2f2; }
    .ds-input.error::placeholder { color: #ef4444; }
    
    .ds-inline-message {
      padding: 12px 16px; border-radius: 6px; font-size: 13px; font-family: var(--font-body);
      display: flex; align-items: center; gap: 12px; width: 100%; max-width: 320px; border: 1px solid transparent;
    }
    .ds-msg-default { background: #f1f5f9; color: #334155; border-color: #e2e8f0; }
    .ds-msg-info { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
    .ds-msg-success { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
    .ds-msg-error { background: #fef2f2; color: #b91c1c; border-color: #fecaca; }

    .ds-toggle-row { display: flex; align-items: center; gap: 16px; }
    .ds-toggle {
      width: 44px; height: 24px; background: #cbd5e1; border-radius: 12px;
      position: relative; cursor: pointer; transition: background 0.2s;
    }
    .ds-toggle::after {
      content: ''; position: absolute; top: 2px; left: 2px;
      width: 20px; height: 20px; background: #fff; border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1); transition: transform 0.2s;
    }
    .ds-toggle.active { background: var(--c-brand); }
    .ds-toggle.active::after { transform: translateX(20px); }

    /* Tabs */
    .ds-tabs { display: flex; border-bottom: 1px solid var(--ds-border); gap: 24px; margin-bottom: 16px; }
    .ds-tab { padding: 8px 0; font-size: 14px; color: var(--ds-muted); font-weight: 500; cursor: pointer; position: relative; }
    .ds-tab.active { color: var(--c-dark); font-weight: 600; }
    .ds-tab.active::after {
      content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
      height: 2px; background: var(--c-brand);
    }
  </style>
</head>
<body>
  <header class="ds-header">
    <h1 class="ds-main-title">Design System</h1>
  </header>

  <main class="ds-container">
    <!-- COLUMN 1 -->
    <div class="ds-column" style="display: flex; flex-direction: column; gap: 64px;">
      <section class="ds-section">
        <h2 class="ds-title">Typography</h2>
        
        <div class="ds-typo-item">
          <p class="ds-typo-preview" style="font-size: 56px;">Headline 1</p>
          <span class="ds-typo-meta">Display Hero XL · 56px / 1.05</span>
        </div>
        
        <div class="ds-typo-item">
          <p class="ds-typo-preview" style="font-size: 40px;">Headline 2</p>
          <span class="ds-typo-meta">Display Section XXL · 40px / 1.0</span>
        </div>
        
        <div class="ds-typo-item">
          <p class="ds-typo-preview" style="font-size: 28px;">Headline 3</p>
          <span class="ds-typo-meta">Section Title · 28px / 1.1</span>
        </div>
        
        <div class="ds-typo-item" style="margin-top: 16px;">
          <p class="ds-typo-preview body" style="font-size: 20px; font-weight: 500;">Lead Paragraph</p>
          <span class="ds-typo-meta">Open Sans Medium · 20px / 1.6</span>
        </div>
        
        <div class="ds-typo-item">
          <p class="ds-typo-preview body" style="font-size: 16px;">Body Paragraph. The design system enforces rules to build robust digital products.</p>
          <span class="ds-typo-meta">Open Sans Regular · 16px / 1.6</span>
        </div>
        
        <div class="ds-typo-item">
          <p class="ds-typo-preview body" style="font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;">Eyebrow Label</p>
          <span class="ds-typo-meta">Open Sans Bold · 11px / 1.4</span>
        </div>
      </section>

      <section class="ds-section">
        <h2 class="ds-title">Buttons</h2>
        <div class="ds-btn-grid">
          <button class="ds-btn ds-btn-primary">Primary</button>
          <span class="ds-label">Default</span>

          <button class="ds-btn ds-btn-primary" style="background: #3e5f58;">Primary</button>
          <span class="ds-label">Hover</span>

          <button class="ds-btn ds-btn-primary disabled">Primary</button>
          <span class="ds-label">Disabled</span>

          <button class="ds-btn ds-btn-alt">Alternative</button>
          <span class="ds-label">Default</span>

          <button class="ds-btn ds-btn-alt" style="border-color: var(--c-dark); background: #f8fafc;">Alternative</button>
          <span class="ds-label">Hover</span>

          <button class="ds-btn ds-btn-alt disabled">Alternative</button>
          <span class="ds-label">Disabled</span>
        </div>
      </section>
    </div>

    <!-- COLUMN 2 -->
    <div class="ds-column" style="display: flex; flex-direction: column; gap: 64px;">
      <section class="ds-section">
        <h2 class="ds-title">Color</h2>
        <div class="ds-color-grid">
          <div class="ds-color-item">
            <div class="ds-color-swatch" style="background: var(--c-brand);"></div>
            <div class="ds-color-meta"><span>Primary</span><span>#527B72</span></div>
          </div>
          <div class="ds-color-item">
            <div class="ds-color-swatch" style="background: #3e5f58;"></div>
            <div class="ds-color-meta"><span>Primary Dark</span><span>#3E5F58</span></div>
          </div>
          <div class="ds-color-item">
            <div class="ds-color-swatch" style="background: var(--c-dark);"></div>
            <div class="ds-color-meta"><span>Black</span><span>#0A0A0A</span></div>
          </div>
          <div class="ds-color-item">
            <div class="ds-color-swatch" style="background: var(--c-card);"></div>
            <div class="ds-color-meta"><span>Card Background</span><span>#FFFFFF</span></div>
          </div>
          <div class="ds-color-item">
            <div class="ds-color-swatch" style="background: var(--c-bg);"></div>
            <div class="ds-color-meta"><span>Page Background</span><span>#F5F5F7</span></div>
          </div>
          <div class="ds-color-item">
            <div class="ds-color-swatch" style="background: #cbd5e1;"></div>
            <div class="ds-color-meta"><span>Grey Border</span><span>#CBD5E1</span></div>
          </div>
        </div>
      </section>

      <section class="ds-section">
        <h2 class="ds-title">Forms</h2>
        <div class="ds-form-group">
          <label class="ds-form-label">Label</label>
          <input type="text" class="ds-input" placeholder="Placeholder text">
        </div>
        <div class="ds-form-group" style="margin-top: 16px;">
          <label class="ds-form-label">Label</label>
          <input type="text" class="ds-input active" value="Input active / focus">
        </div>
        <div class="ds-form-group" style="margin-top: 16px;">
          <label class="ds-form-label">Label</label>
          <input type="text" class="ds-input error" value="Error input state">
        </div>
      </section>
      
      <section class="ds-section">
        <h2 class="ds-title">Tabs</h2>
        <div class="ds-tabs">
          <div class="ds-tab active">Tab One</div>
          <div class="ds-tab">Tab Two</div>
          <div class="ds-tab">Tab Three</div>
        </div>
      </section>
    </div>

    <!-- COLUMN 3 -->
    <div class="ds-column" style="display: flex; flex-direction: column; gap: 64px;">
      <section class="ds-section">
        <h2 class="ds-title">Spacing</h2>
        <div class="ds-color-grid">
          <div class="ds-space-item">
            <div class="ds-space-box" style="width: 8px; height: 8px;"></div>
            <div class="ds-space-meta"><strong>XS</strong> <span>8px</span></div>
          </div>
          <div class="ds-space-item">
            <div class="ds-space-box" style="width: 16px; height: 16px;"></div>
            <div class="ds-space-meta"><strong>S</strong> <span>16px</span></div>
          </div>
          <div class="ds-space-item">
            <div class="ds-space-box" style="width: 24px; height: 24px;"></div>
            <div class="ds-space-meta"><strong>M</strong> <span>24px</span></div>
          </div>
          <div class="ds-space-item">
            <div class="ds-space-box" style="width: 40px; height: 40px;"></div>
            <div class="ds-space-meta"><strong>L</strong> <span>40px</span></div>
          </div>
          <div class="ds-space-item">
            <div class="ds-space-box" style="width: 64px; height: 64px;"></div>
            <div class="ds-space-meta"><strong>XL</strong> <span>64px</span></div>
          </div>
          <div class="ds-space-item">
            <div class="ds-space-box" style="width: 96px; height: 96px;"></div>
            <div class="ds-space-meta"><strong>XXL</strong> <span>96px</span></div>
          </div>
        </div>
      </section>

      <section class="ds-section">
        <h2 class="ds-title">Toggles</h2>
        <div class="ds-btn-grid" style="grid-template-columns: auto 1fr;">
          <div class="ds-toggle"></div>
          <span class="ds-label">Default Off</span>
          
          <div class="ds-toggle active"></div>
          <span class="ds-label">Default On</span>
        </div>
      </section>
      
      <section class="ds-section">
        <h2 class="ds-title">Inline Messages</h2>
        <div class="ds-inline-message ds-msg-default">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          This is a default message - check it out!
        </div>
        <div class="ds-inline-message ds-msg-info">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          This is an info message - check it out!
        </div>
        <div class="ds-inline-message ds-msg-success">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          This is a success message - check it out!
        </div>
        <div class="ds-inline-message ds-msg-error">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          This is an error message - check it out!
        </div>
      </section>

    </div>
  </main>
</body>
</html>
"""

with open("/Users/dax/Documents/Doop/Northgate Building/new/GUI/GUI.html", 'w', encoding='utf-8') as f:
    f.write(html_content)
