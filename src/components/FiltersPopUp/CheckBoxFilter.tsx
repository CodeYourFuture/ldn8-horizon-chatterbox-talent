import React, { useState, useEffect } from "react";
//import styled from "styled-components";

interface CheckBoxProps {
  name: string;
  option: any;
  index: number;
  handleOnChange: any;
 // checkedState: any[];
}

const CheckBox = ({
  name,
  option,
  index,
  handleOnChange,
  //checkedState,
}: CheckBoxProps) => {
  return (
    <li style={{ listStyle: "none" }}>
      <input
        type="checkbox"
        id={option}
        name={name}
        value={option}
        //checked={checkedState[index]}
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
  filterState: any[];
}
const CheckBoxFilter = ({
  criteria,filterState,
  name,
  resetState,
  setResetState
}: CheckBoxFilterProps) => {
  const [filters, setFilters] =filterState
  const [checkedState, setCheckedState] = useState(
    new Array(criteria.length).fill(false)
  );

  useEffect(() => {
    if (resetState === false)
      setCheckedState(new Array(criteria.length).fill(false));
    if (checkedState.includes(true)) setResetState(true);
    // eslint-disable-next-line
  }, [resetState, criteria, checkedState]);

  const handleOnChange = (filter: string, v: any) => {
    console.log(filters)
    if (filters[filter]) {
       setFilters((previousVal: any) => {
        if(previousVal[filter].includes(v)){
          return {
            ...previousVal,
            [filter]: previousVal[filter].filter((item: any) => item !== v)
          }
        } else {
          return {
            ...previousVal,
            [filter]: [...previousVal[filter], v]
          }
        }
      });
    } else {
      setFilters((val: any) => {
        return {
          ...val,
          [filter]: [v]
        }
      
       
     })
    }

    // const updatedCheckedState = checkedState.map((item, index) =>
    //   index === position ? !item : item
    // );
    // console.log(checkedState)
    // setCheckedState(updatedCheckedState);
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
            handleOnChange={()=>handleOnChange(name,v)}
            //checkedState={checkedState}
          />
        );
      })}
    </fieldset>
  );
};

export default CheckBoxFilter;
