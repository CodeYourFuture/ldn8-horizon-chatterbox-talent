import React from 'react';
import styled from 'styled-components';

import Rating from '../../../../components/Rating/Rating';

import styles from './Reviews.module.scss';

interface ReviewsProps {
    mainReview: string;
    recommendation: string;
}

const CommentsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const KeyRatingsWrapper = styled.div`
    background-color: rgba(66, 92, 82, 0.2);
    padding: 1.5em;
    width: 40%;

    h3 {
        font-weight: 700;
        margin-bottom: 2em;
    }
`

const IdealForWrapper = styled.div`
    background-color: rgba(91, 91, 91, 0.2);
    padding: 1.5em;
    width: 55%;

    h3 {
        font-weight: 700;
        margin-bottom: 2em;
    }

    p {
        line-height: 1.3em;
    }
`

const PropertyRatingWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    margin-bottom: 1em;

    span {
        font-size: 0.8em;
    }
`

const Reviews = ({ mainReview, recommendation }: ReviewsProps) => {
    return (
        <div className={styles.reviewsWrapper}>
            <Rating rating={5} onlyStars/>
            <p>{mainReview}</p>
            <CommentsWrapper>
                <KeyRatingsWrapper>
                    <h3>Key ratings</h3>
                    <PropertyRatingWrapper><Rating rating={5} starSize="18px" color='black' onlyStars/><span>Course content</span></PropertyRatingWrapper>
                    <PropertyRatingWrapper><Rating rating={5} starSize="18px" color='black' onlyStars/><span>Language support</span></PropertyRatingWrapper>
                    <PropertyRatingWrapper><Rating rating={5} starSize="18px" color='black' onlyStars/><span>Future prospects</span></PropertyRatingWrapper>
                </KeyRatingsWrapper>
                <IdealForWrapper>
                    <h3>Ideal for...</h3>
                    <p>{recommendation}</p>
                </IdealForWrapper>
            </CommentsWrapper>
        </div>
    );
};

export default Reviews;