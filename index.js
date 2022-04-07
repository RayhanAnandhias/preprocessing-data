const FileSystem = require('fs');
const lineByLine = require('n-readlines');
const liner = new lineByLine('./data-soal/Psychology.txt');

let line;
let idQuestion = 0;
let arrQuestion = [];
let objQuestion;

while ((line = liner.next())) {
  let lineString = line.toString('utf-8').trim();
  let firstChar = lineString.charAt(0);
  if (firstChar !== '0' && firstChar !== '1' && firstChar !== '') {
    idQuestion++;
    objQuestion = {
      id: idQuestion,
      question: lineString,
      option: [],
      answer: null
    };
    arrQuestion.push(objQuestion);
  }
  if (firstChar === '0' || firstChar === '1') {
    lineString = lineString.slice(2);
    arrQuestion[idQuestion - 1].option.push(lineString);
    if (firstChar === '1') {
      arrQuestion[idQuestion - 1].answer =
        arrQuestion[idQuestion - 1].option.length - 1;
    }
  }
}

FileSystem.writeFile(
  './data-soal/Psychology-fix.json',
  JSON.stringify(arrQuestion),
  (err) => {
    if (err) throw err;
  }
);
