import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { GET_ALL_PROGRAMS_LOADING, GET_ALL_PROGRAMS_SUCCESS, GET_PROGRAM_REVIEWS_LOADING, GET_PROGRAM_REVIEWS_SUCCESS } from "./ActionTypes";
import { ImageInterface } from "./adapter";

export enum CareersEnum {
    Engineering= "#99e6b3",
    HR= "#ace1af",
    Finance= "#a8e4a0",
    IT= "#addfad",
    "-"= "#66ddaa"
}

export interface ProgramInterface {
    id: string;
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

const programsInitialState = {
    isLoadingPrograms: false,
    information: [],
}

export interface ProgramsStateInterface {
    isLoadingPrograms: boolean;
    information: ProgramInterface[];
}

function programsReducer(state:ProgramsStateInterface = programsInitialState, action: AnyAction): ProgramsStateInterface {
    switch(action.type) {
        case GET_ALL_PROGRAMS_LOADING:
            return { ...state, isLoadingPrograms: action.payload }
        case GET_ALL_PROGRAMS_SUCCESS:
            return { ...state, information: action.payload }
        default:
            return state;
    }
};

export interface ReviewInterface {
    applicationProcessRating: number;
    email: string;
    experienceSummary: string;
    futureProspectsRating: number;
    likelyRecommendToAFriend: string;
    languageSupportRating: number;
    isMentor: boolean;
    notes: string[];
    professionalDevelopmentRating: number;
}

export interface ReviewsStateInterface {
    isLoadingReviews: boolean;
    data: [string, ReviewInterface[]][];
}

const reviewsInitialState = {
    isLoadingReviews: false,
    data: [],
}

interface ReviewsActionPayload {
    programId: string;
    reviews: ReviewInterface[];
}

const reorganizeDataAsMap = (previousState: ReviewsStateInterface, { programId, reviews }: ReviewsActionPayload): ReviewsStateInterface['data'] => {
    const dataMap = new Map(previousState.data);
    return Array.from(dataMap.set(programId, reviews));
}

function reviewsReducer(state:ReviewsStateInterface = reviewsInitialState, action: AnyAction): ReviewsStateInterface {
    switch(action.type) {
        case GET_PROGRAM_REVIEWS_LOADING:
            return { ...state, isLoadingReviews: action.payload }
        case GET_PROGRAM_REVIEWS_SUCCESS:
            return { ...state, data: reorganizeDataAsMap(state, action.payload) }
        default:
            return state;
    }
};

export interface ProgramsReducerInterface {
    programs: ProgramsStateInterface;
    reviews: ReviewsStateInterface;
}

export default combineReducers({ programs: programsReducer, reviews: reviewsReducer })