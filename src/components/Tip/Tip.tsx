import React from 'react';
import styled from 'styled-components';

const TipWrapper = styled.div`
    padding: 0.4em 1em;
    font-size: 0.7em;
    background-color: ${props => props.color};
    border-radius: 1em;
`

interface TipProps {
    children: any;
    color: string;
};

const Tip = ({ children, color }: TipProps) => {
    return (
        <TipWrapper color={color}>
            <span>{children}</span>
        </TipWrapper>
    );
};

export default Tip;