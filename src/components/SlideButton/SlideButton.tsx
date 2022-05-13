import React from 'react';

import styles from './SlideButton.module.scss';

interface SlideButtonProps {
    buttonText: string;
}

const SlideButton = ({ buttonText }: SlideButtonProps) => {
    return (
        <div id="container">
            <button className={styles["learn-more"]}>
                <span className={styles["circle"]} aria-hidden="true">
                <span className={[styles["icon"], styles["arrow"]].join(' ')}></span>
                </span>
                <span className={styles["button-text"]}>{buttonText}</span>
            </button>
        </div>
    )
};

export default SlideButton;