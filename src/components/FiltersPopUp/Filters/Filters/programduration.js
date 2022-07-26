import { parseDuration } from './parseDuration';

export const programDuration = (data, programDuration) => {
  if (programDuration.length === 0 && data.length > 0) return data;
  return data.reduce((acc, item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    programDuration.map(carrier => {
      if (
        parseDuration(item.programDuration) > 0 &&
        parseDuration(item.programDuration) < 90 &&
        carrier === '0 - 3 months'
      ) {
        acc.push(item);
      } else if (
        parseDuration(item.programDuration) >= 90 &&
        parseDuration(item.programDuration) < 180 &&
        carrier === '3 - 6 months'
      ) {
        acc.push(item);
      } else if (
        parseDuration(item.programDuration) >= 180 &&
        parseDuration(item.programDuration) < 365 &&
        carrier === '6 - 12 months'
      ) {
        acc.push(item);
      } else if (
        parseDuration(item.programDuration) >= 365 &&
        parseDuration(item.programDuration) < 1095 &&
        carrier === '1 - 3 years'
      ) {
        acc.push(item);
      } else if (parseDuration(item.programDuration) >= 1095 && carrier === '3 years +') {
        acc.push(item);
      } else if (parseDuration(item.programDuration) === 'NA' && carrier === 'Other') {
        acc.push(item);
      } else {
        return null;
      }
    });

    return acc;
  }, []);
};
