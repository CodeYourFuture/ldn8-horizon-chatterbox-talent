import React, { useState, useEffect } from 'react';
//import styled from "styled-components";

interface CheckBoxProps {
  name: string;
  option: any;
  index: number;
  handleOnChange: Function;
  checkedState: boolean[];
}

const CheckBox = ({ name, option, index, handleOnChange, checkedState }: CheckBoxProps) => {
  return (
    <li style={{ listStyle: 'none' }}>
      <input
        type="checkbox"
        id={option}
        name={name}
        value={option}
        checked={checkedState[index]}
        onChange={() => handleOnChange(index)}
      />
      <label htmlFor={option}>{option}</label>
    </li>
  );
};
interface CheckBoxFilterProps {
  criteria: any[];
  name: string;
  resetState: boolean;
  setResetState: any;
  filterState: any[];
}
const CheckBoxFilter = ({ criteria, filterState, name, resetState, setResetState }: CheckBoxFilterProps) => {
  const [filters, setFilters] = filterState;
  const [checkedState, setCheckedState] = useState(new Array(criteria.length).fill(false));

  useEffect(() => {
    if (resetState === false) {
      setFilters({});
      setCheckedState(new Array(criteria.length).fill(false));
    }
    if (checkedState.includes(true)) setResetState(true);
    // eslint-disable-next-line
  }, [resetState, criteria, checkedState]);

  const handleOnChange = (filter: string, value: string, position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    console.log(checkedState);
    console.log(filters);
    setCheckedState(updatedCheckedState);

    if (filters[filter]) {
      setFilters((previousVal: {[key:string]:string[]}) => {
        if (previousVal[filter].includes(value)) {
          return {
            ...previousVal,
            [filter]: previousVal[filter].filter((item: string) => item !== value),
          };
        } else {
          return {
            ...previousVal,
            [filter]: [...previousVal[filter], value],
          };
        }
      });
    } else {
      setFilters((val: string[]) => {
        return {
          ...val,
          [filter]: [value],
        };
      });
    }
  };
  return (
    <fieldset>
      <legend>{name}:</legend>
      {criteria.map((v, i) => {
        return (
          <CheckBox
            key={i}
            name={name}
            option={v}
            index={i}
            handleOnChange={() => handleOnChange(name, v, i)}
            checkedState={checkedState}
          />
        );
      })}
    </fieldset>
  );
};

export default CheckBoxFilter;
