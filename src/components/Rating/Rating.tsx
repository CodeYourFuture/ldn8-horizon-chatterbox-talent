import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Star } from '../../assets/star-unfilled.svg';

interface RatingProps {
  rating: number;
  numberOfReviews?: number;
  onlyStars?: boolean;
  starSize?: string;
  color?: string;
}

const ReviewsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 0.7em;

  span {
    font-size: 0.8em;
  }
`;

const StarsWrapper = styled.div<Pick<RatingProps, 'rating' | 'starSize' | 'color'>>`
  position: relative;
  white-space: nowrap;

  svg {
    fill: ${props => (props.color ? props.color : 'gold')};
    width: ${props => (props.starSize ? props.starSize : '24px')};
    height: ${props => (props.starSize ? props.starSize : '24px')};
  }

  &::after {
    content: '';
    position: absolute;
    overflow: hidden;
    background: white;
    mix-blend-mode: color;
    top: 0;
    right: 0;
    height: 100%;
    width: ${props => `${(1 - props.rating / 5) * 100}%`};
  }
`;

const Rating = ({ rating, numberOfReviews, starSize, color, onlyStars = false }: RatingProps) => {
  return (
    <ReviewsWrapper>
      <StarsWrapper rating={rating} starSize={starSize} color={color}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </StarsWrapper>
      {!onlyStars && (
        <span>
          {rating} ({numberOfReviews} reviews)
        </span>
      )}
    </ReviewsWrapper>
  );
};

export default Rating;
