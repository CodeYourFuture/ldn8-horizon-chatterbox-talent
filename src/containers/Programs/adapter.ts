import { CareersEnum, ProgramInterface, ReviewInterface } from './Reducer';
import { splitStringIntoSeparatedPhrases } from './utils';

export interface RawProgramInterface {
  id: string;
  'Actively hiring?'?: boolean;
  'Career type'?: (keyof typeof CareersEnum)[];
  Description?: string;
  'Key Facts'?: string;
  'Linked Record'?: string[];
  'Live on site ?'?: boolean;
  'Location(s)'?: string[];
  Logo?: ImageInterface[];
  'On-site / Remote'?: string;
  'Program Name'?: string;
  'Program duration'?: string;
  Reviews?: string[];
  'Steps to apply'?: string;
  'Website link - more information'?: string;
}

export interface ImageInterface {
  filename: string;
  height: number;
  id: string;
  size: number;
  thumbnails: ThumbnailsInterface;
  type: string;
  url: string;
  width: 600;
}

interface ThumbnailsInterface {
  full: Thumbnail;
  large: Thumbnail;
  small: Thumbnail;
}

interface Thumbnail {
  height: number;
  url: string;
  width: number;
}

export const adaptPrograms = (rawData: RawProgramInterface): ProgramInterface => {
  return {
    id: rawData.id,
    isActivelyHiring: rawData['Actively hiring?'] || false,
    careerType: rawData['Career type'] || ['-'],
    description: rawData['Description'] || '',
    keyFacts: splitStringIntoSeparatedPhrases(rawData['Key Facts'], /\n/),
    locations: rawData['Location(s)'] || [],
    logo: rawData['Logo'] || [],
    onSite: rawData['On-site / Remote'] || '',
    programName: rawData['Program Name'] || '',
    programDuration: rawData['Program duration'] || '',
    reviews: rawData['Reviews'] || [],
    stepsToApply: splitStringIntoSeparatedPhrases(rawData['Steps to apply'], /\n/),
    website: rawData['Website link - more information'] || '',
    dateAdd: new Date(`2022-${Math.round(Math.random() * 12)}-${Math.round(Math.random() * 28)}`),
  };
};

export interface RawReviewInterface {
  'Application Process': number;
  Email: string;
  'Experience summary': string;
  'Future Prospects Rating': number;
  'How likely is it that you would recommend this scheme to a friend?': string;
  'Language Support Rating': number;
  'Live review': string;
  'Mentor?': string;
  Notes: string[];
  'Professional Development Rating': number;
}

export const adaptReview = (rawReview: RawReviewInterface): ReviewInterface => {
  return {
    applicationProcessRating: rawReview['Application Process'] || 0,
    email: rawReview['Email'] || '',
    experienceSummary: rawReview['Experience summary'] || '',
    futureProspectsRating: rawReview['Future Prospects Rating'] || 0,
    likelyRecommendToAFriend: rawReview['How likely is it that you would recommend this scheme to a friend?'] || '-',
    languageSupportRating: rawReview['Language Support Rating'] || 0,
    liveReview: rawReview['Live review'] === 'Yes' ? true : false,
    isMentor: rawReview['Mentor?'] === 'Yes' ? true : false,
    notes: rawReview['Notes'] || [],
    professionalDevelopmentRating: rawReview['Professional Development Rating'] || 0,
  };
};
