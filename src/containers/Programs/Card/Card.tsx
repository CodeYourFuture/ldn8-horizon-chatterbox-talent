import React, { useState } from 'react';

import Information from './Information/Information';
import Rating from '../../../components/Rating/Rating';
import Tabs from './Tabs/Tabs';
import Tip from '../../../components/Tip/Tip';

import styles from './Card.module.scss';
import Reviews from './Reviews';
import { ProgramInterface } from '../Reducer';

const Card = ({
    logo,
    programName,
    programDuration,
    onSite,
    description,
    locations,
    website,
    keyFacts,
    stepsToApply,
    careerType,
}: Partial<ProgramInterface>) => {
    const availableTabs = ['Reviews', 'Information'];
    const [activeTabIndex, setActiveTabIndex] = useState(1);

    const renderComponentsTab = (tabTitle: string): (JSX.Element | null | undefined) => {
        if (tabTitle === "Information") return (
            <Information 
                description={description}
                locations={locations}
                keyFacts={keyFacts}
                stepsToApply={stepsToApply}
                careerType={careerType}
            />
        );
        if (tabTitle === "Reviews") return <Reviews />;
    }

    const getProgramLogo = () => {
        if (!logo || !logo.length || !logo[0].thumbnails) return '';
        return logo[0].thumbnails.large.url;
    };

    if (!programName) return null;

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.imageWrapper}><img src={getProgramLogo()} alt={`${programName}`} /></div>
            <div className={styles.schemaOverview}>
                <h2>{programName}</h2>
                <Rating rating={5} numberOfReviews={1230}/>
                <div className={styles.tipsWrapper}>
                    {programDuration && <Tip color="#A791E2">{programDuration}</Tip>}
                    {onSite && <Tip color="#91e2a7">{onSite}</Tip>}
                </div>
                <Tabs tabs={availableTabs} activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex}/>
            </div>
            {renderComponentsTab(availableTabs[activeTabIndex])}
            <div className={styles.buttonsWrapper}>
                <a href={website} target="_blank" rel="noreferrer"><button className={styles.hollowButton}>Find out more</button></a>
                <button className={styles.filledButton}>Send your review</button>
            </div>
        </div>
    )
}

export default Card;