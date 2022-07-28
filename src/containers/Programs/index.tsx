import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import MailChimPopUp from '../../components/MailChimpPopUp';

import { getAllProgramsInformation } from './Actions';

import { RootReducerInterface } from '../../reducers';
import { ProgramsStateInterface } from './Reducer';

import Card from './Card/Card';
import EmptyCard from './EmptyCard/EmptyCard';

import styles from './Programs.module.scss';
import Thumbnail from './Thumbnail/Thumbnail';
import FiltersPopUp from '../../components/FiltersPopUp';
import filterIcon from '../../assets/icon-filters.svg';

const SpecificProgramWrapper = styled.div<{ isShowing: boolean }>`
  max-height: 80vh;
  padding: 0 2vw;
  width: 65%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 768px) {
    display: ${props => !props.isShowing && 'none'};
    position: fixed;
    top: 0;
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
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
`;

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
`;
const FiltersBtn = styled.button`
  display: flex;
  justify-content: space-around;
  background-color: #3ee0ab;
  font-family: inherit;
  font-size: 16px;
  color: black;
  border-radius: 0.2em;
  outline: none;
  border: none;
  font-weight: 700;
  padding: 0.7em 1em;
  width: 119px;
  &:hover {
    opacity: ${props => (props.disabled ? '1' : '0.85')};
    cursor: ${props => (props.disabled ? 'inherit' : 'pointer')};
  }
`;

const SearchBtn = styled.button`
  background-color: black;
  font-family: inherit;
  font-size: 16px;
  color: white;
  border-radius: 0.2em;
  outline: none;
  border: none;
  font-weight: 700;
  padding: 0.7em 1em;
  width: 119px;
  &:hover {
    opacity: ${props => (props.disabled ? '1' : '0.85')};
    cursor: ${props => (props.disabled ? 'inherit' : 'pointer')};
  }
`;
const FiltersSearchWrapper = styled.div`
  padding: 0.5vw 1.5vw 1.8vw 1.5vw;
  background-color: white;
  @media screen and (max-width: 768px) {
    padding-bottom: 7vw;
     @media screen and (orientation: landscape) {
      padding-bottom: 1.8vw;
  }
`;

const InputAndButtonWrapper = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding-top: 10px;
`;

const FieldWrapper = styled.div`
  font-family: inherit;
  display: flex;
  flex-direction: column;
  width: 225px;
`;
const Input = styled.input`
  padding: 10.5px 10px;
  font-family: inherit;
  border: 1px solid black;
`;
const Select = styled.select`
  font-family: inherit;
  padding: 10.5px 10px;
  background-color: white;
  border: 1px solid black;
`;

type ProgramsProps = ProgramsStateInterface & {
  getAllProgramsInformationAction(): void;
};

const Programs = ({ getAllProgramsInformationAction, information, isLoadingPrograms }: ProgramsProps) => {
  const [isShowingModalOnMobile, setIsShowingModalOnMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupMail, setShowPopupMail] = useState(false);
  const [programSearchQuery, setProgramSearchQuery] = useState('');
  const [stateToRender, setStateToRender] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>(JSON.parse(localStorage.getItem('Favorites') || '[]'));
  const [selectedProgramId, setSelectedProgramId] = useState('loading');

  useEffect(() => {
    if (typeof stateToRender[0] == 'undefined') {
      setSelectedProgramId('loading');
    } else {
      setSelectedProgramId(stateToRender[0].id);
    }
  }, [stateToRender]);

  useEffect(() => {
    localStorage.setItem('Favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const handleUserSelection = (id: string) => {
    setSelectedProgramId(id);
    setIsShowingModalOnMobile(true);
  };

  // add or remove programs from array of favourites
  const handleFavouriteSelection = (programId: string) => {
    if (!favorites.some(v => v.id.includes(programId))) {
      const y = stateToRender.filter(v => v.id === programId)[0];
      setFavorites([...favorites, y]);
    } else {
      setFavorites(val => val.filter(v => v.id !== programId));
    }
  };

  const handleShowPopup = (option: boolean) => {
    setShowPopup(option);
  };

  const handleShowPopupMail = (option: boolean) => {
    setShowPopupMail(option);
  };

  // Search function
  const handleSearch = () => {
    setStateToRender(
      information.filter(
        programs =>
          programs.programName.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
          programs.description.toLowerCase().includes(programSearchQuery.toLowerCase()) ||
          programs.keyFacts.join(',').toLowerCase().includes(programSearchQuery.toLowerCase()) ||
          programs.locations.join(',').toLowerCase().includes(programSearchQuery.toLowerCase()) ||
          programs.careerType.join(',').toLowerCase().includes(programSearchQuery.toLowerCase()),
      ),
    );
    setProgramSearchQuery('');
  };

  useEffect(() => {
    setStateToRender(information);
  }, [information]);

  useEffect(() => {
    getAllProgramsInformationAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // filter data data to remove items that are in array of favourites & assign to a new var.
  const filteredByFavData: any[] = stateToRender.filter(object => {
    const favoritesIds = favorites.map(objectFave => objectFave.id);
    const isSelectedAsFave = favoritesIds.includes(object.id);
    return !isSelectedAsFave;
  });

  const handleSort = (evt: any) => {
    const sortBy = evt.target.value;

    if (sortBy === 'Most recent') {
      const render = stateToRender.sort((a: any, b: any) => b.dateAdded.localeCompare(a.dateAdded));
      setStateToRender([...render]);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles['title__wrapper']}>
        <h1 className={styles.title}>
          Opportunities for Refugees. We believe that talent is evenly distributed but opportunity is not!{' '}
        </h1>
        <p>
          Chatterbox Talent aims to connect marginalised talent with employment, self employment and employability
          schemes across the UK. We want to throw open the doors for refugees and this is just the start 🚀{' '}
        </p>
      </div>
      <section className={styles['content__wrapper']}>
        <div className={styles['all-programs__wrapper']}>
          {isLoadingPrograms ? (
            <div className={styles.loadingWrapper}>
              <ClipLoader color={styles['green-main']} loading={isLoadingPrograms} />
            </div>
          ) : (
            <div className={styles['thumbnails__wrapper']}>
              <div className={styles['thumbnail__sticky']}>
                <EmptyCard handleShowPopup={handleShowPopupMail} />
                <FiltersSearchWrapper>
                  <InputAndButtonWrapper>
                    <FieldWrapper>
                      <label htmlFor="search">Search:</label>
                      <Input
                        placeholder="Enter search term..."
                        type="text"
                        name="search"
                        id="search"
                        value={programSearchQuery}
                        onChange={e => setProgramSearchQuery(e.target.value)}
                      />
                    </FieldWrapper>
                    <SearchBtn onClick={handleSearch}>Search</SearchBtn>
                  </InputAndButtonWrapper>
                  <InputAndButtonWrapper>
                    <FieldWrapper>
                      <label>Sort:</label>
                      <Select onChange={handleSort}>
                        <option>Top rating</option>
                        <option>Most recent</option>
                      </Select>
                    </FieldWrapper>
                    <FiltersBtn onClick={() => handleShowPopup(true)}>
                      <img src={filterIcon} alt="filters icon"></img>
                      <span>Filters</span>
                    </FiltersBtn>
                  </InputAndButtonWrapper>
                </FiltersSearchWrapper>
              </div>
              <div>
                {[...favorites, ...filteredByFavData].map((data, index) => {
                  return (
                    <Thumbnail
                      key={data.id}
                      careerTypes={data.careerType}
                      locations={data.locations}
                      title={data.programName}
                      onThumbnailSelection={handleUserSelection}
                      onFavouriteSelection={handleFavouriteSelection}
                      isSelected={data.id === selectedProgramId}
                      numberOfReviews={data.reviews}
                      programId={data.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {showPopupMail && (
          <MailChimPopUp onSuccess={() => handleShowPopupMail(false)} onClose={() => handleShowPopupMail(false)} />
        )}
        {showPopup && (
          <FiltersPopUp
            information={information}
            onClose={() => handleShowPopup(false)}
            statusToRender={[stateToRender, setStateToRender]}
          />
        )}
        <SpecificProgramWrapper isShowing={isShowingModalOnMobile} onClick={() => setIsShowingModalOnMobile(false)}>
          {isLoadingPrograms ? (
            <div className={styles.loadingWrapper}>
              <ClipLoader color={styles['green-main']} loading={isLoadingPrograms} />
            </div>
          ) : (
            <CardWrapper onClick={(evt: SyntheticEvent) => evt.stopPropagation()}>
              {selectedProgramId === 'loading' ? (
                <Card />
              ) : (
                <Card {...[...stateToRender].filter(v => v.id === selectedProgramId)[0]} />
              )}

              <Caret onClick={() => setIsShowingModalOnMobile(false)}>X</Caret>
            </CardWrapper>
          )}
        </SpecificProgramWrapper>
      </section>
    </div>
  );
};

const mapStateToProps = (state: RootReducerInterface) => ({
  information: state.ProgramsReducer.programs.information,
  isLoadingPrograms: state.ProgramsReducer.programs.isLoadingPrograms,
});

export default connect(mapStateToProps, {
  getAllProgramsInformationAction: getAllProgramsInformation,
})(Programs);
