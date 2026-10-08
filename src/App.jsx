import React, { useMemo, useState } from 'react'

const coverage = [
  {
    id: 'accessibility',
    label: 'Accessibility',
    kicker: 'WCAG & inclusive UX',
    title: 'Some visitors may not know what this button does.',
    body: 'The button has no accessible name, so a screen reader announces only “Button.”',
    standard: 'WCAG 2.1 AA · 4.1.2',
    footprint: 'Found on 12 of 20 pages checked',
    action: 'Give the button an accessible name',
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    kicker: 'Public legal terms',
    title: 'A key term may be missing or unclear.',
    body: 'Verena checks the public terms on your site and flags language that may need attention.',
    standard: 'Document review',
    footprint: 'Public website terms',
    action: 'Review the flagged clause',
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    kicker: 'Notice & collection',
    title: 'Your privacy notice may not match what the site collects.',
    body: 'Verena compares public-facing notices with the website elements it can inspect.',
    standard: 'Policy review',
    footprint: 'Public website content',
    action: 'Review the privacy notice',
  },
  {
    id: 'cookies',
    label: 'Cookies & Trackers',
    kicker: 'Scripts & disclosures',
    title: 'A tracker may be present without a clear notice.',
    body: 'Verena surfaces public-site tracking and notice gaps that deserve a closer look.',
    standard: 'Tracker review',
    footprint: 'Public website scripts',
    action: 'Review the tracker disclosure',
  },
  {
    id: 'email',
    label: 'Commercial Email',
    kicker: 'Forms & consent',
    title: 'A signup flow may need clearer consent language.',
    body: 'Verena checks public website forms and the language around commercial email collection.',
    standard: 'Form review',
    footprint: 'Public website forms',
    action: 'Review consent language',
  },
  {
    id: 'claims',
    label: 'Marketing Claims',
    kicker: 'Claims & context',
    title: 'A claim may need human judgment.',
    body: 'Some findings depend on context. Verena can flag them for +Human supervision.',
    standard: 'Judgment required',
    footprint: 'Public marketing content',
    action: 'Escalate for +Human review',
  },
]

const plans = [
  { name: 'Free', price: '$0', credits: '500 credits', description: 'Explore your first website analysis.', cta: 'Start for free' },
  { name: 'Starter', price: '$99', suffix: '/month', credits: '5,000 credits / month', description: 'For smaller websites and regular reviews.', cta: 'Choose Starter' },
  { name: 'Professional', price: '$299', suffix: '/month', credits: '25,000 credits / month', description: 'For growing teams with more pages and change.', cta: 'Choose Professional' },
  { name: 'Enterprise', price: '$999', suffix: '/month', credits: '125,000 credits / month', description: 'For larger organizations and broader coverage.', cta: 'Choose Enterprise' },
]

const humanPlans = [
  { name: 'Free', price: '$0', credits: '500 credits', description: 'No credit card required.', cta: 'Start for free' },
  { name: 'Starter', price: '$499', suffix: '/month', credits: '25,000 credits / month', description: 'For smaller teams that want professional supervision.', cta: 'Choose this plan' },
  { name: 'Professional', price: '$999', suffix: '/month', credits: '100,000 credits / month', description: 'For growing teams with regular supervised reviews.', cta: 'Choose this plan' },
  { name: 'Enterprise', price: '$2,999', suffix: '/month', credits: '500,000 credits / month', description: 'For organizations that need broad supervised coverage.', cta: 'Choose this plan' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m5.2 10.2 3 3 6.6-7" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Logo({ showBeta = false }) {
  return (
    <a className="brand" href="#top" aria-label="Verena home">
      <img className="brand-logo" src="/verena-logo.png" alt="Verena" />
      {showBeta && <span className="beta-badge">Beta</span>}
    </a>
  )
}

function UrlAnalyzer({ compact = false }) {
  return (
    <form className={`url-analyzer ${compact ? 'url-analyzer--compact' : ''}`} onSubmit={(e) => e.preventDefault()}>
      <label className="sr-only" htmlFor={compact ? 'site-url-final' : 'site-url'}>Website URL</label>
      <input id={compact ? 'site-url-final' : 'site-url'} type="url" placeholder="https://yourwebsite.com" autoComplete="url" />
      <button className="button button--primary" type="submit">Analyze your website <ArrowIcon /></button>
    </form>
  )
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Verena website compliance dashboard illustration">
      <img src="/verena-dashboard.png" alt="Verena visually comparing a website with compliance findings" />
    </div>
  )
}

function ProcessVisual() {
  return (
    <div className="process-visual" aria-hidden="true">
      <div className="browser-shell">
        <div className="browser-bar"><span /><span /><span /><b>yourwebsite.com</b></div>
        <div className="browser-body">
          <div className="browser-main">
            <div className="ghost-title" />
            <div className="ghost-copy"><i /><i /><i /></div>
            <div className="ghost-hero" />
            <div className="ghost-cards"><i /><i /><i /></div>
          </div>
          <div className="scan-rail">
            <div className="scan-status"><span>Analysis</span><b>86%</b></div>
            <div className="scan-progress"><i /></div>
            <div className="scan-items">
              <div className="is-done"><CheckIcon /><span>Accessibility</span></div>
              <div className="is-done"><CheckIcon /><span>Privacy policy</span></div>
              <div className="is-active"><span className="scan-dot" /><span>Cookies & trackers</span></div>
              <div><span className="scan-dot" /><span>Marketing claims</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FindingPreview({ selected }) {
  return (
    <div className="finding-preview" aria-hidden="true">
      <div className="finding-preview__top">
        <span>verena / findings</span>
        <i>•••</i>
      </div>
      <div className="finding-preview__body">
        <div className="severity-pill"><span /> Needs attention</div>
        <div className="finding-mini-title">{selected.label}</div>
        <div className="finding-demo">
          <div className="demo-before">
            <small>ON YOUR SITE</small>
            <div className="demo-button"><span>Button</span><b>!</b></div>
          </div>
          <div className="demo-line"><i /><b /></div>
          <div className="demo-after">
            <small>CLEARER</small>
            <div className="demo-button demo-button--good"><CheckIcon /><span>Add to cart</span></div>
          </div>
        </div>
        <div className="finding-proof">
          <span>Technical detail</span>
          <strong>{selected.standard}</strong>
        </div>
      </div>
    </div>
  )
}

function HumanVisual() {
  return (
    <div className="human-visual" aria-hidden="true">
      <div className="human-card human-card--verena">
        <div className="human-avatar">V</div>
        <div><span>Verena</span><small>AI analysis</small></div>
        <b className="human-state"><CheckIcon /> Finding ready</b>
      </div>
      <div className="human-bridge">
        <span />
        <div>Judgment needed</div>
        <b />
      </div>
      <div className="human-card human-card--counsel">
        <div className="human-avatar human-avatar--plus">+</div>
        <div><span>+Human</span><small>Supervisor review</small></div>
        <b className="human-state human-state--purple">Counsel review</b>
      </div>
      <div className="human-note">Escalate only when context or legal judgment matters.</div>
    </div>
  )
}

function App() {
  const [activeCoverage, setActiveCoverage] = useState('accessibility')
  const [pricingMode, setPricingMode] = useState('standard')
  const selected = useMemo(() => coverage.find((item) => item.id === activeCoverage) ?? coverage[0], [activeCoverage])
  const activePlans = pricingMode === 'human' ? humanPlans : plans

  return (
    <div className="page-shell" id="top">
      <header className="site-header">
        <div className="container header-inner">
          <Logo showBeta />
          <nav className="main-nav" aria-label="Primary navigation">
            <a href="#how">How it works</a>
            <a href="#coverage">Coverage</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">Resources</a>
          </nav>
          <div className="header-actions">
            <a className="login-link" href="/login">Login</a>
            <a className="button button--primary button--small" href="#analyze">Analyze your website <ArrowIcon /></a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="analyze">
          <div className="hero-glow hero-glow--one" />
          <div className="hero-glow hero-glow--two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Website compliance. Simplified</p>
              <h1>Your website<br />might look complete:<br /><span>Make sure it is.</span></h1>
              <p className="hero-body">Verena analyzes your website for accessibility, privacy, legal and content compliance — and shows you exactly what to fix.</p>
              <UrlAnalyzer />
              <p className="microcopy">No credit card required <span>·</span> After sign-up, continue with Verena in conversation.</p>
            </div>
            <HeroVisual />
          </div>
        </section>

        <section className="coverage-strip" aria-label="Compliance coverage overview">
          <div className="container coverage-strip__inner">
            <p>One website. Six checks.</p>
            <div className="coverage-strip__items">
              {coverage.map((item, index) => <span key={item.id}><i>0{index + 1}</i>{item.label}</span>)}
            </div>
          </div>
        </section>

        <section className="section section--how" id="how">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">How it works</p>
                <h2>From a public URL to a clear next step.</h2>
              </div>
              <p>Start with your website. Verena reads what is publicly visible, turns technical checks into understandable findings, and gives you a practical next action.</p>
            </div>

            <div className="process-layout">
              <ProcessVisual />
              <div className="process-list">
                <article><span>01</span><div><h3>Analyze</h3><p>Verena reads your pages, forms, policies and scripts across six compliance areas.</p></div></article>
                <article><span>02</span><div><h3>Understand</h3><p>Each finding explains the issue in plain language, while keeping the technical evidence available.</p></div></article>
                <article><span>03</span><div><h3>Improve & monitor</h3><p>Get a next step, draft revisions or developer-ready changes — then keep track as the website evolves.</p></div></article>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--coverage" id="coverage">
          <div className="container">
            <div className="section-heading section-heading--coverage">
              <div>
                <p className="eyebrow">Verified by Verena</p>
                <h2>Findings you can actually understand and act on.</h2>
              </div>
              <p>Technical proof stays available. The business meaning comes first. Pick a coverage area to see how Verena frames the finding.</p>
            </div>

            <div className="coverage-workspace">
              <div className="coverage-nav-wrap">
                <div className="coverage-nav" role="tablist" aria-label="Compliance coverage areas">
                  {coverage.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={activeCoverage === item.id}
                      className={activeCoverage === item.id ? 'coverage-nav__item is-active' : 'coverage-nav__item'}
                      onClick={() => setActiveCoverage(item.id)}
                    >
                      <span>0{index + 1}</span>
                      <div><strong>{item.label}</strong><small>{item.kicker}</small></div>
                      <ArrowIcon />
                    </button>
                  ))}
                </div>
              </div>

              <article className="finding-card" aria-live="polite">
                <div className="finding-card__copy">
                  <div className="status-line"><span /> Needs attention <i>{selected.label}</i></div>
                  <h3>{selected.title}</h3>
                  <p>{selected.body}</p>
                  <div className="finding-meta">
                    <div><span>Technical detail</span><strong>{selected.standard}</strong></div>
                    <div><span>Where</span><strong>{selected.footprint}</strong></div>
                  </div>
                  <a className="next-step" href="#analyze"><span>Next step</span><strong>{selected.action}</strong><ArrowIcon /></a>
                </div>
                <FindingPreview selected={selected} />
              </article>
            </div>
          </div>
        </section>

        <section className="section section--human" id="human">
          <div className="container human-layout">
            <div className="human-copy">
              <p className="eyebrow human-eyebrow">+HUMAN</p>
              <h2>AI when it can help.<br />Human judgment when it matters.</h2>
              <p>With +Human, a professional from Invictus Counsel supervises Verena’s work. Findings that require legal judgment can be flagged for your +Human Supervisor.</p>
              <div className="button-row">
                <a className="button button--primary" href="#analyze">Analyze your website <ArrowIcon /></a>
                <a className="text-link" href="#pricing">See plans <ArrowIcon /></a>
              </div>
            </div>
            <HumanVisual />
          </div>
        </section>

        <section className="section section--pricing" id="pricing">
          <div className="container">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Pricing</p>
              <h2>Start small. Scale the coverage when you need it.</h2>
              <div className="pricing-tabs" role="tablist" aria-label="Pricing type">
                <button type="button" role="tab" aria-selected={pricingMode === 'standard'} className={pricingMode === 'standard' ? 'is-active' : ''} onClick={() => setPricingMode('standard')}>Standard</button>
                <button type="button" role="tab" aria-selected={pricingMode === 'human'} className={pricingMode === 'human' ? 'is-active' : ''} onClick={() => setPricingMode('human')}>+Human</button>
              </div>
              <p>{pricingMode === 'human' ? 'Includes a +Human Supervisor from Invictus Counsel.' : 'Every account starts with credits. Move up when your website, review cadence or team grows.'}</p>
            </div>
            <div className="pricing-scroll">
              <div className="pricing-grid">
                {activePlans.map((plan) => (
                  <article className={`price-card ${pricingMode === 'human' ? 'price-card--human' : ''}`} key={`${pricingMode}-${plan.name}`}>
                    <div className="price-card__top">
                      <div className="price-card__name-row"><p>{plan.name}</p>{pricingMode === 'human' && <span>+Human</span>}</div>
                      <div className="price"><strong>{plan.price}</strong>{plan.suffix && <span>{plan.suffix}</span>}</div>
                      <p className="plan-description">{plan.description}</p>
                    </div>
                    <div className="price-card__bottom">
                      <div className="credits"><CheckIcon /><span>{plan.credits}</span></div>
                      <a href="#analyze" className={`button ${pricingMode === 'human' ? 'button--primary' : 'button--outline'}`}>{plan.cta} <ArrowIcon /></a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="pricing-note">{pricingMode === 'human' ? '+Human plans combine Verena with professional supervision.' : '+Human supervision is available when a finding needs professional judgment.'}</p>
          </div>
        </section>

        <section className="section section--trust" id="faq">
          <div className="container trust-layout">
            <div className="trust-panel">
              <p className="eyebrow">Built on trust</p>
              <h2>Your website. Your permission. A defined scope.</h2>
              <div className="trust-list">
                <div><span>01</span><div><strong>Your permission comes first</strong><p>Analysis starts only after you create an account and confirm your authority to analyze the website.</p></div></div>
                <div><span>02</span><div><strong>Public website content only</strong><p>Verena analyzes public website content. It does not enter private accounts or change your site behind the scenes.</p></div></div>
                <div><span>03</span><div><strong>Backed by human counsel</strong><p>When you engage a +Human Supervisor, your privacy and confidentiality are protected by a law firm.</p></div></div>
              </div>
            </div>

            <div className="faq-panel">
              <p className="eyebrow">Resources</p>
              <h2>Questions before you start?</h2>
              <div className="faq-list">
                <details open>
                  <summary>Can I start for free?</summary>
                  <p>Yes. Every account gets 500 credits, enough to begin your first analysis.</p>
                </details>
                <details>
                  <summary>What do you actually check?</summary>
                  <p>Accessibility, Terms of Service, Privacy Policy, Cookies & Trackers, Commercial Email and Marketing Claims.</p>
                </details>
                <details>
                  <summary>Do I need an account before analyzing my site?</summary>
                  <p>Yes. You create an account and confirm your authority before the analysis starts.</p>
                </details>
                <details>
                  <summary>Will Verena change my website for me?</summary>
                  <p>Verena can draft document revisions and developer-ready code changes, but it does not change your site behind the scenes.</p>
                </details>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-glow" />
          <div className="container final-cta__inner">
            <div>
              <p className="eyebrow">Start with your website</p>
              <h2>Your website can look complete.<br />Now make sure it is.</h2>
              <p>Enter your URL to begin. You’ll create an account, confirm your authority, and continue with Verena in conversation.</p>
            </div>
            <div className="final-cta__form">
              <UrlAnalyzer compact />
              <p className="microcopy">Free to start <span>·</span> No credit card required</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div><Logo /><p>AI-native website compliance, explained in plain language.</p></div>
          <nav aria-label="Footer navigation">
            <div><span>Product</span><a href="#how">How it works</a><a href="#coverage">Coverage</a><a href="#human">+Human</a></div>
            <div><span>Company</span><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="#top">Contact</a></div>
            <div><span>Legal</span><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Accessibility</a></div>
          </nav>
        </div>
        <div className="container footer-bottom"><span>© Verena</span><span>Website compliance, simplified.</span></div>
      </footer>
    </div>
  )
}

export default App
