import React, { useState } from 'react';

import Information from './Information/Information';
import Rating from '../../../components/Rating/Rating';
import Tabs from './Tabs/Tabs';
import Tip from '../../../components/Tip/Tip';

import ChatterboxLogo from '../../../assets/chatterbox-logo-dark.png';
import styles from './Card.module.scss';
import Reviews from './Reviews';
import { ProgramInterface } from '../Reducer';

const Card = ({
    logo,
    programName,
    programDuration,
    description,
    locations,
    website
}: Partial<ProgramInterface>) => {
    const [availableTabs, setAvailableTabs] = useState(['Reviews', 'Information']);
    const [activeTabIndex, setActiveTabIndex] = useState(1);

    const renderComponentsTab = (tabTitle: string): (JSX.Element | null | undefined) => {
        if (tabTitle === "Information") return <Information description={description} locations={locations}/>;
        if (tabTitle === "Reviews") return <Reviews mainReview={mainReview} recommendation={recommendation} />;
    }

    const getProgramLogo = () => {
        if (!logo || !logo.length || !logo[0].thumbnails) return '';
        return logo[0].thumbnails.large.url;
    }

    const recommendation = "I’d recommend this course if you’ve already got strong English skills. You don’t need to know how to code though";
    const mainReview = "Overall the course taught me a lot of useful coding knowledge - I feel confident in my Javascript skills now.";

    if (!programName) return null;

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}><img src={getProgramLogo()} alt={`${programName}`} /></div>
            <div className={styles.schemaOverview}>
                <h2>{programName}</h2>
                <Rating rating={5} numberOfReviews={1230}/>
                <div className={styles.tipsWrapper}>
                    {programDuration && <Tip color="#A791E2">{programDuration}</Tip>}
                </div>
                <Tabs tabs={availableTabs} activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex}/>
            </div>
            {renderComponentsTab(availableTabs[activeTabIndex])}
            <div className={styles.buttonsWrapper}>
                <a href={website} target="_blank"><button className={styles.hollowButton}>Find out more</button></a>
                <button className={styles.filledButton}>Send your review</button>
            </div>
        </div>
    )
}

export default Card;