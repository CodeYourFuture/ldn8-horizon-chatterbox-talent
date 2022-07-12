import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../../../components/Button/Button';
import ClipLoader from 'react-spinners/ClipLoader';

import Rating from '../../../../components/Rating/Rating';
import { selectProgramReviews, selectProgramScore } from '../../Reducer';

import styles from '../../../../common/styles/colors.module.scss';

interface ReviewsProps {
  programId: string;
  isLoading: boolean;
}

const ReviewsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2em;

  p {
    line-height: 1.3em;

    @media screen and (max-width: 768px) {
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const EmptyReviewsWrapper = styled.div`
  width: 100%;
  padding: 5em 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;

  p {
    line-height: 1.3em;
    text-align: center;
    span {
      font-weight: 700;
    }
  }
`;

const OverallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  h2 {
    font-size: 1.2em;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;

const CommentsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: stretch;
  gap: 2vw;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 2vw;
  }
`;

const KeyRatingsWrapper = styled.div`
  background-color: rgba(66, 92, 82, 0.2);
  padding: 1.5em;
  width: 45%;

  h3 {
    font-weight: 700;
    margin-bottom: 2em;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const IdealForWrapper = styled.div`
  background-color: rgba(91, 91, 91, 0.2);
  padding: 1.5em;
  width: 60%;

  h3 {
    font-weight: 700;
    margin-bottom: 2em;
  }

  p {
    line-height: 1.3em;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const PropertyRatingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin-bottom: 1em;

  span {
    font-size: 0.8em;
  }
`;

const Reviews = ({ programId, isLoading }: ReviewsProps) => {
  const programScore = useSelector(selectProgramScore(programId));
  const programReviews = useSelector(selectProgramReviews(programId));

  if (isLoading) {
    return (
      <EmptyReviewsWrapper>
        <ClipLoader color={styles['green-main']} loading={isLoading} size="60px" />
      </EmptyReviewsWrapper>
    );
  }

  if (!programReviews.length) {
    return (
      <EmptyReviewsWrapper>
        <a href={`${process.env.REACT_APP_AIRTABLE_REVIEW_FORM_URL}`} target="_blank" rel="noreferrer">
          <Button>Review this program</Button>
        </a>
        <p>
          <span>Anonymous reviews</span> can be completed by anyone who has completed this program.
          <br />
          They're anonymous to support honesty and are incredibly valuable to other refugees considering this program.
        </p>
      </EmptyReviewsWrapper>
    );
  }

  return (
    <ReviewsWrapper>
      <OverallWrapper>
        <h2>Overall</h2>
        <Rating rating={programScore?.overall || 0} onlyStars />
      </OverallWrapper>
      <p>{programReviews[0]?.experienceSummary}</p>
      <CommentsWrapper>
        <KeyRatingsWrapper>
          <h3>Key ratings</h3>
          <PropertyRatingWrapper>
            <Rating rating={0} starSize="18px" color="gold" onlyStars />
            <span>Course content</span>
          </PropertyRatingWrapper>
          <PropertyRatingWrapper>
            <Rating rating={programScore.application} starSize="18px" color="gold" onlyStars />
            <span>Application Process</span>
          </PropertyRatingWrapper>
          <PropertyRatingWrapper>
            <Rating rating={programScore.languageSupport} starSize="18px" color="gold" onlyStars />
            <span>Language support</span>
          </PropertyRatingWrapper>
          <PropertyRatingWrapper>
            <Rating rating={programScore.futureProspect} starSize="18px" color="gold" onlyStars />
            <span>Future prospects</span>
          </PropertyRatingWrapper>
          <PropertyRatingWrapper>
            <Rating rating={programScore.professionalDevelopment} starSize="18px" color="gold" onlyStars />
            <span>Professional Development</span>
          </PropertyRatingWrapper>
        </KeyRatingsWrapper>
        <IdealForWrapper>
          <h3>Ideal for...</h3>
          <p>{''}</p>
        </IdealForWrapper>
      </CommentsWrapper>
    </ReviewsWrapper>
  );
};

export default Reviews;
