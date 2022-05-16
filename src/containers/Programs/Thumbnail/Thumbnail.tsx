import React from 'react';
import styled from 'styled-components';

import Rating from '../../../components/Rating/Rating';

const Title = styled.h3`
    font-size: 1.2em;
    font-weight: 700;
`

const TextContent = styled.p`
    font-size: 0.95em;
    font-weight: 400;
    line-height: 1.4em;
`

const StrongTextContent = styled(TextContent)`
    font-weight: 700;
`

const TextBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 0.7em;
`

const Wrapper = styled.button`
    width: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    position: relative;
    gap: 1vw;
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
`

interface ThumbnailProps {
    careerTypes: string[];
    index: number;
    locations: string[];
    onThumbnailSelection(index: number):void;
    title: string;
}

const Thumbnail = ({ index, careerTypes, locations, title, onThumbnailSelection }: ThumbnailProps) => {
    return (
        <Wrapper onClick={() => onThumbnailSelection(index)}>
            <Title>{title}</Title>
            <Rating rating={5} numberOfReviews={1230}/>
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