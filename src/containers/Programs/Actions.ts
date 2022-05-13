import { Dispatch } from "@reduxjs/toolkit";
import { adaptPrograms, adaptReview, RawReviewInterface } from './adapter';
import { base } from "../../setup/airtable.setup";
import { GET_ALL_PROGRAMS_FAIL, GET_ALL_PROGRAMS_LOADING, GET_ALL_PROGRAMS_SUCCESS, GET_PROGRAM_REVIEWS_FAIL, GET_PROGRAM_REVIEWS_LOADING, GET_PROGRAM_REVIEWS_SUCCESS } from "./ActionTypes"
import { ProgramInterface, ReviewInterface } from "./Reducer";

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
                const { id, fields } = program;
                return adaptPrograms({ id, ...fields});
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

const getProgramReviewsSuccess = (programId:string, reviews: ReviewInterface[]) => ({
    type: GET_PROGRAM_REVIEWS_SUCCESS,
    payload: {
        programId,
        reviews
    },
})

const getProgramReviewsFail = () => ({
    type: GET_PROGRAM_REVIEWS_FAIL,
})

export const getProgramReviews = (programId: string, reviewsIds: string[]) => {
    return async (dispatch: Dispatch) => {
        dispatch(getProgramReviewsLoading(true));

        try {
            const rawReviews = await Promise.all(reviewsIds.map(async reviewId => await base('Reviews').find(reviewId)));
            const adaptedReviews = rawReviews.map( review => {
                const { fields } = review as unknown as { fields: RawReviewInterface};
                return adaptReview(fields);
            })
            dispatch(getProgramReviewsSuccess(programId, adaptedReviews));
            dispatch(getProgramReviewsLoading(false));
        } catch (err) {
            console.log(err);
            dispatch(getProgramReviewsFail());
            dispatch(getProgramReviewsLoading(false));
        }
    }
}