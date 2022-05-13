import { combineReducers } from "@reduxjs/toolkit";
import programsReducer , { ProgramsReducerInterface } from "../containers/Programs/Reducer";

export interface RootReducerInterface {
    ProgramsReducer: ProgramsReducerInterface;
}

const rootReducer = combineReducers({
    ProgramsReducer: programsReducer,
});

export default rootReducer;