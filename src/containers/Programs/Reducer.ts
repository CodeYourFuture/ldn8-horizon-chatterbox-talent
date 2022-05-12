import { AnyAction } from "@reduxjs/toolkit";
import { GET_ALL_PROGRAMS_LOADING, GET_ALL_PROGRAMS_SUCCESS } from "./ActionTypes";
import { ImageInterface } from "./adapter";

export interface ProgramsReducerStateInterface {
    isLoading: boolean;
    information: ProgramInterface[];
    reviews: any[];
}

export enum CareersEnum {
    Engineering= "#99e6b3",
    HR= "#ace1af",
    Finance= "#a8e4a0",
    IT= "#addfad",
    "-"= "#66ddaa"
}

export interface ProgramInterface {
    isActivelyHiring: boolean;
    careerType: (keyof typeof CareersEnum)[];
    description: string;
    keyFacts: string[];
    locations: string[];
    logo: ImageInterface[];
    onSite: string;
    programName: string;
    programDuration: string;
    reviews: string[];
    stepsToApply: string[];
    website: string;
}

export interface ReviewInterface {
    email: string;
    notes: string[];
    languageSupportRating: number;
    isMentor: boolean;
    experienceSummary: string;
    professionalDevelopmentRating: number;
    futureProspectsRating: number;
    recommendToAFriend: string;
    isProgramLive: boolean;
    applicationProcessRating: number;
}

const initialState = {
    isLoading: false,
    information: [],
    reviews: [],
}

export function programsReducer(state:ProgramsReducerStateInterface = initialState, action: AnyAction): ProgramsReducerStateInterface {
    switch(action.type) {
        case GET_ALL_PROGRAMS_LOADING:
            return { ...state, isLoading: action.payload }
        case GET_ALL_PROGRAMS_SUCCESS:
            return { ...state, information: action.payload }
        default:
            return state;
    }
};