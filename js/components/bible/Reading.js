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

class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBook: [],
      currentChapter: [],
      book: 0,
      chapter: 1,
      currentBookIndex: 0,
      ready: false,
      previousBookLength: 1,
      footerHeight: FOOTER_HEIGHT,
      selectedVerses: [],
      isSoundPlaying: false,
      fontSize: 14,
      scheme: 'light',
    };
    this.goForward = this.goForward.bind(this);
    this.goNext = this.goNext.bind(this);
    this.findBookFromState = this.findBookFromState.bind(this);
    this.selectVerse = this.selectVerse.bind(this);
    this.shareTheVerses = this.shareTheVerses.bind(this);
    this.findVerseById = this.findVerseById.bind(this);
    this.changeFooterHeight = this.changeFooterHeight.bind(this);
  }

  componentWillMount() {
    const params = this.props;
    this.setState(params, () => this.findBookFromState());
    this.setSettingFromStorage();
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

  changeFooterHeight(isAudioPlaying) {
    if (this.state.isSoundPlaying && isAudioPlaying) return;

    this.setState({
      footerHeight: isAudioPlaying ? FOOTER_HEIGHT_IN_AUDIO_PLAY_MODE : FOOTER_HEIGHT,
      isSoundPlaying: isAudioPlaying,
    });
  }

  findBookFromState() {
    const currentBookIndex = this.state.currentBookIndex;
    const book = getBook(currentBookIndex);

    this.setState({
      currentChapter: book.Chapters[this.state.chapter - 1],
      currentBook: book,
      previousBookLength:
        currentBookIndex < 1
          ? getBook(currentBookIndex)
          : false,
      ready: true,
    });
  }

  goForward() {
    if (this.state.chapter > 1) {
      this.setState(
        {
          chapter: this.state.chapter - 1,
        },
        () => this.findBookFromState(),
      );
    } else if (
      !(this.state.book === 1 && this.state.chapter === 1) &&
        this.state.bookIndex !== 40
    ) {
      this.setState(
        {
          bookIndex: this.state.bookIndex - 1,
          chapter: this.state.previousBookLength,
        },
        () => this.findBookFromState(),
      );
    } else if (this.state.bookIndex === 40) {
      this.setState(
        {
          book: LAST_BOOK_OF_OLD_TESTAMENT,
          chapter: 1,
          bookIndex: LAST_BOOK_OF_OLD_TESTAMENT,
        },
        () => this.findBookFromState(),
      );
    }
  }

  goNext() {
    if (this.state.chapter < this.state.currentBook.Chapters.length) {
      this.setState(
        {
          chapter: this.state.chapter + 1,
        },
        () => this.findBookFromState(),
      );
    } else if (
      !(this.state.bookIndex === LAST_BOOK_INDEX_OF_THE_BIBLE && this.state.chapter === LAST_CHAPTER_OF_LAST_BOOK) &&
        this.state.bookIndex !== LAST_BOOK_OF_OLD_TESTAMENT
    ) {
      this.setState(
        {
          bookIndex: this.state.bookIndex + 1,
          chapter: 1,
        },
        () => this.findBookFromState(),
      );
    } else if (this.state.bookIndex === LAST_BOOK_OF_OLD_TESTAMENT) {
      // Մաղաքիա
      // navigate to first chapter of new testament
      this.setState(
        {
          book: 1,
          chapter: 1,
          bookIndex: 40,
        },
        () => this.findBookFromState(),
      );
    }
  }

  selectVerse(verse) {
    if (this.state.selectedVerses.indexOf(verse) > -1) {
      const index = this.state.selectedVerses.indexOf(verse);
      const selectedVerses = this.state.selectedVerses;
      selectedVerses.splice(index, 1);
      this.setState({
        selectedVerses,
      });
      return;
    }

    const selectedVerses = this.state.selectedVerses;
    selectedVerses.push(verse);

    this.setState({
      selectedVerses,
    });
  }
  shareTheVerses() {
    let title =
      `${this.state.currentBook.Name} ${this.state.currentChapter.Number}`;
    let verses = '';
    const selectedVerses = this.state.selectedVerses;

    if (selectedVerses.length === 1) {
      title = this.findVerseById(selectedVerses[0]).verseName;
      verses = this.findVerseById(selectedVerses[0]).verse.Content;

      Share.share({
        title,
        message: `${title} \n${verses}`,
        subject: title, //  for email
      });

      return;
    }

    selectedVerses.forEach((e) => {
      verses +=
        `${this.findVerseById(e).verse.Number
        } ${
          this.findVerseById(e).verse.Content}`;
    });

    const firstToLast =
      `${this.findVerseById(selectedVerses[0]).verse.Number
      }-${
        this.findVerseById(selectedVerses[selectedVerses.length - 1]).verse.Number}`; //
    Share.share({
      title: `${title}:${firstToLast}`, // Ծննդոց 4:3-5
      message: `${title}:${firstToLast} \n${verses}`,
      subject: title, //  for email
    });
  }

  findVerseById(id) {
    const Id = id.split(/(\d+)/);
    const verse = [];
    for (let i = 1; i < Id.length; i += 2) {
      verse.push(parseInt(Id[i]) - 1);
    }

    if (verse[1] === 1) {
      return {
        verse: this.state.currentBook.Chapters[verse[3]].Verses[verse[4]],
        chapterName:
          `${this.state.currentBook.Name
          } ${
            this.state.currentBook.Chapters[verse[3]].Number}`,
        verseName:
          `${this.state.currentBook.Name
          } ${
            this.state.currentBook.Chapters[verse[3]].Number
          }:${
            this.state.currentBook.Chapters[verse[3]].Verses[verse[4]].Number}`,
      };
    }
    return {
      verse: this.state.currentBook.Chapters[verse[3]].Verses[verse[4]],
      chapterName:
          `${this.state.currentBook.Name
          } ${
            this.state.currentBook.Chapters[verse[3]].Number}`,
      verseName:
          `${this.state.currentBook.Name
          } ${
            this.state.currentBook.Chapters[verse[3]].Number
          }:${
            this.state.currentBook.Chapters[verse[3]].Verses[verse[4]].Number}`,
    };
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
            ref="_scrollView"
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
            ref="_ReadingTools"
            changeFooterHeight={this.changeFooterHeight}
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
