import React from 'react';
import styled from 'styled-components';

import Stephanie from '../../assets/stephanie.jpg';

const Wrapper = styled.div`
    margin: 2vh 8vw;
`

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8vw;

    img {
        width: 25vw;
    }
`

const TextContainer = styled.div`
    p {
        font-size: 1.5em;
        line-height: 1.4em;
        margin-bottom: 2em;

        a {
            color: #2eb48e;
            text-decoration: underline;

            &:hover {
                color: #6AE7BE;
            }
        }
    }
`

const About = () => {
    return (
        <Wrapper>
            <ContentWrapper>
                <TextContainer>
                    <p>Chatterbox Talent aims to increase the visibility of the different employment programs out there for marginalised talent (initially focusing on those for refugees). By creating one place to access information on different schemes we hope to raise awareness and bridge the gaps between incredible talent and fantastic employers. We’re always on the look out for adding more schemes to our database - check out our FAQ’s to learn how.</p>
                    <p>We’re pairing a database of opportunities with an anonymous review system to help individuals hear real stories and gather real feedback to champion brilliant schemes and bring about real change in the sector. </p>
                    <p>P.S. if you’re an employer wondering how you can get involved - sign up to our <a href="https://www.chatterbox.io/talent">employer mailing list</a> & watch this space.</p>
                </TextContainer>
                <img src={Stephanie} alt="Stephanie"/>
            </ContentWrapper>
        </Wrapper>
    );
};

export default About;