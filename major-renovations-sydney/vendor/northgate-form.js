(function () {
  function cleanDuplicateContainers() {
    document.querySelectorAll('#contact').forEach(function (section, index) {
      if (index > 0) section.remove();
    });
    document.querySelectorAll('[data-id="d89cae9"]').forEach(function (footer, index) {
      if (index > 0) footer.remove();
    });
  }

  function relocateMobileReviews() {
    if (window.innerWidth >= 768) return;
    const reviewSection = document.querySelector('.elementor.elementor-250 > [data-id="8dcb40b"]');
    const reviewInner = reviewSection && reviewSection.querySelector(':scope > .e-con-inner');
    const mobileReviews = document.querySelector('[data-id="0d9bbc3"]');
    if (!reviewInner || !mobileReviews) return;
    if (mobileReviews.parentElement !== reviewInner) reviewInner.appendChild(mobileReviews);
  }

  function relocateContact() {
    const contact = document.querySelector('#contact');
    const footer = document.querySelector('[data-id="d89cae9"]');
    const pageShell = document.querySelector('.elementor.elementor-250') || document.body;
    if (contact && contact.parentElement !== pageShell) pageShell.appendChild(contact);
    if (footer && footer.parentElement !== pageShell) pageShell.appendChild(footer);
    relocateMobileReviews();
    cleanDuplicateContainers();
  }

  relocateContact();
  setTimeout(relocateContact, 0);
  setTimeout(relocateContact, 250);
  setTimeout(relocateContact, 1000);

  const body = document.body;
  const landingPage = body && body.dataset.landingPage ? body.dataset.landingPage : 'major-renovations-sydney';
  const trial = body && body.dataset.trial ? body.dataset.trial : 'renovations-extensions-sydney';
  const form = document.getElementById('contactForm');
  const status = document.getElementById('form-status');

  function pushEvent(eventName, data) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({
      event: eventName,
      landing_page: landingPage,
      trial: trial
    }, data || {}));
    // Funnel and contact events also go to GA4, so drop-off shows up in reports,
    // not only in session recordings.
    if (typeof window.gtag === 'function' && (eventName.indexOf('form_') === 0 ||
        ['generate_lead', 'phone_link_click', 'email_link_click', 'scroll_depth_75'].indexOf(eventName) !== -1)) {
      window.gtag('event', eventName, Object.assign({ send_to: 'G-D6BNWWCL93' }, data || {}));
    }
    // Mirror form milestones to Clarity so recordings can be filtered by the step
    // where a visitor stopped (e.g. reached step 3 but never sent).
    if (eventName.indexOf('form_') === 0 || eventName === 'generate_lead') {
      if (typeof window.clarity === 'function') {
        window.clarity('event', eventName);
        if (data && data.deepest_step) window.clarity('event', 'form_abandoned_step_' + data.deepest_step);
      }
    }
  }

  function setClarityTag(name, value) {
    if (!value || typeof window.clarity !== 'function') return;
    window.clarity('set', name, value);
  }

  function setHiddenValue(name, fieldValue) {
    const field = form && form.querySelector('[name="' + name + '"]');
    if (field) field.value = fieldValue || '';
  }

  function createEventId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    return 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  function addTrackingValues() {
    const query = new URLSearchParams(window.location.search);
    setHiddenValue('landing_page', landingPage);
    setHiddenValue('trial', trial);
    ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (key) {
      const field = form && form.querySelector('[name="' + key + '"]');
      if (field && query.has(key)) field.value = query.get(key);
    });
  }

  function value(name) {
    const field = form.querySelector('[name="' + name + '"]:checked') || form.querySelector('[name="' + name + '"]');
    return field ? field.value.trim() : '';
  }

  document.querySelectorAll('[data-track]').forEach(function (element) {
    element.addEventListener('click', function () {
      pushEvent('landing_cta_click', { cta_name: element.dataset.track });
    });
  });

  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      pushEvent('phone_link_click', { link_text: link.textContent.trim() });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      pushEvent('email_link_click', { link_text: link.textContent.trim() });
    });
  });

  document.querySelectorAll('[data-expandable]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;
      const open = trigger.getAttribute('aria-expanded') !== 'true';
      trigger.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      if (open) pushEvent('content_expanded', { content_id: trigger.dataset.expandable });
    });
  });

  pushEvent('landing_view', { page_path: window.location.pathname });

  let scrollDepthReported = false;
  function reportScrollDepth() {
    if (scrollDepthReported) return;
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    if (window.scrollY + window.innerHeight >= documentHeight * 0.75) {
      scrollDepthReported = true;
      pushEvent('scroll_depth_75');
    }
  }
  window.addEventListener('scroll', reportScrollDepth, { passive: true });

  if (!form) return;
  addTrackingValues();

  let formStarted = false;
  form.addEventListener('focusin', function () {
    if (formStarted) return;
    formStarted = true;
    pushEvent('form_start');
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const steps = Array.prototype.slice.call(form.querySelectorAll('.form-step'));
  const progressBar = document.getElementById('form-progress-bar');
  const progressLabel = document.getElementById('form-progress-label');
  let deepestStep = 1;
  let submitted = false;
  let leadEventId = '';
  let partialSentFor = '';

  function ensureLeadEventId() {
    if (!leadEventId) leadEventId = createEventId();
    setHiddenValue('lead_event_id', leadEventId);
    return leadEventId;
  }

  // Complete enquiries go to Formspark (form.action), which notifies Jordan.
  // Partial ones (email captured on step 2) go only to the leads database
  // (data-leads-db), so nobody is emailed about an unfinished form.
  function leadRequest(submissionType, keepalive) {
    ensureLeadEventId();
    setHiddenValue('submission_type', submissionType);
    return {
      method: 'POST',
      keepalive: !!keepalive,
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams(new FormData(form)).toString()
    };
  }

  function saveToLeadsDb(submissionType) {
    const url = form.dataset.leadsDb;
    if (!url) return Promise.resolve(null);
    return fetch(url, leadRequest(submissionType, true));
  }

  // Text the visitor actually saw (label or option), not the internal code.
  function readable(name) {
    const radio = form.querySelector('[name="' + name + '"]:checked');
    if (radio) return (radio.closest('label') || radio).textContent.trim();
    const select = form.querySelector('select[name="' + name + '"]');
    if (select && select.selectedOptions[0]) return select.selectedOptions[0].text.trim();
    return value(name);
  }

  // Formspark only gets what Jordan needs to read, with plain labels. Tracking
  // fields (gclid, UTMs, lead id) stay in the leads database.
  function notificationPayload() {
    const name = [value('first_name'), value('last_name')].filter(Boolean).join(' ');
    const query = new URLSearchParams(window.location.search);
    const source = value('gclid') || value('gbraid') || value('wbraid') ? 'Google Ads'
      : (query.get('utm_source') || 'Website');
    const payload = {
      '_email.subject': 'New enquiry: ' + name + ', ' + value('property_suburb'),
      '_email.from': 'Northgate Website',
      '_email.template.title': 'New renovation enquiry',
      '_email.template.footer': 'false',
      'Name': name,
      'Phone': value('phone'),
      'Email': value('email'),
      'Suburb': value('property_suburb'),
      'Project': readable('project_type'),
      'Stage': readable('project_stage'),
      'Budget': readable('budget_band'),
      'Timing': readable('target_timing')
    };
    if (value('message')) payload['Message'] = value('message');
    payload['Source'] = source;
    return payload;
  }

  // Complete enquiries go to the leads Worker (form.action). It checks the
  // Turnstile token, forwards the readable notification to Formspark, stores
  // the row and texts Jordan. The Formspark address is not on the page.
  async function postLead() {
    ensureLeadEventId();
    setHiddenValue('submission_type', 'complete');
    const fields = {};
    new FormData(form).forEach(function (v, k) {
      if (k !== 'cf-turnstile-response') fields[k] = String(v);
    });
    renderTurnstile();
    const tokenField = form.querySelector('[name="cf-turnstile-response"]');
    return fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: tokenField ? tokenField.value : '', fields: fields, notification: notificationPayload() })
    });
  }

  // Step 2 asks for email, so a visitor who leaves on step 3 is still reachable.
  // Partial captures are not conversions: only generate_lead feeds Google Ads.
  function capturePartial() {
    const email = value('email');
    const emailField = form.querySelector('[name="email"]');
    if (!email || (emailField && !emailField.checkValidity()) || partialSentFor === email) return;
    partialSentFor = email;
    saveToLeadsDb('partial').then(function (response) {
      pushEvent(response && response.ok ? 'form_partial_capture' : 'form_partial_error', { lead_event_id: leadEventId });
    }).catch(function () {
      pushEvent('form_partial_error', { lead_event_id: leadEventId });
    });
  }

  function trackFormResponse(fieldName, fieldValue) {
    if (!fieldValue) return;
    const eventData = { form_field: fieldName };
    eventData[fieldName] = fieldValue;
    pushEvent('form_response_selected', eventData);
    if (['project_type', 'project_stage', 'property_suburb', 'budget_band'].indexOf(fieldName) !== -1) {
      setClarityTag(fieldName, fieldValue);
    }
  }

  form.querySelectorAll('input[name="project_type"], input[name="project_stage"], select[name="target_timing"], select[name="budget_band"]').forEach(function (field) {
    field.addEventListener('change', function () {
      trackFormResponse(field.name, field.value);
    });
  });

  const suburbField = form.querySelector('[name="property_suburb"]');
  if (suburbField) {
    suburbField.addEventListener('change', function () {
      trackFormResponse('property_suburb', suburbField.value.trim());
    });
  }

  // Turnstile renders only on the last step, so the rare visible check sits
  // next to "Send enquiry" and the token is fresh when the form is sent.
  let turnstileWidget = null;
  function renderTurnstile() {
    const slot = document.getElementById('turnstile-slot');
    if (turnstileWidget !== null || !slot || !window.turnstile) return;
    turnstileWidget = window.turnstile.render(slot, {
      sitekey: slot.dataset.sitekey,
      appearance: 'interaction-only',
      action: 'enquiry'
    });
  }

  function showStep(stepNumber) {
    if (stepNumber === 3) renderTurnstile();
    if (stepNumber > deepestStep) deepestStep = stepNumber;
    steps.forEach(function (step) {
      step.hidden = Number(step.dataset.step) !== stepNumber;
    });
    if (progressBar) progressBar.style.width = (stepNumber / steps.length * 100) + '%';
    if (progressLabel) progressLabel.textContent = 'Step ' + stepNumber + ' of ' + steps.length;
    // No automatic scrolling between steps. On a phone the jump reads as the page
    // moving on its own, which is exactly the moment people abandon the form.
    const heading = steps[stepNumber - 1] && steps[stepNumber - 1].querySelector('h3');
    if (heading && !prefersReducedMotion && window.innerWidth >= 900) {
      const box = heading.getBoundingClientRect();
      if (box.top < 0 || box.bottom > window.innerHeight) {
        heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }

  function stepFields(stepNumber) {
    return Array.prototype.slice.call(
      steps[stepNumber - 1].querySelectorAll('input[required], select[required], textarea[required]')
    );
  }

  function validStep(stepNumber) {
    return stepFields(stepNumber).every(function (field) {
      if (field.type === 'radio') return !!form.querySelector('[name="' + field.name + '"]:checked');
      return field.reportValidity();
    });
  }

  form.querySelectorAll('[data-step-next]').forEach(function (button) {
    button.addEventListener('click', function () {
      const from = Number(button.dataset.stepNext);
      if (!validStep(from)) {
        const radio = stepFields(from).find(function (field) {
          return field.type === 'radio' && !form.querySelector('[name="' + field.name + '"]:checked');
        });
        if (radio) radio.reportValidity();
        pushEvent('form_step_blocked', { step: from });
        return;
      }
      if (from === 1) {
        pushEvent('form_step_1_complete', {
          step: 1,
          project_type: value('project_type')
        });
      } else if (from === 2) {
        pushEvent('form_step_2_complete', {
          step: 2,
          project_type: value('project_type'),
          property_suburb: value('property_suburb'),
          project_stage: value('project_stage'),
          target_timing: value('target_timing'),
          budget_band: value('budget_band')
        });
        capturePartial();
      }
      showStep(from + 1);
    });
  });

  form.querySelectorAll('[data-step-back]').forEach(function (button) {
    button.addEventListener('click', function () {
      const from = Number(button.dataset.stepBack);
      pushEvent('form_step_back', { step: from });
      showStep(from - 1);
    });
  });

  window.addEventListener('pagehide', function () {
    if (submitted || !formStarted) return;
    pushEvent('form_abandoned', {
      deepest_step: deepestStep,
      project_type: value('project_type'),
      property_suburb: value('property_suburb'),
      project_stage: value('project_stage'),
      target_timing: value('target_timing'),
      budget_band: value('budget_band')
    });
  });

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value.trim()) return;
    ensureLeadEventId();
    const qualification = {
      project_type: value('project_type'),
      property_suburb: value('property_suburb'),
      project_stage: value('project_stage'),
      target_timing: value('target_timing'),
      budget_band: value('budget_band')
    };
    pushEvent('form_submit_attempt', Object.assign(
      { lead_event_id: leadEventId, lead_type: 'renovation_extension_enquiry' }, qualification));
    if (button) button.disabled = true;
    if (status) {
      status.className = 'form-status';
      status.textContent = 'Sending your enquiry...';
    }

    try {
      const response = await postLead();
      if (response.status === 403) {
        if (window.turnstile) window.turnstile.reset();
        if (status) {
          status.className = 'form-status error';
          status.textContent = 'Please complete the security check above and send again.';
        }
        pushEvent('form_challenge_failed', { lead_event_id: leadEventId });
        return;
      }
      if (!response.ok) throw new Error('Form submission failed');
      submitted = true;
      pushEvent('generate_lead', Object.assign(
        { lead_event_id: leadEventId, lead_type: 'renovation_extension_enquiry' }, qualification));
      // Google Ads conversion for this landing only. transaction_id stops a
      // double count if the same enquiry is sent twice.
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17545826472/2QRKCKiml4sdEKihwK5B',
          transaction_id: leadEventId
        });
      }
      if (status) status.textContent = 'Thank you. We will come back within one business day.';
      // Redirect to a dedicated confirmation URL so the enquiry also has a page-based
      // conversion signal that does not depend on a single dataLayer event firing.
      // No personal data is placed in the query string.
      const confirmation = new URLSearchParams({
        lead: leadEventId,
        pt: qualification.project_type || '',
        st: qualification.project_stage || '',
        bb: qualification.budget_band || ''
      });
      window.setTimeout(function () {
        window.location.href = 'major-renovations-sydney-thanks.html?' + confirmation.toString();
      }, 600);
    } catch (error) {
      pushEvent('form_submit_error', { lead_event_id: leadEventId, lead_type: 'renovation_extension_enquiry' });
      if (status) {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please call 0433 810 935 or try again.';
      }
    } finally {
      if (button) button.disabled = false;
    }
  });
})();
