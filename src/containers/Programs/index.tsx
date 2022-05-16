import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import { getAllProgramsInformation } from './Actions';
import { RootReducerInterface } from '../../reducers';
import { ProgramsStateInterface } from './Reducer';

import Card from './Card/Card';
import EmptyCard from './EmptyCard/EmptyCard';

import styles from './Programs.module.scss';
import Thumbnail from './Thumbnail/Thumbnail';

interface ProgramsProps extends ProgramsStateInterface {
    getAllProgramsInformationAction() : void;
}

const Programs = ({
    getAllProgramsInformationAction,
    information,
    isLoadingPrograms,
}: ProgramsProps) => {
    const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);

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
                                        onThumbnailSelection={setSelectedProgramIndex}
                                    />
                                })}
                            </div>
                        )
                    }
                </div>
                <div className={styles["specific-program__wrapper"]}>
                    {isLoadingPrograms
                        ? <div className={styles.loadingWrapper}><ClipLoader color={styles["green-main"]} loading={isLoadingPrograms} /></div>
                        : <Card {...information[selectedProgramIndex]}/>
                    }
                </div>
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