import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { RootReducerInterface } from "../../reducers";
import { GET_ALL_PROGRAMS_LOADING, GET_ALL_PROGRAMS_SUCCESS, GET_PROGRAM_REVIEWS_LOADING, GET_PROGRAM_REVIEWS_SUCCESS, SEARCH_PROGRAMS } from "./ActionTypes";
import { ImageInterface } from "./adapter";
import { calculateAverage } from "./utils";

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
    searchQuery: ""
}

export interface ProgramsStateInterface {
    isLoadingPrograms: boolean;
    information: ProgramInterface[];
    searchQuery: string
}

function programsReducer(state:ProgramsStateInterface = programsInitialState, action: AnyAction): ProgramsStateInterface {
    switch(action.type) {
        case GET_ALL_PROGRAMS_LOADING:
            return { ...state, isLoadingPrograms: action.payload }
        case GET_ALL_PROGRAMS_SUCCESS:
            return { ...state, information: action.payload }
        case SEARCH_PROGRAMS:
            return { ...state, searchQuery: action.payload}
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
    liveReview: boolean;
    isMentor: boolean;
    notes: string[];
    professionalDevelopmentRating: number;
}

export interface ScoresInterface {
    application: number;
    languageSupport: number;
    futureProspect: number;
    professionalDevelopment: number;
    overall: number;
}
export interface ReviewsStateInterface {
    isLoadingReviews: boolean;
    programsReviews: [string, ReviewInterface[]][];
    programsScore: [string, ScoresInterface][];
}

const reviewsInitialState = {
    isLoadingReviews: false,
    programsReviews: [],
    programsScore: [],
}

interface ReviewsActionPayload {
    programId: string;
    reviews: ReviewInterface[];
}

const reorganizeDataAsMap = (previousState: ReviewsStateInterface, { programId, reviews }: ReviewsActionPayload): ReviewsStateInterface['programsReviews'] => {
    const dataMap = new Map(previousState.programsReviews);
    return Array.from(dataMap.set(programId, reviews));
}

const calculateRatings = ({ programId, reviews }: ReviewsActionPayload):  ReviewsStateInterface['programsScore'] => {
    if (!reviews.length) return [];
    const dataMap = new Map();
    const applicationAvg = calculateAverage('applicationProcessRating', reviews);
    const languageSupportAvg = calculateAverage('languageSupportRating', reviews);
    const futureProspectsAvg = calculateAverage('futureProspectsRating', reviews);
    const professionalDevelopAvg = calculateAverage('professionalDevelopmentRating', reviews);
    const overallAvg = (applicationAvg + languageSupportAvg + futureProspectsAvg + professionalDevelopAvg)/4;
    const scores = {
        application: applicationAvg, 
        languageSupport: languageSupportAvg, 
        futureProspect: futureProspectsAvg, 
        professionalDevelopment: professionalDevelopAvg, 
        overall: overallAvg
    };

    return Array.from(dataMap.set(programId, scores));
}

function reviewsReducer(state:ReviewsStateInterface = reviewsInitialState, action: AnyAction): ReviewsStateInterface {
    switch(action.type) {
        case GET_PROGRAM_REVIEWS_LOADING:
            return { ...state, isLoadingReviews: action.payload }
        case GET_PROGRAM_REVIEWS_SUCCESS:
            return { ...state, programsReviews: reorganizeDataAsMap(state, action.payload), programsScore: calculateRatings(action.payload) }
        default:
            return state;
    }
};

export const selectProgramReviews = (programId: string) => (state: RootReducerInterface) => {
    if (!programId) return [];
    const allReviews = state.ProgramsReducer.reviews.programsReviews;
    const dataMap = new Map(allReviews);
    return dataMap.get(programId) || [];
}

export const selectProgramScore = (programId: string) => (state: RootReducerInterface) => {
    const defaultValue = {
        application: 0,
        languageSupport: 0,
        futureProspect: 0,
        professionalDevelopment: 0,
        overall: 0,
    };

    const allScores = state.ProgramsReducer.reviews.programsScore;
    const dataMap = new Map(allScores);
    
    return dataMap.get(programId) || defaultValue;
}

export interface ProgramsReducerInterface {
    programs: ProgramsStateInterface;
    reviews: ReviewsStateInterface;
}

export default combineReducers({ programs: programsReducer, reviews: reviewsReducer })