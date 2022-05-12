import { Dispatch } from "@reduxjs/toolkit";
import { adaptPrograms, RawProgramInterface } from './adapter';
import { base } from "../../setup/airtable.setup";
import { GET_PROGRAMS_FAIL, GET_PROGRAMS_LOADING, GET_PROGRAMS_SUCCESS } from "./ActionTypes"
import { ProgramInterface } from "./Reducer";

const getProgramsLoading = (status: boolean) => ({
    type: GET_PROGRAMS_LOADING,
    payload: status,
})

const getProgramsSuccess = (programs: ProgramInterface[]) => ({
    type: GET_PROGRAMS_SUCCESS,
    payload: programs,
})

const getProgramsFail = () => ({
    type: GET_PROGRAMS_FAIL,
})

export const getPrograms = () => {
    return async (dispatch: Dispatch) => {
        dispatch(getProgramsLoading(true));

        try {
            const rawPrograms = await base('Programs')
                .select({
                    view: 'All Opportunities'
                })
                .all();
    
            const adaptedPrograms = rawPrograms.map( program => {
                const { fields } = program;
                return adaptPrograms(fields);
            })
    
            dispatch(getProgramsSuccess(adaptedPrograms));
            dispatch(getProgramsLoading(false));
        } catch (err) {
            dispatch(getProgramsFail());
            dispatch(getProgramsLoading(false));
        }

    }
};