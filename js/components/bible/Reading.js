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
import {
  getpreviousBookLength,
  getChapterTitle,
  getAllSelectedVersesNumber,
  getAllSelectedVerses,
  getVerseById,
} from './BibleFunctions';

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
      previousBookLength: getpreviousBookLength(navigation),
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
      const Verse = getVerseById(selectedVerses[0], this.state);
      const title = Verse.verseName;
      const verses = Verse.verse.Content;

      Share.share({
        title,
        message: `${title} \n${verses}`,
        subject: title, //  for email
      });
    } else {
      const title = getChapterTitle(this.state);
      const allSelectedVerses = getAllSelectedVerses(this.state);
      const allSelectedVersesNumber = getAllSelectedVersesNumber(this.state);

      Share.share({
        title: `${title}:${allSelectedVersesNumber}`, // Ծննդոց 4:3-5
        message: `${title}:${allSelectedVersesNumber} \n${allSelectedVerses}`,
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
