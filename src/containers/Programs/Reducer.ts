import { AnyAction } from "@reduxjs/toolkit";
import { GET_PROGRAMS_LOADING, GET_PROGRAMS_SUCCESS } from "./ActionTypes";
import { ImageInterface } from "./adapter";

export interface ProgramsReducerStateInterface {
    isLoading: boolean;
    information: ProgramInterface[]
}

export interface ProgramInterface {
    activelyHiring: boolean;
    careerType: string[];
    description: string;
    keyFacts: string;
    liveOnSite: boolean;
    locations: string[];
    logo: ImageInterface[];
    onSite: string;
    programName: string;
    programDuration: string;
    reviews: string[];
    stepsToApply: string;
    website: string;
}

const initialState = {
    isLoading: false,
    information: []
}

export function programsReducer(state:ProgramsReducerStateInterface = initialState, action: AnyAction): ProgramsReducerStateInterface {
    switch(action.type) {
        case GET_PROGRAMS_LOADING:
            return { ...state, isLoading: action.payload }
        case GET_PROGRAMS_SUCCESS:
            return { ...state, information: action.payload }
        default:
            return state;
    }
};