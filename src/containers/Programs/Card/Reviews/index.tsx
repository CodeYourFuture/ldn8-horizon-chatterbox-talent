import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Rating from '../../../../components/Rating/Rating';
import { getProgramReviews } from '../../Actions';

interface ReviewsProps {
    mainReview?: string;
    recommendation?: string;
    getProgramReviewsAction(programId: string): void;
}

const ReviewsWrapper = styled.div`
    width: 100%;
    padding: 1em 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2em;

    p {
        line-height: 1.3em;
    }
`

const CommentsWrapper = styled.div`
    width: 100%;
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

const Reviews = ({ mainReview, recommendation, getProgramReviewsAction }: ReviewsProps) => {

    useEffect(() => {
        // getProgramReviewsAction()
    }, [])
    return (
        <ReviewsWrapper>
            <Rating rating={5} onlyStars/>
            <p>{''}</p>
            <CommentsWrapper>
                <KeyRatingsWrapper>
                    <h3>Key ratings</h3>
                    <PropertyRatingWrapper><Rating rating={5} starSize="18px" color='black' onlyStars/><span>Course content</span></PropertyRatingWrapper>
                    <PropertyRatingWrapper><Rating rating={5} starSize="18px" color='black' onlyStars/><span>Language support</span></PropertyRatingWrapper>
                    <PropertyRatingWrapper><Rating rating={5} starSize="18px" color='black' onlyStars/><span>Future prospects</span></PropertyRatingWrapper>
                </KeyRatingsWrapper>
                <IdealForWrapper>
                    <h3>Ideal for...</h3>
                    <p>{ ''}</p>
                </IdealForWrapper>
            </CommentsWrapper>
        </ReviewsWrapper>
    );
};

// const mapStateToProps = state => ({

// });

export default connect(null, {
    getProgramReviewsAction: getProgramReviews,
})(Reviews);