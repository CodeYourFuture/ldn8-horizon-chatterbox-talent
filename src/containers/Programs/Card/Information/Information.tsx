import React from 'react';
import styled from 'styled-components';
import Tip from '../../../../components/Tip/Tip';

import { ProgramInterface } from '../../Reducer';
import styles from '../../../../common/styles/colors.module.scss';

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

const TipsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 2em;
`

const RegularWrapper = styled.div`
    margin-bottom: 2em;
    h2 {
        margin-bottom: 0.8em;
    }

    p {
        line-height: 1.3em;
    }
`

const CleanList = styled.ul`
    list-decoration: none;

    li {
        line-height: 1.3em;
        margin-bottom: 0.4em;
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

        return arr.map((item, index) => {
            const listIndex = Number(item.slice(0, 2));
            if (listIndex === currentIndex) {
                currentIndex++;
                return <li key={index}>{item}</li>;
            }

            return <ListSubItem key={index}>{item}</ListSubItem>
        })
    };

    return (
        <InformationWrapper>
            <TipsWrapper>
                <h2>Career types:</h2>
                {careerType && careerType.map((career, index) => <Tip key={index} color={styles["background-blue-analogous"]}>{career}</Tip>)}
            </TipsWrapper>   
            <TipsWrapper>
                <h2>Locations:</h2>
                {locations && locations.map((location, index) => <Tip key={index} color={styles["background-beige-triadic"]}>{location}</Tip>)}
            </TipsWrapper>
            <RegularWrapper>
                <h2>About the program</h2>
                <p>{description || ''}</p>
            </RegularWrapper>

            <RegularWrapper>
                <h2>Key facts</h2>
                <CleanList>
                    {keyFacts?.map((keyFact, index) => <li key={index}>{keyFact}</li> )}
                </CleanList>
            </RegularWrapper>           
            <RegularWrapper>
                <h2>Steps to apply</h2>
                <CleanList>
                    {parseArrayWithIndexIntoList(stepsToApply)}
                </CleanList>
            </RegularWrapper>
        </InformationWrapper>
    );
};

export default Information;