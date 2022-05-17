import React from 'react';

import styles from './SlideButton.module.scss';

interface SlideButtonProps {
    buttonText: string;
    onClick(t: any): any;
}

const SlideButton = ({ buttonText, onClick }: SlideButtonProps) => {
    return (
        <div id="container">
            <button className={styles["learn-more"]} onClick={onClick}>
                <span className={styles["circle"]} aria-hidden="true">
                <span className={[styles["icon"], styles["arrow"]].join(' ')}></span>
                </span>
                <span className={styles["button-text"]}>{buttonText}</span>
            </button>
        </div>
    )
};

export default SlideButton;