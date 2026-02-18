'use client';

import React, { useEffect, useState } from 'react';
import Container from '../shared/Container';

// ─── Types ────────────────────────────────────────────────────────────────────

type Evidence = {
  incident: {
    incident_id: string;
    detected_at: string;
    endpoint: string;
    status: string;
    regions: string[];
    consensus: { required: number; total: number };
  };
  proof: {
    hash: { algorithm: string; value: string };
    bitcoin_anchor: {
      block_height: number;
      anchored_at: string;
      network: string;
      ots_proof_file: string;
    };
    signature: {
      algorithm: string;
      public_key_id: string;
      value: string;
    };
  };
  meta: {
    generated_at: string;
    service_version: string;
    environment: string;
  };
  distribution: {
    evidence_url: string;
    ots_proof_url: string;
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const mono = "'SF Mono', Monaco, 'Courier New', monospace";
const sans = "'Helvetica Neue', Arial, sans-serif";

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  });
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Proof() {
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/evidence/inc_2026021002471234.json')
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed');
        return r.json();
      })
      .then((d: Evidence) => {
        setEvidence(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section style={styles.section} id="proof">
        <Container>
          <p style={styles.loadingText}>Loading evidence bundle...</p>
        </Container>
      </section>
    );
  }

  if (!evidence) {
    return (
      <section style={styles.section} id="proof">
        <Container>
          <p style={styles.errorText}>Evidence unavailable. Contact support.</p>
        </Container>
      </section>
    );
  }

  const { incident, proof, meta, distribution } = evidence;
  const hash = proof.hash.value;

  return (
    <section style={styles.section} id="proof">
      <Container>

        {/* Header */}
        <span style={styles.eyebrow}>
          Evidence Bundle · {incident.incident_id}
        </span>
        <h2 style={styles.heading}>This is what proof looks like.</h2>
        <p style={styles.sub}>
          Every outage TrustMonitor detects is cryptographically sealed —
          hashed, timestamped on the Bitcoin blockchain, and signed with an
          Ed25519 key. You get a tamper-proof record you can verify without
          trusting us.
        </p>

        {/* Card */}
        <div style={styles.card}>
          <div style={styles.cardInner}>

            {/* Top bar */}
            <div style={styles.cardTop}>
              <div style={styles.cardTopLeft}>
                <span style={styles.incidentId}>{incident.incident_id}</span>
                <span style={styles.badge}>{incident.status.toUpperCase()}</span>
              </div>
              <time style={styles.timestamp}>{fmt(incident.detected_at)}</time>
            </div>

            {/* Stats row */}
            <div style={styles.statsGrid}>
              <Stat label="Endpoint">
                <code style={styles.code}>{incident.endpoint}</code>
              </Stat>
              <Stat label="Consensus">
                <span style={styles.statVal}>
                  {incident.consensus.total}/{incident.consensus.total} regions
                </span>
              </Stat>
              <Stat label="Environment">
                <span style={styles.statVal}>{meta.environment}</span>
              </Stat>
              <Stat label="Service Version" last>
                <span style={styles.statVal}>v{meta.service_version}</span>
              </Stat>
            </div>

            {/* Proof chain */}
            <span style={styles.sectionLabel}>Cryptographic Proof Chain</span>
            <div style={styles.chain}>

              <Step n={1} title="Multi-Region Consensus">
                <span style={styles.stepVal}>
                  {incident.regions.join(' · ')}
                </span>
                <span style={styles.stepNote}>
                  {incident.consensus.total} probes confirmed independently.
                  Requires {incident.consensus.required} for consensus.
                  No single point of trust.
                </span>
              </Step>

              <Step n={2} title="SHA-256 Hash">
                <span style={styles.stepVal}>
                  {hash.slice(0, 32)}
                  <br />
                  {hash.slice(32)}
                </span>
                <span style={styles.stepNote}>
                  Fingerprint of the complete evidence payload.
                  One byte changed → different hash.
                </span>
              </Step>

              <Step n={3} title="Bitcoin Mainnet Anchor">
                <div style={styles.metaRow}>
                  <span style={styles.metaText}>
                    Block{' '}
                    <strong style={styles.metaStrong}>
                      {proof.bitcoin_anchor.block_height.toLocaleString()}
                    </strong>
                  </span>
                  <span style={styles.pipe}>|</span>
                  <span style={styles.metaText}>
                    {fmt(proof.bitcoin_anchor.anchored_at)}
                  </span>
                </div>
                <span style={styles.stepNote}>
                  Hash embedded in the Bitcoin {proof.bitcoin_anchor.network}.
                  Immutable. No one can backdate this.
                </span>
              </Step>

              <Step n={4} title="Ed25519 Signature" last>
                <span style={styles.stepVal}>
                  {proof.signature.public_key_id}
                </span>
                <span style={styles.stepNote}>
                  Signed with TrustMonitor's published key. Verify against
                  our public key registry independently.
                </span>
              </Step>

            </div>

            {/* Verify yourself */}
            <span style={styles.sectionLabel}>Verify It Yourself</span>
            <div style={styles.verifyGrid}>

              <VerifyCmd label="1. Verify Bitcoin timestamp">
                {`ots verify ${proof.bitcoin_anchor.ots_proof_file}`}
              </VerifyCmd>

              <VerifyCmd label="2. Check the hash">
                {`shasum -a 256 \\\n  ${incident.incident_id}.json`}
              </VerifyCmd>

              <VerifyCmd label="3. View on blockchain" last>
                <a
                  href={`https://blockstream.info/block-height/${proof.bitcoin_anchor.block_height}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  blockstream.info/block-height/
                  {proof.bitcoin_anchor.block_height} ↗
                </a>
              </VerifyCmd>

            </div>

            {/* Downloads */}
            <div style={styles.downloads}>
              <span style={styles.downloadsLabel}>Download</span>
              <a href={distribution.evidence_url} download style={styles.dlLink}>
                JSON bundle ↓
              </a>
              <span style={styles.pipe}>·</span>
              <a href={distribution.ots_proof_url} download style={styles.dlLink}>
                OTS proof ↓
              </a>
            </div>

          </div>
        </div>

        {/* Legal */}
        <p style={styles.legal}>
          Generated {fmt(meta.generated_at)} · Self-authenticating electronic
          record · Fed. R. Evid. 902(13) &amp; 902(14) · Bitcoin timestamp
          provides proof-of-existence prior to any dispute.
        </p>

      </Container>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stat({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        ...styles.stat,
        borderRight: last ? 'none' : '1px solid #E5E7EB',
      }}
    >
      <span style={styles.statLabel}>{label}</span>
      {children}
    </div>
  );
}

function Step({
  n,
  title,
  children,
  last,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        ...styles.step,
        borderBottom: last ? 'none' : '1px solid #E5E7EB',
      }}
    >
      <div style={styles.stepLeft}>
        <span style={styles.stepNum}>{n}</span>
        <span style={styles.stepTitle}>{title}</span>
      </div>
      <div style={styles.stepRight}>{children}</div>
    </div>
  );
}

function VerifyCmd({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        ...styles.verifyCmd,
        borderRight: last ? 'none' : '1px solid #E5E7EB',
      }}
    >
      <span style={styles.cmdLabel}>{label}</span>
      <pre style={styles.pre}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  // Layout
  section: {
    padding: '96px 0',
    background: '#fff',
    borderTop: '1px solid #E5E7EB',
  },

  // Header
  eyebrow: {
    display: 'block',
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#9CA3AF',
    marginBottom: 20,
  },
  heading: {
    fontFamily: sans,
    fontSize: 36,
    fontWeight: 700,
    color: '#111827',
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
    margin: '0 0 16px',
  },
  sub: {
    fontFamily: sans,
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 1.7,
    maxWidth: 580,
    margin: '0 0 48px',
  },
  loadingText: {
    fontFamily: mono,
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 24,
  },
  errorText: {
    fontFamily: mono,
    fontSize: 13,
    color: '#7F1D1D',
    marginTop: 24,
  },

  // Card
  card: {
    border: '1px solid #111827',
    background: '#FAFAFA',
  },
  cardInner: {
    padding: 32,
  },

  // Card top bar
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 24,
    borderBottom: '1px solid #E5E7EB',
    marginBottom: 24,
  },
  cardTopLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  incidentId: {
    fontFamily: mono,
    fontSize: 13,
    fontWeight: 500,
    color: '#111827',
  },
  badge: {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.08em',
    color: '#fff',
    background: '#111827',
    padding: '3px 8px',
  },
  timestamp: {
    fontFamily: mono,
    fontSize: 12,
    color: '#9CA3AF',
  },

  // Stats grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    border: '1px solid #E5E7EB',
    background: '#fff',
    marginBottom: 32,
  },
  stat: {
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  statLabel: {
    fontFamily: sans,
    fontSize: 10,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#9CA3AF',
  },
  statVal: {
    fontFamily: sans,
    fontSize: 15,
    fontWeight: 600,
    color: '#111827',
  },
  code: {
    fontFamily: mono,
    fontSize: 11,
    color: '#111827',
    wordBreak: 'break-all',
    lineHeight: 1.6,
  },

  // Section label (reused above chain + verify)
  sectionLabel: {
    display: 'block',
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#9CA3AF',
    marginBottom: 12,
  },

  // Proof chain
  chain: {
    border: '1px solid #E5E7EB',
    background: '#fff',
    marginBottom: 32,
  },
  step: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
  },
  stepLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: 20,
    borderRight: '1px solid #E5E7EB',
    background: '#F9FAFB',
  },
  stepNum: {
    width: 22,
    height: 22,
    minWidth: 22,
    flexShrink: 0,
    background: '#111827',
    color: '#fff',
    fontFamily: mono,
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    fontFamily: sans,
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
    lineHeight: 1.4,
    paddingTop: 2,
  },
  stepRight: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    justifyContent: 'center',
  },
  stepVal: {
    fontFamily: mono,
    fontSize: 12,
    color: '#111827',
    lineHeight: 1.7,
    wordBreak: 'break-all',
  },
  stepNote: {
    fontFamily: sans,
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 1.55,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaText: {
    fontFamily: sans,
    fontSize: 13,
    color: '#374151',
  },
  metaStrong: {
    color: '#111827',
  },
  pipe: {
    color: '#D1D5DB',
  },

  // Verify commands
  verifyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    border: '1px solid #E5E7EB',
    background: '#fff',
    marginBottom: 24,
  },
  verifyCmd: {
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  cmdLabel: {
    fontFamily: sans,
    fontSize: 11,
    color: '#6B7280',
  },
  pre: {
    margin: 0,
    padding: '8px 12px',
    fontFamily: mono,
    fontSize: 11,
    color: '#111827',
    background: '#F3F4F6',
    border: '1px solid #E5E7EB',
    overflow: 'auto',
    whiteSpace: 'pre',
    lineHeight: 1.6,
  },
  link: {
    color: '#1E40AF',
    textDecoration: 'none',
  },

  // Downloads
  downloads: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingTop: 20,
    borderTop: '1px solid #E5E7EB',
  },
  downloadsLabel: {
    fontFamily: mono,
    fontSize: 10,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#9CA3AF',
    marginRight: 4,
  },
  dlLink: {
    fontFamily: mono,
    fontSize: 12,
    color: '#1E40AF',
    textDecoration: 'none',
  },

  // Legal
  legal: {
    marginTop: 24,
    paddingTop: 20,
    borderTop: '1px solid #F3F4F6',
    fontFamily: sans,
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 1.65,
  },
};
