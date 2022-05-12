export const splitStringIntoSeparatedPhrases = (str: string | undefined, delimiter: string | RegExp) => {
    if (!str) return [];
    return str.split(delimiter).map( wrd => wrd.trim()).filter(str => str);
}