import React from 'react';
import ActionButton from '../../../components/ActionButton/ActionButton';

import styles from './EmptyCard.module.scss';

const EmptyCard = () => {
    return (
        <div className={styles.emptyCardWrapper}>
            <h1 className={styles.headlines}>Want to be the first to hear about refugee schemes and opportunities?</h1>
            <ActionButton buttonText='Subscribe'/>
        </div>
    )
}

export default EmptyCard;