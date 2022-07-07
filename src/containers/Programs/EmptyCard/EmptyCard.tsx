import React, { useState } from 'react';
import MailChimPopUp from '../../../components/MailChimpPopUp';

import SlideButton from '../../../components/SlideButton/SlideButton';

import styles from './EmptyCard.module.scss';

const EmptyCard = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [programSearchQuery, setProgramSearchQuery] = useState("")

    const handleShowPopup = (option: boolean) => {
        setShowPopup(option);
    }

    const handleSearch = () => {
        setProgramSearchQuery("")
    }

    return (
        <div className={styles.emptyCardWrapper}>
            <h1 className={styles.headlines}>Want to be the first to hear about refugee schemes and opportunities?</h1>
            <SlideButton buttonText='Subscribe' onClick={() => handleShowPopup(true)}/>
            <div className={styles.search}>
                <input type="text" name="search" id="search" value={programSearchQuery} onChange={(e) => setProgramSearchQuery(e.target.value)} />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>
            {showPopup && <MailChimPopUp onSuccess={() => handleShowPopup(false)} onClose={() => handleShowPopup(false)}/>}
        </div>
    )
}

export default EmptyCard;