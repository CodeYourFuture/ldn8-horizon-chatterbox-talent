import React from 'react';

import styles from './Footer.module.scss';
import ChatterboxLogo from './assets/chatterbox-logo-dark.png';

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <span>Powered by</span>
      <a href="https://www.chatterbox.io/">
        <img src={ChatterboxLogo} alt="Chatterbox logo" />
      </a>
    </footer>
  );
};

export default Footer;
