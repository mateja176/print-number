const zero = 'zero';

const oneToNine = {
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

const separators = [
  '',
  'thousand',
  'million',
  'billion',
  'trillion',
  'quadrillion',
  'quintillion',
  'sextillion',
  'septillion',
  'octillion',
  'nonillion',
  'decillion',
];

const join = (ns: (number | string)[]) => ns.join(' ').trim();

const printNumber = (n: number): string => {
  const serialized = n.toString();
  if (serialized.length === 1) {
    if (n === 0) {
      return zero;
    } else {
      return oneToNine[n];
    }
  } else if (serialized.length === 2) {
    if (tenToNineteen[n]) {
      return tenToNineteen[n];
    } else {
      const [first, second] = serialized;
      return join([tens[first], oneToNine[second] ?? '']);
    }
  } else if (serialized.length <= 3) {
    const [head, ...tail] = serialized.split('');

    const parsedTail = parseInt(tail.join(''), 10);

    return join([
      oneToNine[head],
      hundred,
      parsedTail === 0 ? '' : printNumber(parsedTail),
    ]);
  } else {
    return serialized
      .split('')
      .reverse()
      .reduce((result, _, i, a) => {
        const separator = separators[Math.floor(i / 3)];
        if ((i + 1) % 3 === 0 || i + 1 === a.length) {
          const parsed = parseInt(
            a
              .slice(i - (i % 3), i + 1)
              .reverse()
              .join(''),
            10,
          );
          return parsed === 0
            ? result
            : join([printNumber(parsed), separator, result]);
        } else {
          return result;
        }
      }, '');
  }
};

console.assert(printNumber(0) === 'zero');
console.assert(printNumber(0) === 'zero');
console.assert(printNumber(1) === 'one');
console.assert(printNumber(9) === 'nine');
console.assert(printNumber(10) === 'ten');
console.assert(printNumber(19) === 'nineteen');

console.assert(printNumber(20) === 'twenty');
console.assert(printNumber(21) === 'twenty one');
console.assert(printNumber(29) === 'twenty nine');
console.assert(printNumber(99) === 'ninety nine');
console.assert(printNumber(42) === 'forty two');
console.assert(printNumber(100) === 'one hundred');
console.assert(printNumber(121) === 'one hundred twenty one');
console.assert(printNumber(221) === 'two hundred twenty one');
console.assert(printNumber(201) === 'two hundred one');
console.assert(printNumber(222) === 'two hundred twenty two');
console.assert(printNumber(300) === 'three hundred');
console.assert(printNumber(999) === 'nine hundred ninety nine');
console.assert(printNumber(1000) === 'one thousand');
console.assert(printNumber(2222) === 'two thousand two hundred twenty two');
console.assert(printNumber(3001) === 'three thousand one');
console.assert(printNumber(10001) === 'ten thousand one');
console.assert(printNumber(20001) === 'twenty thousand one');
console.assert(printNumber(21001) === 'twenty one thousand one');
console.assert(
  printNumber(999_999) ===
    'nine hundred ninety nine thousand nine hundred ninety nine',
);
console.assert(
  printNumber(9_999_999) ===
    'nine million nine hundred ninety nine thousand nine hundred ninety nine',
);
console.assert(
  printNumber(99_999_999) ===
    'ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
);
console.assert(
  printNumber(9_999_999_999) ===
    'nine billion nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine',
);
console.assert(printNumber(1_000_000_000_000) === 'one trillion');
console.assert(
  printNumber(1_234_567_890) ===
    'one billion two hundred thirty four million five hundred sixty seven thousand eight hundred ninety',
);
