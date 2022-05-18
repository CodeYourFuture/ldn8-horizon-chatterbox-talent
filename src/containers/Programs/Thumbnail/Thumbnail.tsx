import React from 'react';
import styled from 'styled-components';

import Rating from '../../../components/Rating/Rating';

const Title = styled.h3`
    font-size: 1.2em;
    font-weight: 700;
    text-align: left;
`

const TextContent = styled.p`
    font-size: 0.95em;
    font-weight: 400;
    line-height: 1.4em;
    text-align: left;
`

const StrongTextContent = styled(TextContent)`
    font-weight: 700;
`

const TextBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 0.7em;
`

const Wrapper = styled.button<{isSelected: boolean}>`
    width: 100%;
    background-color: ${props => props.isSelected ? 'rgba(106, 231, 190, 0.2)' : 'transparent'};
    outline: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    gap: 1vw;
    padding: 1.5vw;
    margin-bottom: 3vw;
    &:after {
        content: '';
        position: absolute;
        bottom: -1.5vw;
        width: 90%;
        height: 1px;
        background-color: #2eb48e;
    }

    &:hover {
        cursor: pointer;

        ${Title} {
            color: #6AE7BE;
            text-decoration: underline;
        }
    }

    @media screen and (max-width: 768px) {
        background-color: transparent;
    }
`

interface ThumbnailProps {
    careerTypes: string[];
    index: number;
    isSelected: boolean;
    locations: string[];
    onThumbnailSelection(index: number):void;
    title: string;
    rating: number;
    numberOfReviews: number;
}

const Thumbnail = ({ index, isSelected, careerTypes, locations, title, onThumbnailSelection, numberOfReviews, rating }: ThumbnailProps) => {
    return (
        <Wrapper onClick={() => onThumbnailSelection(index)} isSelected={isSelected}>
            <Title>{title}</Title>
            {Boolean(rating) && <Rating rating={rating} numberOfReviews={numberOfReviews}/>}
            {locations && (
                <TextBlock>
                    <b><StrongTextContent>Locations: </StrongTextContent></b>
                    <TextContent>{locations.join(', ')}</TextContent>
                </TextBlock>
            )}
            {careerTypes && (
                <TextBlock>
                    <b><StrongTextContent>Careers: </StrongTextContent></b>
                    <TextContent>{careerTypes.join(', ')}</TextContent>
                </TextBlock>
            )}
        </Wrapper>
    )
};

export default Thumbnail;