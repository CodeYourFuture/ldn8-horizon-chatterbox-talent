import React, { useState } from 'react';
import styled from 'styled-components';
import { MultiSelectDropDown, CheckBoxFilter } from './CheckBoxFilter';
import filtersHandle from './Filters/filtersHandle';

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
    width: 100vw;
    flex-direction: column;
    height: 100vh;
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
    justify-content: space-between;
    padding: 0 10px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      padding: 10px 0;
    }
  }
  legend {
    font-weight: 400;
    padding: 0.2em 0;
  }
`;
const MultiSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
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

const FiltersPopUp = ({ onSuccess, onClose, information, statusToRender }) => {
  const [, setStateToRender] = statusToRender;
  //State for Reset button
  const [resetState, setResetState] = useState(true);
  //State to store the filters
  const [filters, setFilters] = useState({});

  const handleSubmitFilters = evt => {
    //alert('bnt working');
    //console.log(locations, careerTypes)
    filtersHandle(information, filters);
    //Filter to render
    setStateToRender(filtersHandle(information, filters));
    handleUserClose(evt);
  };

  const handleUserClose = evt => {
    evt.stopPropagation();
    onClose();
  };
  const handleReset = () => {
    setResetState(false);
    setStateToRender(information);
  };
  const storeFilters = data => {
    const setsOfFilters = data.reduce((acc, v, i) => {
      if (i === 0) {
        acc['locations'] = new Set();
        acc['careerType'] = new Set();
        acc['programDuration'] = new Set();
        acc['onSite'] = new Set();
        acc['isActivelyHiring'] = new Set(['Actively hiring']);
      }

      v.locations.forEach(location => {
        acc['locations'].add(location);
      });
      v.careerType.forEach(careerType => {
        acc['careerType'].add(careerType);
      });
      if (v.programDuration) acc['programDuration'].add(v.programDuration);
      acc['onSite'].add(v.onSite);
      return acc;
    }, {});

    return Object.keys(setsOfFilters).reduce((acc, val) => {
      acc[val] = Array.from(setsOfFilters[val]);
      return acc;
    }, {});
  };
  const filtersStore = storeFilters(information);

  return (
    <BackgroundWrapper>
      <Wrapper>
        <ContentWrapper>
          <h3>Filter programs:</h3>
          <form>
              <MultiSelectWrapper>
                <MultiSelectDropDown
                  filterState={[filters, setFilters]}
                  criteria={filtersStore.locations}
                  name={'Locations'}
                  objKey={'locations'}
                  resetState={resetState}
                  setResetState={setResetState}
                />
                <MultiSelectDropDown
                  filterState={[filters, setFilters]}
                  criteria={filtersStore.careerType}
                  name={'Career Type'}
                  objKey={'careerType'}
                  resetState={resetState}
                  setResetState={setResetState}
                />
              </MultiSelectWrapper>
              <FilterWrapper>
                <CheckBoxFilter
                  filterState={[filters, setFilters]}
                  criteria={filtersStore.programDuration}
                  name={'Program Duration'}
                  objKey={'programDuration'}
                  resetState={resetState}
                  setResetState={setResetState}
                />
                <CheckBoxFilter
                  filterState={[filters, setFilters]}
                  criteria={filtersStore.onSite}
                  name={'OnSite/Remote'}
                  objKey={'onSite'}
                  resetState={resetState}
                  setResetState={setResetState}
                />
                <CheckBoxFilter
                  filterState={[filters, setFilters]}
                  criteria={filtersStore.isActivelyHiring}
                  name={'Show only'}
                  objKey={'isActivelyHiring'}
                  resetState={resetState}
                  setResetState={setResetState}
                />
              </FilterWrapper>
          </form>
          <ButtonsWrapper>
            <ResetButton onClick={handleReset}>Reset</ResetButton>
            <DoneButton onClick={handleSubmitFilters}>Done</DoneButton>
          </ButtonsWrapper>
        </ContentWrapper>
        <CloseButton onClick={handleUserClose}>X</CloseButton>
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default FiltersPopUp;
