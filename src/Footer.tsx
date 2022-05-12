import React from 'react';

import styles from './Footer.module.scss';
import ChatterboxLogo from './assets/chatterbox-logo-dark.png';

const Footer = () => {
    return (
        <footer className={styles.footerWrapper}>
            <span>Powered by</span>
            <img src={ChatterboxLogo} alt="Chatterbox logo" />
        </footer>
    )
};

export default Footer;