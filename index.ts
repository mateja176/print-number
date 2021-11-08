const zeroToNine = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};
const tenToNineteen = {
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
};
const tens = {
  2: 'twenty',
  3: 'thirty',
  4: 'forty',
  5: 'fifty',
  6: 'sixty',
  7: 'seventy',
  8: 'eighty',
  9: 'ninety',
};
const hundred = 'hundred';

const format = (ns: number[]) => ns.join(' ').trim();

const f = (n: number): string => {
  return (
    zeroToNine[n] ??
    tenToNineteen[n] ??
    (() => {
      const stringified = n.toString();
      const threeDigitMatch = stringified.match(/(\d)(\d)(\d)/);
      if (threeDigitMatch) {
        const [, first, second, third] = threeDigitMatch;
        return format([
          zeroToNine[first],
          hundred,
          f(parseInt(stringified.slice(1), 10)),
        ]);
      }
      const twoDigitMatch = stringified.match(/(\d)(\d)/);
      if (twoDigitMatch) {
        const [, first, second] = twoDigitMatch;
        return format([
          tens[first],
          second === (0).toString() ? '' : zeroToNine[second],
        ]);
      }

      return '';
    })()
  );
};

console.assert(f(1) === 'one');
console.assert(f(9) === 'nine');
console.assert(f(10) === 'ten');
console.assert(f(19) === 'nineteen');

console.assert(f(20) === 'twenty');
console.assert(f(21) === 'twenty one');
console.assert(f(29) === 'twenty nine');
console.assert(f(99) === 'ninety nine');
console.assert(f(42) === 'forty two');
// console.assert(f(100) === 'hundred');
console.assert(f(121) === 'one hundred twenty one');
console.assert(f(221) === 'two hundred twenty one');
console.assert(f(201) === 'two hundred one');
console.log(f(300));
// console.assert(f(300) === 'three hundred');
