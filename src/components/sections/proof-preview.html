<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Proof — TrustMonitor</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: #fff;
    color: #111827;
  }

  .section {
    padding: 96px 0;
    border-top: 1px solid #E5E7EB;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* ── Header ── */
  .eyebrow {
    display: block;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #9CA3AF;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 36px;
    font-weight: 700;
    color: #111827;
    line-height: 1.15;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  .sub {
    font-size: 16px;
    color: #4B5563;
    line-height: 1.7;
    max-width: 580px;
    margin-bottom: 48px;
  }

  /* ── Card ── */
  .card {
    border: 1px solid #111827;
    background: #FAFAFA;
  }

  .card-inner {
    padding: 32px;
  }

  /* ── Card top bar ── */
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-bottom: 24px;
    border-bottom: 1px solid #E5E7EB;
    margin-bottom: 24px;
  }

  .card-top-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .incident-id {
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 13px;
    color: #111827;
    font-weight: 500;
  }

  .badge {
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    color: #fff;
    background: #111827;
    padding: 3px 8px;
  }

  .detected-at {
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 12px;
    color: #9CA3AF;
  }

  /* ── Impact row ── */
  .impact {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    border: 1px solid #E5E7EB;
    margin-bottom: 32px;
    background: #fff;
  }

  .stat {
    padding: 16px 20px;
    border-right: 1px solid #E5E7EB;
  }

  .stat:last-child { border-right: none; }

  .stat-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9CA3AF;
    margin-bottom: 6px;
  }

  .stat-val {
    display: block;
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    font-family: 'Helvetica Neue', Arial, sans-serif;
  }

  .stat-val code {
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 12px;
    font-weight: 400;
    word-break: break-all;
  }

  .stat-val.loss { color: #7F1D1D; }

  /* ── Chain ── */
  .chain-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9CA3AF;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    margin-bottom: 0;
    display: block;
  }

  .chain {
    border: 1px solid #E5E7EB;
    background: #fff;
    margin-bottom: 32px;
    margin-top: 12px;
  }

  .step {
    display: grid;
    grid-template-columns: 200px 1fr;
    border-bottom: 1px solid #E5E7EB;
  }

  .step:last-child { border-bottom: none; }

  .step-left {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 20px;
    border-right: 1px solid #E5E7EB;
    background: #F9FAFB;
  }

  .step-num {
    width: 22px;
    height: 22px;
    min-width: 22px;
    background: #111827;
    color: #fff;
    font-size: 11px;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-title {
    font-size: 12px;
    font-weight: 600;
    color: #111827;
    line-height: 1.4;
    padding-top: 3px;
  }

  .step-right {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    justify-content: center;
  }

  .step-val {
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 12px;
    color: #111827;
    line-height: 1.7;
    word-break: break-all;
  }

  .step-note {
    font-size: 12px;
    color: #9CA3AF;
    line-height: 1.55;
  }

  .step-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .step-meta span {
    font-size: 13px;
    color: #374151;
  }

  .step-meta strong { color: #111827; }

  .pipe { color: #D1D5DB; }

  /* ── Verify ── */
  .verify-label {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9CA3AF;
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    display: block;
    margin-bottom: 12px;
  }

  .verify-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid #E5E7EB;
    background: #fff;
  }

  .verify-cmd {
    padding: 16px 20px;
    border-right: 1px solid #E5E7EB;
  }

  .verify-cmd:last-child { border-right: none; }

  .cmd-label {
    font-size: 11px;
    color: #6B7280;
    margin-bottom: 8px;
    display: block;
  }

  pre {
    font-family: 'SF Mono', Monaco, 'Courier New', monospace;
    font-size: 11px;
    color: #111827;
    background: #F3F4F6;
    border: 1px solid #E5E7EB;
    padding: 8px 12px;
    overflow-x: auto;
    white-space: pre;
    line-height: 1.6;
  }

  pre a {
    color: #1E40AF;
    text-decoration: none;
  }

  pre a:hover { text-decoration: underline; }

  /* ── Legal ── */
  .legal {
    margin-top: 24px;
    font-size: 11px;
    color: #9CA3AF;
    line-height: 1.65;
    padding-top: 20px;
    border-top: 1px solid #F3F4F6;
  }

  @media (max-width: 700px) {
    .impact { grid-template-columns: repeat(2, 1fr); }
    .impact .stat:nth-child(2) { border-right: none; }
    .impact .stat:nth-child(1),
    .impact .stat:nth-child(2) { border-bottom: 1px solid #E5E7EB; }

    .step { grid-template-columns: 1fr; }
    .step-left { border-right: none; border-bottom: 1px solid #E5E7EB; }

    .verify-grid { grid-template-columns: 1fr; }
    .verify-cmd { border-right: none; border-bottom: 1px solid #E5E7EB; }
    .verify-cmd:last-child { border-bottom: none; }
  }
</style>
</head>
<body>
<section class="section">
  <div class="container">

    <span class="eyebrow">Evidence Bundle · INC-2026021002471234</span>
    <h2>This is what proof looks like.</h2>
    <p class="sub">
      Every outage TrustMonitor detects is cryptographically sealed — hashed,
      timestamped on the Bitcoin blockchain, and signed with an Ed25519 key.
      You get a tamper-proof record you can verify without trusting us.
    </p>

    <div class="card">
      <div class="card-inner">

        <!-- Top bar -->
        <div class="card-top">
          <div class="card-top-left">
            <span class="incident-id">INC-2026021002471234</span>
            <span class="badge">CONFIRMED</span>
          </div>
          <time class="detected-at">Feb 10, 2026 · 02:47 AM UTC</time>
        </div>

        <!-- Impact -->
        <div class="impact">
          <div class="stat">
            <span class="stat-label">Endpoint</span>
            <span class="stat-val"><code>api.payments.acme.com<br>/v2/charge</code></span>
          </div>
          <div class="stat">
            <span class="stat-label">Downtime</span>
            <span class="stat-val">47 min</span>
          </div>
          <div class="stat">
            <span class="stat-label">Revenue Lost</span>
            <span class="stat-val loss">$3,525</span>
          </div>
          <div class="stat">
            <span class="stat-label">Consensus</span>
            <span class="stat-val">3 / 3 regions</span>
          </div>
        </div>

        <!-- Chain label -->
        <span class="chain-label">Cryptographic Proof Chain</span>

        <!-- Chain -->
        <div class="chain">

          <div class="step">
            <div class="step-left">
              <span class="step-num">1</span>
              <span class="step-title">Multi-Region<br>Consensus</span>
            </div>
            <div class="step-right">
              <span class="step-val">us-east-1 · eu-west-1 · ap-southeast-1</span>
              <span class="step-note">All three probes confirmed independently. No single point of trust.</span>
            </div>
          </div>

          <div class="step">
            <div class="step-left">
              <span class="step-num">2</span>
              <span class="step-title">SHA-256<br>Hash</span>
            </div>
            <div class="step-right">
              <span class="step-val">a3f8c2e1b9d74f6a0c5e8b2d1f3a9c7e<br>4b6d8f2a1c3e5b7d9f1a2c4e6b8d0f3a</span>
              <span class="step-note">Fingerprint of the complete evidence payload. One byte changed → different hash.</span>
            </div>
          </div>

          <div class="step">
            <div class="step-left">
              <span class="step-num">3</span>
              <span class="step-title">Bitcoin Mainnet<br>Anchor</span>
            </div>
            <div class="step-right">
              <div class="step-meta">
                <span>Block <strong>882,401</strong></span>
                <span class="pipe">|</span>
                <span>Feb 10, 2026 · 03:14 AM UTC</span>
              </div>
              <span class="step-note">Hash embedded in the Bitcoin blockchain. Immutable. No one can backdate this.</span>
            </div>
          </div>

          <div class="step">
            <div class="step-left">
              <span class="step-num">4</span>
              <span class="step-title">Ed25519<br>Signature</span>
            </div>
            <div class="step-right">
              <span class="step-val">trustmonitor-prod-2026-q1</span>
              <span class="step-note">Signed with TrustMonitor's published key. Verify against our public key registry independently.</span>
            </div>
          </div>

        </div>

        <!-- Verify yourself -->
        <span class="verify-label">Verify It Yourself</span>
        <div class="verify-grid">
          <div class="verify-cmd">
            <span class="cmd-label">Verify Bitcoin timestamp</span>
            <pre><code>ots verify inc_2026021002471234.ots</code></pre>
          </div>
          <div class="verify-cmd">
            <span class="cmd-label">Check the hash</span>
            <pre><code>shasum -a 256 \
  inc_2026021002471234.json</code></pre>
          </div>
          <div class="verify-cmd">
            <span class="cmd-label">View on blockchain</span>
            <pre><code><a href="https://blockstream.info/block-height/882401" target="_blank">blockstream.info/block‑height/882401 ↗</a></code></pre>
          </div>
        </div>

      </div>
    </div>

    <p class="legal">
      Self-authenticating electronic record · Fed. R. Evid. 902(13) &amp; 902(14) ·
      Bitcoin timestamp provides proof-of-existence prior to any dispute.
    </p>

  </div>
</section>
</body>
</html>
