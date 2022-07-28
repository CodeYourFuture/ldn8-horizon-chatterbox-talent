import React, { useState } from 'react';

import Information from './Information/Information';
import Rating from '../../../components/Rating/Rating';
import Tabs from './Tabs/Tabs';
import Tip from '../../../components/Tip/Tip';

import styles from './Card.module.scss';
import Reviews from './Reviews';
import { ProgramInterface, ReviewsStateInterface, selectProgramReviews, selectProgramScore } from '../Reducer';
import Button from '../../../components/Button/Button';
import { connect, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../../reducers';

type CardsProps = Partial<ProgramInterface> & Partial<ReviewsStateInterface>;

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
  isLoadingReviews,
}: CardsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(1);

  const availableTabs = ['Reviews', 'Information'];
  const programReviews = useSelector(selectProgramReviews(programId!));
  const emptyReviews = !Boolean(programReviews?.length);
  const programScore = useSelector(selectProgramScore(programId!));

  const renderComponentsTab = (tabTitle: string): JSX.Element | null | undefined => {
    if (tabTitle === 'Information')
      return (
        <Information
          description={description}
          locations={locations}
          keyFacts={keyFacts}
          stepsToApply={stepsToApply}
          careerType={careerType}
        />
      );
    if (tabTitle === 'Reviews') return <Reviews programId={programId!} isLoading={isLoadingReviews!} />;
  };

  const getProgramLogo = () => {
    if (!logo || !logo.length || !logo[0].thumbnails) return '';
    return logo[0].thumbnails.large.url;
  };

  const getButtons = () => {
    if (availableTabs[activeTabIndex] === 'Information') {
      return (
        <div className={styles.buttonsWrapper}>
          <a href={`${process.env.REACT_APP_AIRTABLE_REVIEW_FORM_URL}`} target="_blank" rel="noreferrer">
            <Button outfit="hollow">Review this program</Button>
          </a>
          <a href={website} target="_blank" rel="noreferrer">
            <Button>Find out more</Button>
          </a>
        </div>
      );
    }

    if (emptyReviews) {
      return null;
    }

    return (
      <div className={styles.buttonsWrapper}>
        <a href={`${process.env.REACT_APP_AIRTABLE_REVIEW_FORM_URL}`} target="_blank" rel="noreferrer">
          <Button>Review this program</Button>
        </a>
      </div>
    );
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <img src={getProgramLogo()} alt={`${programName}`} />
      </div>
      <div className={styles.schemaOverview}>
        <h2>{programName}</h2>
        <Rating rating={programScore.overall} numberOfReviews={programReviews.length} />
        <div className={styles.tipsWrapper}>
          {programDuration && <Tip color={styles['background-purple-tetradic']}>{programDuration}</Tip>}
          {onSite && <Tip color={styles['background-pink-tetradic']}>{onSite}</Tip>}
        </div>
        <Tabs tabs={availableTabs} activeTabIndex={activeTabIndex} onTabChange={setActiveTabIndex} />
      </div>
      {renderComponentsTab(availableTabs[activeTabIndex])}
      {getButtons()}
    </div>
  );
};

const mapStateToProps = (state: RootReducerInterface) => ({
  isLoadingReviews: state.ProgramsReducer.reviews.isLoadingReviews,
});

export default connect(mapStateToProps)(Card);
