import SlideButton from '../../../components/SlideButton/SlideButton';

import styles from './EmptyCard.module.scss';
interface EmptyCardProps {
  handleShowPopup(params: boolean): void;
}

const EmptyCard = ({ handleShowPopup }: EmptyCardProps) => {
  return (
    <div className={styles.emptyCardWrapper}>
      <h1 className={styles.headlines}>Want to be the first to hear about refugee schemes and opportunities?</h1>
      <SlideButton buttonText="Subscribe" onClick={() => handleShowPopup(true)} />
    </div>
  );
};

export default EmptyCard;
