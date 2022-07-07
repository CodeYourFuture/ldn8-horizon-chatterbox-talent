import React, { useState, useCallback, useEffect } from "react";
//import styled from "styled-components";

interface CheckBoxProps {
  name: string;
  option: any;
  index: number;
  handleOnChange: any;
  checkedState: any[];
}

const CheckBox = ({
  name,
  option,
  index,
  handleOnChange,
  checkedState,
}: CheckBoxProps) => {
  return (
    <li style={{ listStyle: "none" }}>
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
  setResetState: any
}
const CheckBoxFilter = ({
  criteria,
  name,
  resetState,
  setResetState
}: CheckBoxFilterProps) => {
  const [checkedState, setCheckedState] = useState(
    new Array(criteria.length).fill(false)
  );

  useEffect(() => {
    if (resetState === false)
      setCheckedState(new Array(criteria.length).fill(false));
    if (checkedState.includes(true)) setResetState(true);
  }, [resetState, criteria.push, checkedState]);

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
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
            handleOnChange={handleOnChange}
            checkedState={checkedState}
          />
        );
      })}
    </fieldset>
  );
};

export default CheckBoxFilter;
