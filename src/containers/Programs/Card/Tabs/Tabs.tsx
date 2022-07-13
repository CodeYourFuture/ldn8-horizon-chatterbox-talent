import React from 'react';
import styled from 'styled-components';

const TabsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  gap: 3em;
  padding-bottom: 0.5em;
`;

interface ButtonProps {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  position: relative;
  border: none;
  outline: none;
  background-color: transparent;

  &:after {
    content: ' ';
    display: ${props => (props.active ? 'inline-block' : 'none')};
    border-top: 10px solid transparent;
    border-right: 10px solid #333;
    position: absolute;
    right: 40%;
    bottom: -65%;
    transform: rotate(45deg);
  }
`;

interface TabsInterface {
  tabs: string[];
  activeTabIndex: number;
  onTabChange(tabIndex: number): any;
}

const Tabs = ({ tabs, activeTabIndex, onTabChange }: TabsInterface) => {
  const handleTabSelection = (index: number) => {
    onTabChange(index);
  };

  return (
    <TabsWrapper>
      {tabs.map((tab, index) => (
        <Button key={index} onClick={handleTabSelection.bind(this, index)} active={index === activeTabIndex}>
          {tab}
        </Button>
      ))}
    </TabsWrapper>
  );
};

export default Tabs;
