import { combineReducers } from "@reduxjs/toolkit";
import { programsReducer, ProgramsReducerStateInterface } from "../containers/Programs/Reducer";

export interface RootReducerInterface {
    Programs: ProgramsReducerStateInterface;
}

const rootReducer = combineReducers({
    Programs: programsReducer,
});

export default rootReducer;