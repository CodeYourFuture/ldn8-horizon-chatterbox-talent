import { ReviewInterface } from "./Reducer";

export const splitStringIntoSeparatedPhrases = (str: string | undefined, delimiter: string | RegExp) => {
    if (!str) return [];
    return str.split(delimiter).map( wrd => wrd.trim()).filter(str => str);
}

export const calculateAverage = (attr: (keyof ReviewInterface), data: ReviewInterface[]) => {
    const sum = data.reduce((acc, cv) => {
        if (!Number(cv[attr])) return acc;
        return acc + Number(cv[attr]);
    }, 0);

    return sum/(data.length);
};