import React from 'react';
import styled from 'styled-components';
import ExpandableCard from './ExpandableCard';

const Wrapper = styled.div`
    margin: 2vh 8vw;
`

const FAQWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

const SectionTitle = styled.h2`
    font-size: 2em;
    font-weight: 700;
    margin-top: 2.5vw;
`

const FAQ = () => {
    return (
        <Wrapper>
            <FAQWrapper>
                <SectionTitle><span>About the reviews</span></SectionTitle>
                <ExpandableCard 
                    headerText="Are reviews anonymous?" 
                    response="Yes, all Chatterbox reviews are 100% anonymous. Nobody, including those running the 
                    schemes will be able to see who left a review. The Chatterbox team will only ask for your email 
                    address to get in touch if we have any problems."
                />
                <ExpandableCard 
                    headerText="Are reviews moderated?" 
                    response="All reviews are moderated by the Chatterbox team before being published on the platform. If we’re suspicious that a review is inaccurate, false or left in bad faith, the review will not be published."
                />
                <ExpandableCard 
                    headerText="Do I need to complete a program to leave a review?" 
                    response="Yes. At the moment we’re only accepting reviews from people who’ve completed an employment program. Watch this space this might change in the future!"
                />
                <SectionTitle><span>About the schemes</span></SectionTitle>
                <ExpandableCard 
                    headerText="How can I submit a new opportunity?" 
                    response="Submit the details of another employment scheme here. Our team will use the details you provide to create a new opportunity and get in touch once the scheme is live."
                />
                <ExpandableCard 
                    headerText="What if our scheme gets a bad review?" 
                    response="From time to time you might get a bad review, the Chatterbox team are squirrelling away collecting advice from participants on improvements to the schemes too, so if you’re affiliated with a scheme get in touch and we’ll happily share tips on what you could do better (anonymously of course)."
                />
                <SectionTitle><span>Getting in touch</span></SectionTitle>
                <ExpandableCard 
                    headerText="How can I get in touch?" 
                    response="Email us at talent@chatterbox.io if you need to get in touch with questions, concerns, suggestions or anything else!"
                />
                <ExpandableCard 
                    headerText="Who manages this page?" 
                    response="The Chatterbox team independently manage this page, whilst we’re trying to build relationships with refugee organisations who run employment programs our priority will always be to maintain anonymity of our reviewers."
                />
            </FAQWrapper>
        </Wrapper>
    );
};

export default FAQ;