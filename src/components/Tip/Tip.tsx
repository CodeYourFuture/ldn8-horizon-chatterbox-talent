import React from 'react';
import styled from 'styled-components';

const TipWrapper = styled.div`
    padding: 0.4em 1em;
    font-size: 0.8em;
    letter-spacing: 0.5px;
    background-color: ${props => props.color};
    border-radius: 1em;
`

const TextContent = styled.span`
    white-space: nowrap;
`

interface TipProps {
    children: any;
    color: string;
};

const Tip = ({ children, color }: TipProps) => {
    return (
        <TipWrapper color={color}>
            <TextContent>{children}</TextContent>
        </TipWrapper>
    );
};

export default Tip;