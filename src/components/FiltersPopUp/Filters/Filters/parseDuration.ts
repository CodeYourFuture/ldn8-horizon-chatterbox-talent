export const parseDuration = (input: string) => {
  if (input === 'NA') {
    return 'NA';
  }

  if (input === '') {
    return 'NA';
  }

  function numberParse(el: string) {
    //extracts numbers
    let numberPattern = /\d+/g;
    const array: any = el.match(numberPattern);
    let twoSum = array.reduce((a: string, b: string) => parseInt(a) + parseInt(b));
    return twoSum / array.length;
  }

  function wordParse(el: any) {
    let wordPattern = /[a-z]+($|\s+)/gi;

    if (Array.isArray(el)) {
      return el.map(x => x.match(wordPattern));
    } else {
      return el.match(wordPattern);
    }
  }

  let word = wordParse(input).toString();
  let number = numberParse(input);

  if (word === 'month' || word === 'months') return number * 30;
  if (word === 'week' || word === 'weeks') return number * 7;
  if (word === 'day' || word === 'days') return number * 1;
  if (word === 'year' || word === 'years') return number * 365;
};
