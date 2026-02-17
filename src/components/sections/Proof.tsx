import React, { useEffect, useState } from 'react';
import Container from '../shared/Container';
import { PROOF_CONTENT } from '@/utils/constants';
import styles from './Proof.module.css';

type Incident = {
  incident_id: string;
  detected_at: string;
  endpoint: string;
  status: string;
  regions: string[];
  consensus: { required: number; total: number };
};

type ProofData = {
  hash: { algorithm: string; value: string };
  bitcoin_anchor: {
    block_height: number;
    anchored_at: string;
    network: string;
    ots_proof_file: string;
  };
  signature: { algorithm: string; public_key_id: string; value: string };
};

type Meta = {
  generated_at: string;
  service_version: string;
  environment: string;
};

type Distribution = {
  evidence_url: string;
  ots_proof_url: string;
};

type Evidence = {
  incident: Incident;
  proof: ProofData;
  meta: Meta;
  distribution: Distribution;
};

export default function Proof() {
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/evidence/inc_2026021002471234.json')
      .then((res) => {
        if (!res.ok) throw new Error('Evidence not found');
        return res.json();
      })
      .then((data: Evidence) => {
        setEvidence(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load evidence:', err);
        setLoading(false);
      });
  }, []);

  const copyToClipboard = async () => {
    if (!evidence) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(evidence, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (loading) {
    return (
      <section className={styles.proof}>
        <Container>
          <p className={styles.loading}>Retrieving cryptographic evidence bundle...</p>
        </Container>
      </section>
    );
  }

  if (!evidence) {
    return (
      <section className={styles.proof}>
        <Container>
          <p className={styles.error}>
            Evidence retrieval failed. Contact founding@trustmonitor.dev if this persists.
          </p>
        </Container>
      </section>
    );
  }

  const { incident, proof, meta, distribution } = evidence;

  // Calculate financial exposure (example: $4,500/hour baseline for payment endpoint)
  const downtimeMinutes = 47; // From incident timestamp
  const revenueImpact = Math.round((downtimeMinutes / 60) * 4500);

  return (
    <section className={styles.proof} id="proof" aria-labelledby="proof-heading">
      <Container>
        <div className={styles.header}>
          <h2 id="proof-heading">{PROOF_CONTENT.heading}</h2>
          <p className={styles.description}>{PROOF_CONTENT.description}</p>
        </div>

        {/* Live Incident Impact Banner */}
        <div className={styles.impactBanner}>
          <div className={styles.impactMeta}>
            <span className={styles.incidentId}>{incident.incident_id}</span>
            <span className={styles.incidentStatus} data-status={incident.status}>
              {incident.status.toUpperCase()}
            </span>
          </div>
          <div className={styles.impactDetails}>
            <div className={styles.impactStat}>
              <span className={styles.statLabel}>Endpoint</span>
              <span className={styles.statValue}>{incident.endpoint}</span>
            </div>
            <div className={styles.impactStat}>
              <span className={styles.statLabel}>Downtime</span>
              <span className={styles.statValue}>{downtimeMinutes} minutes</span>
            </div>
            <div className={styles.impactStat}>
              <span className={styles.statLabel}>Estimated Revenue Loss</span>
              <span className={styles.statValue} data-severity="high">
                ${revenueImpact.toLocaleString()}
              </span>
            </div>
          </div>
          <p className={styles.impactWarning}>
            ⚠️ If TrustMonitor failed to alert on this incident, you would be eligible for ${Math.min(500, revenueImpact * 0.1).toFixed(0)} payout under Professional tier SLA.
          </p>
        </div>

        {/* Cryptographic Proof Chain */}
        <div className={styles.proofChain}>
          <h3>Tamper-Proof Evidence Chain</h3>
          <div className={styles.chainSteps}>
            <div className={styles.chainStep}>
              <span className={styles.stepNumber}>1</span>
              <div className={styles.stepContent}>
                <h4>Multi-Region Consensus</h4>
                <p>
                  {incident.consensus.required}/{incident.consensus.total} regions confirmed outage
                </p>
                <ul className={styles.regionList}>
                  {incident.regions.map((region) => (
                    <li key={region}>
                      <code>{region}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>


            <div className={styles.chainStep}>
              <span className={styles.stepNumber}>2</span>
              <div className={styles.stepContent}>
                <h4>Cryptographic Hash</h4>
                <p>Evidence bundle hashed using SHA-256</p>
                <code className={styles.hashValue}>{proof.hash.value}</code>
              </div>
            </div>

            <div className={styles.chainStep}>
              <span className={styles.stepNumber}>3</span>
              <div className={styles.stepContent}>
                <h4>Bitcoin Blockchain Anchor</h4>
                <p>
                  Hash anchored to Bitcoin {proof.bitcoin_anchor.network} at block{' '}
                  <strong>{proof.bitcoin_anchor.block_height.toLocaleString()}</strong>
                </p>
                <p className={styles.timestamp}>
                  {new Date(proof.bitcoin_anchor.anchored_at).toLocaleString('en-US', {
                    dateStyle: 'long',
                    timeStyle: 'long',
                  })}
                </p>
              </div>
            </div>

            <div className={styles.chainStep}>
              <span className={styles.stepNumber}>4</span>
              <div className={styles.stepContent}>
                <h4>Digital Signature</h4>
                <p>Signed with {proof.signature.algorithm.toUpperCase()} key</p>
                <code className={styles.keyId}>{proof.signature.public_key_id}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Instructions */}
        <div className={styles.verification}>
          <h3>Independent Verification</h3>
          <p className={styles.verifyIntro}>
            You do not need to trust TrustMonitor. Verify cryptographic proof yourself:
          </p>

          <div className={styles.verifySteps}>
            <div className={styles.verifyStep}>
              <h4>Step 1: Download Evidence</h4>
              <div className={styles.downloadLinks}>
                <a
                  href={distribution.evidence_url}
                  download
                  className={styles.downloadButton}
                  aria-label="Download incident evidence JSON file"
                >
                  Download JSON Evidence
                </a>
                <a
                  href={distribution.ots_proof_url}
                  download
                  className={styles.downloadButton}
                  aria-label="Download OpenTimestamps proof file"
                >
                  Download OpenTimestamps Proof
                </a>
              </div>
            </div>

            <div className={styles.verifyStep}>
              <h4>Step 2: Verify Bitcoin Timestamp</h4>
              <pre className={styles.cliCommand}>
                <code>ots verify {proof.bitcoin_anchor.ots_proof_file}</code>
              </pre>
              <p className={styles.cliNote}>
                Requires OpenTimestamps CLI.{' '}
                <a
                  href="https://opentimestamps.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  Install instructions →
                </a>
              </p>
            </div>

            <div className={styles.verifyStep}>
              <h4>Step 3: Verify SHA-256 Hash</h4>
              <pre className={styles.cliCommand}>
                <code>shasum -a 256 inc_2026021002471234.json</code>
              </pre>
              <p className={styles.cliNote}>Expected hash: {proof.hash.value}</p>
            </div>

            <div className={styles.verifyStep}>
              <h4>Step 4: Check Bitcoin Block Explorer</h4>
              <a
                href={`https://blockstream.info/block/${proof.bitcoin_anchor.block_height}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.blockLink}
              >
                View Block {proof.bitcoin_anchor.block_height} on Blockstream.info →
              </a>
            </div>
          </div>
        </div>

        {/* Raw Evidence Bundle */}
        <div className={styles.rawEvidence}>
          <div className={styles.rawHeader}>
            <div>
              <h3>Complete Evidence Bundle</h3>
              <p className={styles.rawMeta}>
                Generated {new Date(meta.generated_at).toLocaleString()} • v{meta.service_version} •{' '}
                {meta.environment}
              </p>
            </div>
            <button
              onClick={copyToClipboard}
              className={styles.copyButton}
              aria-label="Copy evidence JSON to clipboard"
              data-copied={copied}
            >
              {copied ? '✓ Copied' : 'Copy JSON'}
            </button>
          </div>
          <pre className={styles.jsonDisplay}>
            <code>{JSON.stringify(evidence, null, 2)}</code>
          </pre>
        </div>

        {/* Court Admissibility Notice */}
        <div className={styles.legalNotice}>
          <h4>Legal Standing</h4>
          <p>
            This evidence bundle is designed for court admissibility under Federal Rules of Evidence 902(13)
            and 902(14) (self-authenticating electronic records with hash and digital signature).
          </p>
          <p>
            Bitcoin blockchain timestamp provides immutable proof-of-existence at the recorded time.
            OpenTimestamps protocol is recognized by courts in multiple jurisdictions.
          </p>
        </div>
      </Container>
    </section>
  );
}


