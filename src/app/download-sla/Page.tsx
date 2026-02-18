'use client';

import { useEffect, useState } from 'react';
import styles from './download-sla.module.css';

export default function DownloadSLA() {
  const [sha256, setSha256] = useState<string | null>(null);

  useEffect(() => {
    // Fetch hash from your route headers without downloading the file yet
    fetch('/download-sla', { method: 'HEAD' })
      .then(res => {
        const hash = res.headers.get('TrustMonitor-Document-SHA256');
        if (hash) setSha256(hash);
      })
      .catch(() => setSha256('Unavailable'));
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.header}>
        <h1>TrustMonitor Service Level Agreement</h1>
        <p>Official document. Digital verification enforced.</p>
      </section>

      <section className={styles.notice}>
        <p>
          ⚠️ This is a legally binding document. Only download if you acknowledge the
          terms.
        </p>
        {sha256 && (
          <p className={styles.hash}>SHA256: {sha256}</p>
        )}
      </section>

      <section className={styles.download}>
        <a href="/download-sla" className={styles.downloadButton}>
          Download SLA PDF
        </a>
      </section>
    </main>
  );
}
