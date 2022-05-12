import React from 'react';

import styles from './ActionButton.module.scss';

interface ActionButtonProps {
    buttonText: string;
}

const ActionButton = ({ buttonText }: ActionButtonProps) => {
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

export default ActionButton;