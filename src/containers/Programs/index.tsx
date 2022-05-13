import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';

import { getAllProgramsInformation } from './Actions';
import { RootReducerInterface } from '../../reducers';
import { ProgramsStateInterface } from './Reducer';

import Card from './Card/Card';
import EmptyCard from './EmptyCard/EmptyCard';

import styles from './Programs.module.scss';

interface ProgramsProps extends ProgramsStateInterface {
    getAllProgramsInformationAction() : void;
}

const Programs = ({
    getAllProgramsInformationAction,
    information,
    isLoadingPrograms,
}: ProgramsProps) => {

    useEffect(() => {
        getAllProgramsInformationAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Opportunities for Refugees</h1>
            {isLoadingPrograms
                ? <div className={styles.loadingWrapper}><SyncLoader color={styles["green-main"]} loading={isLoadingPrograms} /></div>
                : (
                    <div className={styles.cardsWrapper}>
                        {information.map((data, index) => <Card key={index} {...data}/>)}
                        <EmptyCard/>
                    </div>
                )
            }
        </div>
    )
};

const mapStateToProps = (state: RootReducerInterface) => ({
    information: state.ProgramsReducer.programs.information,
    isLoadingPrograms: state.ProgramsReducer.programs.isLoadingPrograms,
})

export default connect(mapStateToProps, {
    getAllProgramsInformationAction: getAllProgramsInformation,
})(Programs);