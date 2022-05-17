import React, { useState } from 'react';
import MailChimPopUp from '../../../components/MailChimpPopUp';

import SlideButton from '../../../components/SlideButton/SlideButton';

import styles from './EmptyCard.module.scss';

const EmptyCard = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = (option: boolean) => {
        setShowPopup(option);
    }

    return (
        <div className={styles.emptyCardWrapper}>
            <h1 className={styles.headlines}>Want to be the first to hear about refugee schemes and opportunities?</h1>
            <SlideButton buttonText='Subscribe' onClick={() => handleShowPopup(true)}/>
            {showPopup && <MailChimPopUp onSuccess={() => handleShowPopup(false)} onClose={() => handleShowPopup(false)}/>}
        </div>
    )
}

export default EmptyCard;