import React, { useState } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 1.2em;
        font-weight: 700;
    }
`

const Caret = styled.div<{isExpanded: boolean}>`
    width: 10px;
    height: 10px;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
    transform: ${props => props.isExpanded? 'rotate(-135deg)' : 'rotate(45deg)'};
    transition: transform 0.2s ease-in-out;
`

const ExpandedContent = styled.div`
    margin-top: 2vw;
    
    p {
        font-size: 1.1em;
        line-height: 1.4em;
    }
`

const CardWrapper = styled.div`
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: #fff;
    padding: 1em 1.4em;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
    }
`


interface ExpandableCardProps {
    headerText: string;
    response: React.ReactNode;
}

const ExpandableCard = ({ headerText, response }: ExpandableCardProps) => {
    const [isCardExpanded, setIsCardExpanded] = useState(false);

    return (
        <CardWrapper onClick={() => setIsCardExpanded(prevState => !prevState)}>
            <Content>
                <h2>{headerText}</h2>
                <Caret isExpanded={isCardExpanded}/>
            </Content>
            {isCardExpanded && (
                <ExpandedContent>
                    <p>{response}</p>
                </ExpandedContent>
            )}
        </CardWrapper>

    );
};

export default ExpandableCard;