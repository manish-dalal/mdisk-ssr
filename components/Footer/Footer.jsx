import React from 'react';
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a className={styles.link} href='/term-and-condition'>
        Terms of Use
      </a>
      <a className={styles.link} href='/privacy-policy'>
        Privacy Policy
      </a>
      <a className={styles.link} href='/disclaimer'>
        Disclaimer
      </a>
      <a className={styles.link} href='/contact'>
        Contact
      </a>
    </footer>
  );
}
