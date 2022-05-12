import { CareersEnum, ProgramInterface, ReviewInterface } from "./Reducer";
import { splitStringIntoSeparatedPhrases } from "./utils";

export interface RawProgramInterface {
    "Actively hiring?"?: boolean;
    "Career type"?: (keyof typeof CareersEnum)[];
    "Description"?: string;
    "Key Facts"?: string;
    "Linked Record"?: string[];
    "Live on site ?"?: boolean;
    "Location(s)"?: string[];
    "Logo"?: ImageInterface[];
    "On-site / Remote"?: string;
    "Program Name"?: string;
    "Program duration"?: string;
    "Reviews"?: string[];
    "Steps to apply"?: string;
    "Website link - more information"?: string;
};

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
};

export const adaptPrograms = (rawData: RawProgramInterface): ProgramInterface => {
    return {
        isActivelyHiring: rawData["Actively hiring?"] || false,
        careerType: rawData["Career type"] || ['-'],
        description: rawData["Description"] || '',
        keyFacts: splitStringIntoSeparatedPhrases(rawData["Key Facts"], /\n/),
        locations: rawData["Location(s)"] || [],
        logo: rawData["Logo"] || [],
        onSite: rawData["On-site / Remote"] || '',
        programName: rawData["Program Name"] || '',
        programDuration: rawData["Program duration"] || '',
        reviews: rawData["Reviews"] || [],
        stepsToApply: splitStringIntoSeparatedPhrases(rawData["Steps to apply"], /\n/),
        website: rawData["Website link - more information"] || '',
    };
};

export interface RawReviewInterface {
    "Email": string;
    "Notes": string[];
    "Language Support Rating": number;
    "Mentor?": string;
    "Experience summary": string;
    "Professional Development Rating": number;
    "Future Prospects Rating": number;
    "How likely is it that you would recommend this scheme to a friend?": string;
    "Program live?": string;
    "Application Process": number;
}

export const adaptReview = (rawReview: RawReviewInterface): ReviewInterface => {
    return {
        email: rawReview["Email"] || '',
        notes: rawReview["Notes"] || [],
        languageSupportRating: rawReview["Language Support Rating"] || 0,
        isMentor: rawReview["Mentor?"] === 'Yes' ? true : false,
        experienceSummary: rawReview["Experience summary"] || '',
        professionalDevelopmentRating: rawReview["Professional Development Rating"] || 0,
        futureProspectsRating: rawReview["Future Prospects Rating"] || 0,
        recommendToAFriend: rawReview["How likely is it that you would recommend this scheme to a friend?"] || '-',
        isProgramLive: rawReview["Program live?"] === 'Yes' ? true : false,
        applicationProcessRating: rawReview["Application Process"] || 0,
    }
}