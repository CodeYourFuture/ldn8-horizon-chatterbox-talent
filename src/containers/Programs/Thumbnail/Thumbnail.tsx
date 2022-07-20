import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import { ReactComponent as Pin1 } from '../../../assets/icon-pin.svg';

import Rating from '../../../components/Rating/Rating';
import { RootReducerInterface } from '../../../reducers';

import { selectProgramScore } from '../Reducer';

const Title = styled.h3<{ isSelected: boolean }>`
  font-size: 1.2em;
  font-weight: 700;
  text-align: left;
  color: ${props => (props.isSelected ? '#6AE7BE' : 'inherit')};
  text-decoration: ${props => (props.isSelected ? 'underline' : 'none')};
`;

const TextContent = styled.p`
  font-size: 0.95em;
  font-weight: 400;
  line-height: 1.4em;
  text-align: left;
`;

const StrongTextContent = styled(TextContent)`
  font-weight: 700;
`;

const TextBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.7em;
`;

const Wrapper = styled.button`
  width: 100%;
  background-color: 'transparent';
  outline: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  gap: 1vw;
  padding: 0 1.5vw;
  margin-bottom: 3vw;
  &:after {
    content: '';
    position: absolute;
    bottom: -1.5vw;
    width: 90%;
    height: 1px;
    background-color: #2eb48e;
  }

  &:hover {
    cursor: pointer;

    ${Title} {
      color: #6ae7be;
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 768px) {
    background-color: transparent;
    gap: 3vw;
  }
`;

interface ThumbnailProps {
  careerTypes: string[];
  index: number;
  isSelected: boolean;
  locations: string[];
  onThumbnailSelection(programId: string): void;
  onFavouriteSelection(programId: string): void;
  title: string;
  numberOfReviews: number;
  programId: string;
  isLoadingReviews: boolean;
  setStateToRender: any;
  stateToRender: any;
}

const Thumbnail = ({
  index,
  isSelected,
  careerTypes,
  locations,
  title,
  onThumbnailSelection,
  onFavouriteSelection,
  numberOfReviews,
  programId,
  isLoadingReviews,
  stateToRender,
  setStateToRender,
}: ThumbnailProps) => {
  const programScore = useSelector(selectProgramScore(programId));
  const [favourite, setFavourite] = useState<boolean>(false);

  const handlesFavouriteChange = () => {
    setFavourite(true);
  };

  const handlesRemoveFavouriteChange = () => {
    setFavourite(false);
  };
  // };

  // //useEffect
  // useEffect(() => {
  //   if (favourite) {
  //     setStateToRender([...stateToRender, stateToRender.splice(0, 0, stateToRender.splice(index, 1)[0])]);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }
  // }, [favourite]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper onClick={() => onThumbnailSelection(programId)}>
      <Title isSelected={isSelected}>{title}</Title>
      <div>
        {!favourite ? (
          <Pin1
            onClick={() => {
              onFavouriteSelection(programId);
              handlesFavouriteChange();
            }}
            fill="none"
            stroke="black"
          />
        ) : (
          <Pin1
            onClick={() => {
              onFavouriteSelection(programId);
              handlesRemoveFavouriteChange();
            }}
            fill="black"
          />
        )}
      </div>

      {isLoadingReviews ? (
        <ClipLoader size="20px" />
      ) : (
        Boolean(programScore?.overall) && (
          <Rating rating={programScore?.overall || 0} numberOfReviews={numberOfReviews} />
        )
      )}
      {locations && (
        <TextBlock>
          <b>
            <StrongTextContent>Locations: </StrongTextContent>
          </b>
          <TextContent>{locations.join(', ')}</TextContent>
        </TextBlock>
      )}
      {careerTypes && (
        <TextBlock>
          <b>
            <StrongTextContent>Careers: </StrongTextContent>
          </b>
          <TextContent>{careerTypes.join(', ')}</TextContent>
        </TextBlock>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: RootReducerInterface) => ({
  isLoadingReviews: state.ProgramsReducer.reviews.isLoadingReviews,
});

export default connect(mapStateToProps)(Thumbnail);
