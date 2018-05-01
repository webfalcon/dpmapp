import getBook from './bibleJson';

export function getpreviousBookLength(navigation) {
  if (navigation.bookIndex < 1) return false;
  return getBook(navigation.bookIndex - 1).Chapters.length;
}

export function getChapterTitle(State) {
  return `${State.currentBook.Name} ${State.currentChapter.Number}`;
}

export function getVerseName(verse, State) {
  return `${getChapterTitle(State)}-${State.currentChapter.Verses[verse].Number}`;
}

export function getVerseById(id, State) {
  const idArr = id.split(/(\d+)/);

  const verse = idArr.filter(index => idArr.indexOf(index) % 2 === 1)
    .map(index => parseInt(index - 1));

  console.log(verse);
  const currentChapter = State.currentChapter;
  return {
    verse: currentChapter.Verses[verse[4]],
    chapterName: getChapterTitle(State),
    verseName: getVerseName(verse[4], State),
  };
}

export function getAllSelectedVersesNumber(State) {
  const selectedVerses = State.selectedVerses;
  return `${getVerseById(selectedVerses[0]).verse.Number}-
      ${getVerseById(selectedVerses[selectedVerses.length - 1]).verse.Number}`;
}
export function getAllSelectedVerses(State) {
  let verses = '';
  const selectedVerses = State.selectedVerses;
  verses += selectedVerses.map(verse => `
    ${getVerseById(verse).verse.Number} 
    ${getVerseById(verse).verse.Content}`);

  return verses;
}
