import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { getAllProgramsInformation } from './Actions';
import { RootReducerInterface } from '../../reducers';
import { ProgramsStateInterface } from './Reducer';

import Card from './Card/Card';
import EmptyCard from './EmptyCard/EmptyCard';

import styles from './Programs.module.scss';
import Thumbnail from './Thumbnail/Thumbnail';

const SpecificProgramWrapper = styled.div<{isShowing: boolean}>`
    max-height: 80vh;
    padding: 0 2vw;
    width: 65%;
    overflow-y: auto;
    display: flex;
    justify-content: center;

    @media screen and (max-width:768px) {
        display: ${props => !props.isShowing && 'none'};
        position: fixed;
        top: 10vh;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        z-index: 1200;
        max-height: 90vh;
        overflow-y: auto;

        &:before {
            content: ' ';
            position: fixed;
            background-color: rgba(0, 0, 0, 0.8);
            inset: 0;
        }
    }
`

const CardWrapper = styled.div`
    position: relative;
    width: 100%;
`

const Caret = styled.button`
    display: none;
    background-color: transparent;
    outline: none;
    border: none;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        color: black;
        right: 5%;
        top: 2%;
        z-index: 1000;
    }
`

type ProgramsProps = ProgramsStateInterface & {
    getAllProgramsInformationAction() : void;
}

const Programs = ({
    getAllProgramsInformationAction,
    information,
    isLoadingPrograms,
}: ProgramsProps) => {
    const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
    const [isShowingModalOnMobile, setIsShowingModalOnMobile] = useState(false);

    const handleUserSelection = (index: number) => {
        setSelectedProgramIndex(index);
        setIsShowingModalOnMobile(true);
    }

    useEffect(() => {
        getAllProgramsInformationAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles["title__wrapper"]}>
                <h1 className={styles.title}><span className={styles["green-text"]}>Opportunities for Refugees</span>. We believe that talent is evenly distribute but opportunity is not! </h1>
                <p>We want to throw open the doors of opportunity for refugees and marginalised talent in the UK - this is just the start 🚀</p>
            </div>
            <section className={styles["content__wrapper"]}>
                <div className={styles["all-programs__wrapper"]}>
                    {isLoadingPrograms
                        ? <div className={styles.loadingWrapper}><ClipLoader color={styles["green-main"]} loading={isLoadingPrograms} /></div>
                        : (
                            <div className={styles["thumbnails__wrapper"]}>
                                <div className={styles["thumbnail__sticky"]}><EmptyCard /></div>
                                {information.map((data, index) => {
                                    return <Thumbnail
                                        key={index} 
                                        careerTypes={data.careerType} 
                                        index={index}
                                        locations={data.locations} 
                                        title={data.programName}
                                        onThumbnailSelection={handleUserSelection}
                                        isSelected={index === selectedProgramIndex}
                                        numberOfReviews={data.reviews.length}
                                        programId={data.id}
                                    />
                                })}
                            </div>
                        )
                    }
                </div>
                <SpecificProgramWrapper isShowing={isShowingModalOnMobile} onClick={() => setIsShowingModalOnMobile(false)}>
                    {isLoadingPrograms
                        ? <div className={styles.loadingWrapper}><ClipLoader color={styles["green-main"]} loading={isLoadingPrograms} /></div>
                        : (
                            <CardWrapper onClick={(evt: SyntheticEvent) => evt.stopPropagation()}>
                                <Card {...information[selectedProgramIndex]} />
                                <Caret onClick={() => setIsShowingModalOnMobile(false)}>X</Caret>
                            </CardWrapper>
                        )
                    }
                </SpecificProgramWrapper>
            </section>

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