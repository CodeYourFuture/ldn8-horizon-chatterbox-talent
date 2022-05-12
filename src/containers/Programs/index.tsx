import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';

import { getAllProgramsInformation } from './Actions';
import { RootReducerInterface } from '../../reducers';
import { ProgramInterface } from './Reducer';

import Card from './Card/Card';
import EmptyCard from './EmptyCard/EmptyCard';

import styles from './Programs.module.scss';

interface ProgramsProps {
    getAllProgramsInformationAction() : void;
    programsInformation: ProgramInterface[];
    isLoading: boolean;
}

const Programs = ({ getAllProgramsInformationAction, programsInformation, isLoading }: ProgramsProps) => {

    useEffect(() => {
        getAllProgramsInformationAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Opportunities for Refugees</h1>
            {isLoading
                ? <div className={styles.loadingWrapper}><SyncLoader color="#8CE4C0" loading={isLoading} /></div>
                : (
                    <div className={styles.cardsWrapper}>
                        {programsInformation.map((programInformation, index) => <Card key={index} {...programInformation}/>)}
                        <EmptyCard/>
                    </div>
                )
            }
        </div>
    )
};

const mapStateToProps = (state: RootReducerInterface) => ({
    programsInformation: state.Programs.information,
    isLoading: state.Programs.isLoading,
})

export default connect(mapStateToProps, {
    getAllProgramsInformationAction: getAllProgramsInformation,
})(Programs);