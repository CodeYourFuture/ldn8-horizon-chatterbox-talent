import { Dispatch } from "@reduxjs/toolkit";
import { adaptPrograms } from './adapter';
import { base } from "../../setup/airtable.setup";
import { GET_ALL_PROGRAMS_FAIL, GET_ALL_PROGRAMS_LOADING, GET_ALL_PROGRAMS_SUCCESS, GET_PROGRAM_REVIEWS_FAIL, GET_PROGRAM_REVIEWS_LOADING, GET_PROGRAM_REVIEWS_SUCCESS } from "./ActionTypes"
import { ProgramInterface } from "./Reducer";

const getAllProgramsInformationLoading = (status: boolean) => ({
    type: GET_ALL_PROGRAMS_LOADING,
    payload: status,
})

const getAllProgramsInformationSuccess = (programs: ProgramInterface[]) => ({
    type: GET_ALL_PROGRAMS_SUCCESS,
    payload: programs,
})

const getAllProgramsInformationFail = () => ({
    type: GET_ALL_PROGRAMS_FAIL,
})

export const getAllProgramsInformation = () => {
    return async (dispatch: Dispatch) => {
        dispatch(getAllProgramsInformationLoading(true));

        try {
            const rawPrograms = await base('Programs')
                .select({ view: 'Live Opportunities' })
                .all();
    
            const adaptedPrograms = rawPrograms.map( program => {
                const { fields } = program;
                return adaptPrograms(fields);
            })
    
            dispatch(getAllProgramsInformationSuccess(adaptedPrograms));
            dispatch(getAllProgramsInformationLoading(false));
        } catch (err) {
            dispatch(getAllProgramsInformationFail());
            dispatch(getAllProgramsInformationLoading(false));
        }

    }
};

const getProgramReviewsLoading = (status: boolean) => ({
    type: GET_PROGRAM_REVIEWS_LOADING,
    payload: status,
})

// const getProgramReviewsSuccess = (programs: ProgramInterface[]) => ({
//     type: GET_PROGRAM_REVIEWS_SUCCESS,
//     payload: programs,
// })

const getProgramReviewsFail = () => ({
    type: GET_PROGRAM_REVIEWS_FAIL,
})

export const getProgramReviews = (programId: string) => {
    return async (dispatch: Dispatch) => {
        getProgramReviewsLoading(true);

        try {
            const rawReviews = await base('Reviews').find(programId);
            console.log(rawReviews);
            getProgramReviewsLoading(false);
        } catch (err) {
            getProgramReviewsFail();
            getProgramReviewsLoading(false);
        }
    }
}