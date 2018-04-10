// @flow
import React, { Component } from 'react';
import {
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Content,
  Spinner,
  Fab,
  IconNB,
} from 'native-base';
import { View, AsyncStorage, Share } from 'react-native';

import getBook from './bibleJson';
import styles from './styles';
import ReadingTools from './ReadingTools';

const FOOTER_HEIGHT_IN_AUDIO_PLAY_MODE = 110;
const FOOTER_HEIGHT = 80;
const HEADER_HEIGHT = 80;
const LAST_BOOK_INDEX_OF_THE_BIBLE = 66;
const LAST_CHAPTER_OF_LAST_BOOK = 22;
const LAST_BOOK_OF_OLD_TESTAMENT = 39;
const FIRST_BOOK_OF_NEW_TESTAMENT = 40;

class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: [],
      currentChapter: [],
      chapter: 1,
      bookIndex: 0,
      ready: false,
      previousBookLength: 1,
      footerHeight: FOOTER_HEIGHT,
      selectedVerses: [],
      fontSize: 14,
      scheme: 'light',
    };
    this.goForward = this.goForward.bind(this);
    this.goNext = this.goNext.bind(this);
    this.selectVerse = this.selectVerse.bind(this);
    this.shareTheVerses = this.shareTheVerses.bind(this);
    this.getVerseById = this.getVerseById.bind(this);
    this.setFooterHeight = this.setFooterHeight.bind(this);
  }

  componentWillMount() {
    this.setSettingFromStorage();
    const navigation = this.props.navigation.state.params;
    this.setBook(navigation);
  }

  async setSettingFromStorage() {
    AsyncStorage.getItem('@DPMArmenia:fontSize').then((value) => {
      if (value !== null) {
        this.setState({
          fontSize: parseInt(value),
        });
      }
    });
    AsyncStorage.getItem('@DPMArmenia:scheme').then((value) => {
      if (value !== null) {
        this.setState({
          scheme: value,
        });
      }
    });
  }

  setBook(navigation) {
    const currentBook = getBook(navigation.bookIndex);
    const currentChapter = currentBook.Chapters[navigation.chapter - 1];
    this.setState({
      currentChapter,
      currentBook,
      previousBookLength: this.getpreviousBookLength(navigation),
      ready: true,
      bookIndex: navigation.bookIndex,
      chapter: navigation.chapter,
    });
  }
  setFooterHeight(isAudioPlaying) {
    if (isAudioPlaying) return;

    this.setState({
      footerHeight: isAudioPlaying ? FOOTER_HEIGHT_IN_AUDIO_PLAY_MODE : FOOTER_HEIGHT,
    });
  }
  getChapter(book, chapter) {
    // chapter -1 because if we need chapter 1 then the index is 0
    const thisBook = getBook(book);
    return thisBook.Chapters[chapter - 1];
  }

  getpreviousBookLength(navigation) {
    if (navigation.bookIndex < 1) return false;
    return getBook(navigation.bookIndex - 1).Chapters.length;
  }

  getChapterTitle() {
    return `${this.state.currentBook.Name} ${this.state.currentChapter.Number}`;
  }
  getAllSelectedVersesNumber() {
    const selectedVerses = this.state.selectedVerses;
    return `${this.getVerseById(selectedVerses[0]).verse.Number}-
      ${this.getVerseById(selectedVerses[selectedVerses.length - 1]).verse.Number}`;
  }
  getAllSelectedVerses() {
    let verses = '';
    const selectedVerses = this.state.selectedVerses;
    verses += selectedVerses.map(verse => `
    ${this.getVerseById(verse).verse.Number} 
    ${this.getVerseById(verse).verse.Content}`);

    return verses;
  }

  getVerseName(verse) {
    const currentChapter = this.state.currentChapter;
    return `${this.getChapterTitle()}-${currentChapter.Verses[verse].Number}`;
  }
  getVerseById(id) {
    const idArr = id.split(/(\d+)/);
    let verse = [];

    verse = idArr.filter(index => idArr.indexOf(index) % 2 === 1);
    verse = verse.map(index => parseInt(index - 1));
    const currentChapter = this.state.currentChapter;
    return {
      verse: currentChapter.Verses[verse[4]],
      chapterName: this.getChapterTitle(),
      verseName: this.getVerseName(verse[4]),
    };
  }

  goForward() {
    if (this.state.chapter > 1) {
      this.setBook({
        bookIndex: this.state.bookIndex,
        chapter: this.state.chapter - 1,
      });
    } else if (this.state.chapter === 1 && this.state.bookIndex !== FIRST_BOOK_OF_NEW_TESTAMENT) {
      this.setBook({
        bookIndex: this.state.bookIndex - 1,
        chapter: this.state.previousBookLength,
      });
    } else if (this.state.bookIndex === FIRST_BOOK_OF_NEW_TESTAMENT) {
      this.setBook({
        chapter: 1,
        bookIndex: LAST_BOOK_OF_OLD_TESTAMENT,
      });
    }
  }


  goNext() {
    if (this.state.chapter < this.state.currentBook.Chapters.length) {
      this.setBook({
        bookIndex: this.state.bookIndex,
        chapter: this.state.chapter + 1,
      });
    } else if (!this.isLastBookAndLastChapter()) {
      this.setBook({
        bookIndex: this.state.bookIndex + 1,
        chapter: 1,
      });
    } else if (this.state.bookIndex === LAST_BOOK_OF_OLD_TESTAMENT) {
      // navigate to first chapter of new testament
      this.setBook({
        chapter: 1,
        bookIndex: 40,
      });
    }
  }

  isLastBookAndLastChapter() {
    return this.state.bookIndex === LAST_BOOK_INDEX_OF_THE_BIBLE
    && this.state.chapter === LAST_CHAPTER_OF_LAST_BOOK;
  }

  selectVerse(verse) {
    if (this.state.selectedVerses.includes(verse)) {
      const index = this.state.selectedVerses.indexOf(verse);
      const selectedVerses = this.state.selectedVerses;
      selectedVerses.splice(index, 1);
      this.setState({
        selectedVerses,
      });
    } else {
      const selectedVerses = this.state.selectedVerses;
      selectedVerses.push(verse);

      this.setState({
        selectedVerses,
      });
    }
  }

  shareTheVerses() {
    const selectedVerses = this.state.selectedVerses;

    if (selectedVerses.length === 1) {
      const title = this.getVerseById(selectedVerses[0]).verseName;
      const verses = this.getVerseById(selectedVerses[0]).verse.Content;

      Share.share({
        title,
        message: `${title} \n${verses}`,
        subject: title, //  for email
      });
    } else {
      const title = this.getChapterTitle();
      const getAllSelectedVerses = this.getAllSelectedVerses();
      const getAllSelectedVersesNumber = this.getAllSelectedVersesNumber();

      Share.share({
        title: `${title}:${getAllSelectedVersesNumber}`, // Ծննդոց 4:3-5
        message: `${title}:${getAllSelectedVersesNumber} \n${getAllSelectedVerses}`,
        subject: title, //  for email
      });
    }
  }

  render() {
    const color = this.state.scheme === 'light' ? '#000' : '#fff';
    const backgroundColor = this.state.scheme === 'light' ? '#328FBC' : '#000';
    const contentBgColor = this.state.scheme === 'light' ? '#fafafa' : '#000';

    return (
      <View style={{ flex: 1 }}>
        {!this.state.ready ? (
          <View style={styles.spinerCont}>
            <Spinner color="#328FBC" />
          </View>
        ) : (
          <Content
            style={[styles.readingContent, { backgroundColor: contentBgColor }]}
            padder
          >
            <View style={[{ marginTop: HEADER_HEIGHT }]} />
            <Text
              style={[
                styles.chDesc,
                { fontSize: this.state.fontSize - 2, color },
              ]}
            >
              {this.state.currentChapter.Description}
            </Text>
            <Text
              style={[
                styles.readingTexts,
                { color, fontSize: this.state.fontSize },
              ]}
            >
              {this.state.currentChapter.Verses.map((verse, key) => (
                <Text
                  style={{
                      color,
                      fontSize: this.state.fontSize - 4,
                      backgroundColor:
                        this.state.selectedVerses[
                          this.state.selectedVerses.indexOf(verse.ID)
                        ] === verse.ID
                          ? '#cee7f4'
                          : 'transparent',
                    }}
                  onPress={() => this.selectVerse(verse.ID)}
                  key={key}
                >
                  <Text
                    style={[
                        styles.verseNum,
                        { color, fontSize: this.state.fontSize - 4 },
                      ]}
                  >
                    {verse.Number}
                  </Text>
                  <Text
                    style={[
                        styles.verse,
                        { color, fontSize: this.state.fontSize },
                      ]}
                  >
                    {verse.Content}
                  </Text>
                </Text>
                ))}
            </Text>
            <View
              style={[{ marginBottom: this.state.footerHeight }]}
            />
          </Content>
        )}
        <View
          style={[
            styles.headerAnim,
            { backgroundColor },
          ]}
        >
          <View
            style={[styles.headerContent]}
          >
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon style={styles.whiteIcon} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              {this.state.ready && (
                <Title style={styles.title}>
                  {`${this.state.currentBook.Name
                    } ${
                    this.state.currentChapter.Number}`}
                </Title>
              )}
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('BibleSearch')}
              >
                <Icon style={styles.whiteIcon} name="md-search" />
              </Button>
            </Right>
          </View>
        </View>

        <View
          style={[
            styles.footerAnim,
            {
              height: this.state.footerHeight,
              backgroundColor,
            },
          ]}
        >
          <ReadingTools
            setFooterHeight={this.setFooterHeight}
            goForward={this.goForward}
            goNext={this.goNext}
            book={this.state.bookIndex}
            chapter={this.state.chapter}
            bookIndex={this.state.bookIndex}
            {...this.props}
          />
        </View>
        {this.state.selectedVerses.length > 0 && (
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#1879ae' }}
            position="bottomRight"
            onPress={this.shareTheVerses}
          >
            <IconNB name="md-share" />
          </Fab>
        )}
      </View>
    );
  }
}

export default Reading;
