import { prepositions } from '../prepositions';
import { allNouns, basicAdjectives, to, všechno } from '../index';
import { cartesian } from '../../utilities';

import {
  declensionList,
  genderList,
  getItem,
  declensionToNumber,
  getPrepositions,
} from './tools';

import {
  nounDeclension,
  declension,
  declensionArray,
  declensionName,
  preposition,
  gender,
} from '../../types';

let [první, malý] = basicAdjectives;

let onlyUseDefault = false;

export function generateSentences(declensions, settings) {
  let res: Array<comboType> = [];

  for (let dec of declensionList) {
    if (declensions[dec]) {
      let declensionNumber = declensionToNumber(dec);

      let possiblePreps = getPrepositions(dec, onlyUseDefault);
      let combos: comboType = cartesian([
        possiblePreps,
        [to],
        basicAdjectives,
        allNouns,
        [true, false],
        [declensionNumber],
      ]);

      res = res.concat(combos);
    }
  }

  let newRes = res.map(function (sent) {
    let englishSentence = '';
    let langSentence = '';

    let caseNumber = sent[5];
    let gender = sent[3].gender;
    let plural = sent[4];

    if (sent[0] !== '') {
      englishSentence += sent[0].english + ' ';
      langSentence += sent[0].preposition + ' ';
    }

    englishSentence += english(sent[1]) + ' ';

    langSentence +=
      getItem(sent[1].caseArray, {
        caseNumber: caseNumber,
        gender: gender,
        plural: plural,
      }) + ' ';

    englishSentence += english(sent[2]) + ' ';

    langSentence +=
      getItem(sent[2].caseArray, {
        caseNumber: caseNumber,
        gender: gender,
        plural: plural,
      }) + ' ';

    englishSentence += english(sent[3]);

    langSentence += getItem(sent[3].caseArray, {
      caseNumber: caseNumber,
      gender: gender,
      plural: plural,
    });

    if (caseNumber === 5) {
      englishSentence += '!';
    }

    return [englishSentence, langSentence];
  });

  return newRes;
}
