import React, { useState, useEffect } from 'react';
import styles from './CheckBoxFilter.module.scss';
//import styled from "styled-components";

interface CheckBoxProps {
  name: string;
  option: any;
  index: number;
  handleOnChange: Function;
  checkedState: boolean[];
}

export const CheckBox = ({ name, option, index, handleOnChange, checkedState }: CheckBoxProps) => {
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
  name: string; // to make labels and display for end user
  resetState: boolean;
  setResetState: any;
  filterState: any[];
  objKey: string; //to store original key names in filters matching keys in our data
}
export const CheckBoxFilter = ({
  criteria,
  filterState,
  name,
  resetState,
  setResetState,
  objKey,
}: CheckBoxFilterProps) => {
  const [filters, setFilters] = filterState;
  const [checkedState, setCheckedState] = useState(new Array(criteria.length).fill(false));

  useEffect(() => {
    if (resetState === false) {
      setFilters({});
      setCheckedState(new Array(criteria.length).fill(false));
    }
    if (checkedState.includes(true)) setResetState(true);
    // eslint-disable-next-line
  }, [resetState, criteria, checkedState, filters]);

  const handleOnChange = (filter: string, value: string, position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
    if (filters[filter]) {
      setFilters((previousVal: { [key: string]: string[] }) => {
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
            handleOnChange={() => handleOnChange(objKey, v, i)}
            checkedState={checkedState}
          />
        );
      })}
    </fieldset>
  );
};
export const MultiSelectDropDown = ({
  criteria,
  filterState,
  name,
  resetState,
  setResetState,
  objKey,
}: CheckBoxFilterProps) => {
  const [filters, setFilters] = filterState;
  const [checkedState, setCheckedState] = useState(new Array(criteria.length).fill(false));
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    if (resetState === false) {
      setFilters({});
      setSelected([]);
      setCheckedState(new Array(criteria.length).fill(false));
    }
    if (checkedState.includes(true)) setResetState(true);
    // eslint-disable-next-line
  }, [resetState, criteria, checkedState, filters, selected]);

  const handleOnChange = (filter: string, value: string, position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);

    setSelected(prevSelected => {
      // if it's in, remove
      const newArray = [...prevSelected];
      if (newArray.includes(value)) {
        return newArray.filter(item => item !== value);
        // else, add
      } else {
        newArray.push(value);
        return newArray;
      }
    });

    if (filters[filter]) {
      setFilters((previousVal: { [key: string]: string[] }) => {
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
    <>
      <legend>{name}:</legend>
      <div className={styles['c-multi-select-dropdown']}>
        <div className={styles['c-multi-select-dropdown__selected']}>
          <div>{selected.join(' ')}</div>
          {/* <img src={Dropdown} /> */}
        </div>
        <ul className={styles['c-multi-select-dropdown__options']}>
          {criteria.map((v, i) => {
            return (
              <CheckBox
                key={i}
                name={name}
                option={v}
                index={i}
                handleOnChange={() => handleOnChange(objKey, v, i)}
                checkedState={checkedState}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
