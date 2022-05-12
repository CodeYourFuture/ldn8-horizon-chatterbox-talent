import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootReducerInterface } from '../../reducers';
import { getPrograms } from './Actions';

import Card from './Card/Card';
import EmptyCard from './EmptyCard/EmptyCard';

import styles from './Programs.module.scss';
import { ProgramInterface } from './Reducer';

interface ProgramsProps {
    getProgramsActions() : void;
    programsInformation: ProgramInterface[];
}

const Programs = ({ getProgramsActions, programsInformation }: ProgramsProps) => {

    useEffect(() => {
        getProgramsActions();
    }, []);

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Opportunities for Refugees</h1>
            <div className={styles.cardsWrapper}>
                {programsInformation.map( programInformation => <Card {...programInformation}/>)}
                <EmptyCard/>
            </div>
        </div>
    )
};

const mapStateToProps = (state: RootReducerInterface) => ({
    programsInformation: state.Programs.information,
})

export default connect(mapStateToProps, {
    getProgramsActions: getPrograms,
})(Programs);