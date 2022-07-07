import React, { useState } from "react";
//import styled from "styled-components";

const CheckBox = ({ option, index, handleOnChange, checkedState }) => {
  return (
    <li style={{listStyle: "none"}}>
      <input
        type="checkbox"
        id={`custom-checkbox-${index}`}
        name={option}
        value={option}
        checked={checkedState[index]}
        onChange={() => handleOnChange(index)}
      />
      <label htmlFor={`custom-checkbox-${index}`}>{option}</label>
    </li>
  );
};

const CheckBoxFilter = ({ array, name }) => {
  const [checkedState, setCheckedState] = useState(
    new Array(array.length).fill(false)
  );
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  return (
    <fieldset>
      <legend>{name}:</legend>
      {array.map((v, i) => {
        return (
          <CheckBox
            key={i}
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
