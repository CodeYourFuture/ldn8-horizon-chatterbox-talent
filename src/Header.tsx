import React from 'react';
import CustomLink from './components/CustomLink/CustomLink';

import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.headerWrapper}>
            <CustomLink to="/">Opportunities</CustomLink>
            <CustomLink to="/about">About</CustomLink>
        </header>
    )
};

export default Header;