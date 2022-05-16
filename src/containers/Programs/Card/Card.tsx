import React, { useEffect, useState } from 'react';

import Information from './Information/Information';
import Rating from '../../../components/Rating/Rating';
import Tabs from './Tabs/Tabs';
import Tip from '../../../components/Tip/Tip';

import styles from './Card.module.scss';
import Reviews from './Reviews';
import { ProgramInterface, ReviewsStateInterface } from '../Reducer';
import Button from '../../../components/Button/Button';
import { getProgramReviews } from '../Actions';
import { connect } from 'react-redux';
import { RootReducerInterface } from '../../../reducers';

type CardsProps = Partial<ProgramInterface> & Partial<ReviewsStateInterface> & { 
    getProgramReviewsAction(programId: string, reviewsId: string[]): void;
};

const Card = ({
    id: programId,
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
    reviews,
    getProgramReviewsAction,
    data: reviewsData,
    isLoadingReviews,
}: CardsProps)  => {
    const availableTabs = ['Reviews', 'Information'];
    const [activeTabIndex, setActiveTabIndex] = useState(1);
    const emptyReviews = !Boolean(reviews?.length);
    
    useEffect(() => {
        !emptyReviews && getProgramReviewsAction(programId!, reviews!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const extractReviewsForThisProgram = (mapLikeData: ReviewsStateInterface['data']) => {
        const dataMap = new Map(mapLikeData);
        return dataMap.get(programId!) || [];
    }

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
        if (tabTitle === "Reviews") return (
            <Reviews
                reviews={extractReviewsForThisProgram(reviewsData!)}
                isLoading={isLoadingReviews!}
            />
        );
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
                    {programDuration && <Tip color={styles["background-purple-tetradic"]}>{programDuration}</Tip>}
                    {onSite && <Tip color={styles["background-pink-tetradic"]}>{onSite}</Tip>}
                </div>
                <Tabs tabs={availableTabs} activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex}/>
            </div>
            {renderComponentsTab(availableTabs[activeTabIndex])}
            <div className={styles.buttonsWrapper}>
                <a href={website} target="_blank" rel="noreferrer"><Button outfit='hollow'>Find out more</Button></a>
                {!emptyReviews && <Button>Send your review</Button>}
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootReducerInterface) => ({
    data: state.ProgramsReducer.reviews.data,
    isLoadingReviews: state.ProgramsReducer.reviews.isLoadingReviews,
});

export default connect(mapStateToProps, {
    getProgramReviewsAction: getProgramReviews,
})(Card);