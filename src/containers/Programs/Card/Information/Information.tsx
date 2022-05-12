import React from 'react';
import styled from 'styled-components';
import Tip from '../../../../components/Tip/Tip';

import { ProgramInterface } from '../../Reducer';

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
    margin-bottom: 2.2em;
`

const RegularWrapper = styled.div`
    margin-bottom: 2.2em;
    h2 {
        margin-bottom: 0.8em;
    }

    p {
        line-height: 1.4em;
    }
`

// const WhatIsIncludedWrapper = styled.div`
//     margin-bottom: 2.2em;    
//     h2 {
//         margin-bottom: 1em;
//     }

//     & > div {
//         display: flex;
//         flex-direction: row;
//         gap: 1em;
//     }
// `

// const Info = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5em;
//     background-color: rgba(196, 196, 196, 0.4);
//     padding: 1em;
//     border-radius: 10px;
//     max-width: 120px;

//     span {
//         font-size: 0.8em;
//         max-width: 80%;
//         text-align: center;
//     }
// `

const CleanList = styled.ul`
    list-decoration: none;

    li {
        line-height: 1.4em;
        margin-bottom: 0.2em;
    }
`

const ListSubItem = styled.li`
    padding-left: 2em;
`

const Information = ({ 
    description, 
    locations,
    keyFacts,
    stepsToApply,
    careerType,
}: Partial<ProgramInterface>) => {

    const parseArrayWithIndexIntoList = (arr: string[] | undefined) => {
        if (!arr) return;
        let currentIndex = 1;

        return arr.map(item => {
            const listIndex = Number(item.slice(0, 2));
            if (listIndex === currentIndex) {
                currentIndex++;
                return <li>{item}</li>;
            }

            return <ListSubItem>{item}</ListSubItem>
        })
    };

    // const getCareerTipColor = (career: keyof typeof CareersEnum) => {
    //     const color = CareersEnum[career];
    //     if (!color) return "#eacef2";
    //     return color;
    // }

    return (
        <InformationWrapper>
            <LocationsWrapper>
                <h2>Locations:</h2>
                {locations && locations.map((location, index) => <Tip key={index} color="gold">{location}</Tip>)}
            </LocationsWrapper>
            <RegularWrapper>
                <h2>About the program</h2>
                <p>{description || ''}</p>
            </RegularWrapper>
            <LocationsWrapper>
                <h2>Career types:</h2>
                {careerType && careerType.map((career, index) => <Tip key={index} color="#74c4ff">{career}</Tip>)}
            </LocationsWrapper>    
            <RegularWrapper>
                <h2>Key facts</h2>
                <CleanList>
                    {keyFacts?.map(keyFact => <li>{keyFact}</li> )}
                </CleanList>
            </RegularWrapper>           
            <RegularWrapper>
                <h2>Steps to apply</h2>
                <CleanList>
                    {parseArrayWithIndexIntoList(stepsToApply)}
                </CleanList>
            </RegularWrapper>
            {/* <WhatIsIncludedWrapper>
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
            </WhatIsIncludedWrapper> */}
        </InformationWrapper>
    );
};

export default Information;