import React from 'react';
import styled from 'styled-components';
import Tip from '../../../../components/Tip/Tip';

import IconBook from '../../../../assets/icon-book.svg';
import IconCoding from '../../../../assets/icon-coding.svg';
import IconPerson from '../../../../assets/icon-person.svg';

const InformationWrapper = styled.div`
    padding: 1em 2em;
    display: flex;
    flex-direction: column;

    div {
        h2 {
            font-weight: 700;
        }
    }
`

const LocationsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    margin-bottom: 2em;
`

const AboutTheProgramWrapper = styled.div`
    margin-bottom: 2em;
    h2 {
        margin-bottom: 0.8em;
    }

    p {
        line-height: 1.2em;
    }
`

const WhatIsIncludedWrapper = styled.div`
    margin-bottom: 2em;    
    h2 {
        margin-bottom: 1em;
    }

    & > div {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    background-color: rgba(196, 196, 196, 0.4);
    padding: 1em;
    border-radius: 10px;
    max-width: 120px;

    span {
        font-size: 0.8em;
        max-width: 80%;
        text-align: center;
    }
`

interface InformationProps {
    description?: string;
    locations?: string[];
}

const Information = ({ description, locations }: InformationProps) => {
    return (
        <InformationWrapper>
            <LocationsWrapper>
                <h2>Locations:</h2>
                {locations && locations.map(location => <Tip color="gold">{location}</Tip>)}
            </LocationsWrapper>
            <AboutTheProgramWrapper>
                <h2>About the program</h2>
                <p>{description || ''}</p>
            </AboutTheProgramWrapper>
            <WhatIsIncludedWrapper>
                <h2>What's included</h2>
                <div>
                    <Info>
                        <img src={IconPerson} alt="Random person icon"/>
                        <span>In person lessons</span>
                    </Info>
                    <Info>
                        <img src={IconCoding} alt="Coding icon"/>
                        <span>Tech opportunity</span>
                    </Info>
                    <Info>
                        <img src={IconBook} alt="Book icon"/>
                        <span>Online content</span>
                    </Info>
                </div>
            </WhatIsIncludedWrapper>
        </InformationWrapper>
    );
};

export default Information;