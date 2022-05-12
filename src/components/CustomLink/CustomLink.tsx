import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

import styles from './CustomLink.module.scss';

const CustomLink = ({ children, to, ...props}: LinkProps) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Link to={to} {...props} className={[styles.link, match && styles.active].join(' ')}>
            {children}
        </Link>
    )
};

export default CustomLink;