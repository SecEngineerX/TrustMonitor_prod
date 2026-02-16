import React from 'react';
import Container from '../shared/Container';
import { PROOF_CONTENT, EVIDENCE_EXAMPLE } from '@/utils/constants';
import styles from './Proof.module.css';

export default function Proof() {
  return (
    <section className={styles.proof} id="proof">
      <Container>
        <div className={styles.header}>
          <h2>{PROOF_CONTENT.heading}</h2>
          <p className={styles.description}>{PROOF_CONTENT.description}</p>
        </div>
        
        <div className={styles.features}>
          {PROOF_CONTENT.features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <h3>{feature.title}</h3>
              <p className={styles.detail}>{feature.detail}</p>
              <p className={styles.technical}>{feature.technical}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.example}>
          <div className={styles.exampleHeader}>
            <span className={styles.exampleLabel}>{PROOF_CONTENT.example.label}</span>
            <span className={styles.exampleFilename}>{PROOF_CONTENT.example.filename}</span>
          </div>
          <pre className={styles.exampleCode}>
            {JSON.stringify(EVIDENCE_EXAMPLE, null, 2)}
          </pre>
          <div className={styles.exampleFooter}>
            <a 
              href={EVIDENCE_EXAMPLE.verification} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.verifyLink}
            >
              Verify this evidence on-chain →
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
