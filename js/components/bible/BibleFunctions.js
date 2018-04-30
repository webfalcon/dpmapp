import getBook from './bibleJson';

export function getpreviousBookLength(navigation) {
  if (navigation.bookIndex < 1) return false;
  return getBook(navigation.bookIndex - 1).Chapters.length;
}

export function getChapterTitle(State) {
  return `${State.currentBook.Name} ${State.currentChapter.Number}`;
}

export function getAllSelectedVersesNumber(State) {
  const selectedVerses = State.selectedVerses;
  return `${this.getVerseById(selectedVerses[0]).verse.Number}-
      ${this.getVerseById(selectedVerses[selectedVerses.length - 1]).verse.Number}`;
}
export function getAllSelectedVerses(State) {
  let verses = '';
  const selectedVerses = State.selectedVerses;
  verses += selectedVerses.map(verse => `
    ${this.getVerseById(verse).verse.Number} 
    ${this.getVerseById(verse).verse.Content}`);

  return verses;
}

export function getVerseName(verse, State) {
  return `${getChapterTitle(State)}-${State.currentChapter.Verses[verse].Number}`;
}

export function getVerseById(id, State) {
  const idArr = id.split(/(\d+)/);
  const verse = [];

  // verse = idArr.filter(index => idArr.indexOf(index) % 2 === 1);

  idArr.map((index) => {
    if (idArr.indexOf(index) % 2 === 1) {
      verse.push(parseInt(index - 1));
    }
    return false;
  });

  const currentChapter = State.currentChapter;
  return {
    verse: currentChapter.Verses[verse[4]],
    chapterName: getChapterTitle(State),
    verseName: getVerseName(verse[4], State),
  };
}

