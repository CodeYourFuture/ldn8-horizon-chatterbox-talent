import React, { useState } from 'react';
import styled from 'styled-components';
import CheckBoxFilter from './CheckBoxFilter';

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 50vw;
  height: 65vh;
  background-color: #fff;
  padding: 1vw 2vw;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 4000;

  @media screen and (max-width: 768px) {
    width: 90vw;
    flex-direction: column;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10vw 5vw;
    gap: 5vw;
  }

  h3 {
    font-weight: 200;
    font-size: 2.2em;
    line-height: 1.2em;
  }
  input {
    padding: 0.5em 0.8em;
    border: 1px solid gray;
  }
  label {
    font-weight: 300;
    letter-spacing: 0.2px;
    font-size: 0.8em;
    line-height: 1.2em;
    padding-left: 0.2em;
  }
  form {
    display: flex;
    gap: 1.5em;
    width: 100%;
  }
  legend {
    font-weight: 400;
    padding: 0.2em 0;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ResetButton = styled.button`
  border: none;
  outline: none;
  background-color: ${props => (props.disabled ? 'lightgray' : '#3EE0AB')};
  color: black;
  font-weight: 700;
  padding: 1em 2.5em;
  border-radius: 5px;

  &:hover {
    opacity: ${props => (props.disabled ? '1' : '0.85')};
    cursor: ${props => (props.disabled ? 'inherit' : 'pointer')};
  }
`;

const DoneButton = styled.button`
  border: none;
  outline: none;
  background-color: ${props => (props.disabled ? 'lightgray' : 'black')};
  color: white;
  font-weight: 700;
  padding: 1em 2.5em;
  border-radius: 5px;

  &:hover {
    opacity: ${props => (props.disabled ? '1' : '0.85')};
    cursor: ${props => (props.disabled ? 'inherit' : 'pointer')};
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  font-weight: 700;
  position: absolute;
  right: 3%;
  top: 3%;
  padding: 0.4em 0.6em;

  &:hover {
    background-color: #000;
    color: #fff;
    border-radius: 50%;
  }
`;

const FiltersPopUp = ({ onSuccess, onClose, information }) => {
  const handleSubmitFilters = () => {
    alert('bnt working');
  };

  const handleUserClose = evt => {
    evt.stopPropagation();
    onClose();
  };
  const storeFilters = data => {
    const setsOfFilters = data.reduce((acc, v, i) => {
      if (i === 0) {
        acc['Locations'] = new Set();
        acc['CareerType'] = new Set();
        acc['ProgramDuration'] = new Set();
        acc['OnSite'] = new Set();
        acc['IsActivelyHiring'] = new Set(['Actively hiring', 'Show all']);
      }

      v.locations.forEach(location => {
        acc['Locations'].add(location);
      });
      v.careerType.forEach(careerType => {
        acc['CareerType'].add(careerType);
      });
      if (v.programDuration) acc['ProgramDuration'].add(v.programDuration);
      acc['OnSite'].add(v.onSite);

      return acc;
    }, {});
    
    return Object.keys(setsOfFilters).reduce((acc, val) => {
      acc[val] = Array.from(setsOfFilters[val]);
      return acc;
    }, {});
  };

  const filtersStore = storeFilters(information);
  const [resetState, setResetState] = useState(true);
  //State to store the filters
  const [filters, setFilters] = useState({});

  return (
    <BackgroundWrapper>
      <Wrapper>
        <ContentWrapper>
          <h3>Filter programs:</h3>
          <form>
            {Object.keys(filtersStore).map((v, i) => {
              return (
                <CheckBoxFilter
                  filterState={[filters, setFilters]}
                  key={i}
                  criteria={filtersStore[v]}
                  name={v}
                  resetState={resetState}
                  setResetState={setResetState}
                />
              );
            })}
          </form>
          <ButtonsWrapper>
            <ResetButton
              onClick={() => {
                setResetState(false);
              }}
            >
              Reset
            </ResetButton>
            <DoneButton onClick={handleSubmitFilters}>Done</DoneButton>
          </ButtonsWrapper>
        </ContentWrapper>
        <CloseButton onClick={handleUserClose}>X</CloseButton>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default FiltersPopUp;
