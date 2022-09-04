import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.link}>
        <Link href='/term-and-condition'>Terms of Use</Link>
      </span>
      <span className={styles.link}>
        <Link href='/privacy-policy'>Privacy Policy</Link>
      </span>
      <span className={styles.link}>
        <Link href='/disclaimer'>Disclaimer</Link>
      </span>
      <span className={styles.link}>
        <Link href='/contact'>Contact</Link>
      </span>
    </footer>
  );
}
