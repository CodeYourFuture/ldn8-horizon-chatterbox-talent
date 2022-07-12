import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: string;
  outfit?: string;
  onClick?(x: any): any;
}

const Button = ({ children, outfit = 'filled', onClick }: ButtonProps) => {
  return (
    <button className={[styles.button, styles[outfit]].join(' ')} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
