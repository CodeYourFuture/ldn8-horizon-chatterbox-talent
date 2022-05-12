import { ProgramInterface } from "./Reducer";

export interface RawProgramInterface {
    "Actively hiring?"?: boolean;
    "Career type"?: string[];
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
        activelyHiring: rawData["Actively hiring?"] || false,
        careerType: rawData["Career type"] || [],
        description: rawData["Description"] || '',
        keyFacts: rawData["Key Facts"] || '',
        liveOnSite: rawData["Live on site ?"] || false,
        locations: rawData["Location(s)"] || [],
        logo: rawData["Logo"] || [],
        onSite: rawData["On-site / Remote"] || '',
        programName: rawData["Program Name"] || '',
        programDuration: rawData["Program duration"] || '',
        reviews: rawData["Reviews"] || [],
        stepsToApply: rawData["Steps to apply"] || '',
        website: rawData["Website link - more information"] || '',
    };
};