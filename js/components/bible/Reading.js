import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text,
    Content,
    Tabs,
    Tab,
    List,
    ListItem,
    Spinner,
    Fab,
    IconNB
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Constants } from 'expo';
import {
    Animated,
    View,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native'
import Share, {ShareSheet} from 'react-native-share';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styles from "./styles";
import ReadingTools from './ReadingTools';

import bJson from './bibleJson';
class Reading extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentBook : [],
            previousBook : [],
            nextBook : [],
            currentChapter : [],
            book: 0,
            chapter: 1,
            testament: 0,
            bookIndex: 0,
            ready : false,
            previousBookLength : 1,
            nextBookLength : 1,
            footerHeightNum : 80,
            height: new Animated.Value(80), // The header height
            footerHeight: new Animated.Value(80), // The header height
            opacity : new Animated.Value(1),
            visible: true, // Is the header currently visible
            selected : [],
            isPlaying : false,
            fontSize: 14,
            scheme: 'light'

        };
        this.goForward = this.goForward.bind(this);
        this.goNext = this.goNext.bind(this);
        this.findBookFromState = this.findBookFromState.bind(this);
        this.selectVerse = this.selectVerse.bind(this);
        this.shareTheVerses = this.shareTheVerses.bind(this);
        this.findVerseById = this.findVerseById.bind(this);
        this.changeFooterHeight = this.changeFooterHeight.bind(this);

        this.slideDuration = 400;
        this.offset = 0;

    }

    componentWillMount() {
        this.setState({ready:false});
        const {navigation: {state: {params}}} = this.props;
        this.setState(params,  ()=> this.findBookFromState());
        this.getSetting();
    }



    async getSetting(){
         AsyncStorage.getItem('@DPMArmenia:fontSize').then((value) => {
             if(value !== null){
                 this.setState({
                     fontSize: parseInt(value)
                 });
                 console.log(value);
             }

         });
        AsyncStorage.getItem('@DPMArmenia:scheme').then((value) => {
            if(value !== null){
                this.setState({
                    scheme: value
                });
                console.log(value);
            }
        });

     }


    changeFooterHeight(e){
        if(this.state.isPlaying && e)
            return;

        this.setState({
            footerHeightNum : e ? 110 : 80,
            footerHeight : e ? new Animated.Value(110) : new Animated.Value(80),
            isPlaying: e
        });
    }

    _onScroll(event) {
        return;
        const currentOffset = event.nativeEvent.contentOffset.y;
        // Ignore scroll events outside the scrollview
        if (currentOffset < 0 || currentOffset > (event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height)) {
            return
        }

        if ((this.state.visible && currentOffset > this.offset) ||
            (!this.state.visible && currentOffset < this.offset)) {
            this._toggleHeader()
        }

        this.offset = currentOffset
    }

    _toggleHeader() {
        Animated.timing(this.state.height, {
            duration: this.slideDuration,
            toValue: this.state.visible ? (isIphoneX() ? 50 : 20) : 80,
        }).start();

        Animated.timing(this.state.opacity, {
            duration: this.slideDuration,
            toValue: this.state.visible ? 0 : 1,
        }).start();

        Animated.timing(this.state.footerHeight, {
            duration: this.slideDuration,
            toValue: this.state.visible ? 0 : this.state.footerHeightNum,
        }).start();

        this.setState({visible: !this.state.visible});
    }


    findBookFromState(){
         const bookIndex = this.state.bookIndex;
         const book = bJson.Testaments[this.state.testament].Books.filter(function (book, ) {
             if (book.Number === bookIndex) {
                 return book;
             }

         });
         this.setState({
            currentChapter : book[0].Chapters[this.state.chapter-1],
            currentBook : book[0],
            previousBookLength : (bJson.Testaments[this.state.testament].Books[this.state.book-2] ? bJson.Testaments[this.state.testament].Books[this.state.book-2].Chapters.length : false ),
            nextBookLength : (bJson.Testaments[this.state.testament].Books[this.state.book] ? bJson.Testaments[this.state.testament].Books[this.state.book].Chapters.length : false),
            ready :true
         });



     }

    goForward() {
        if(this.state.chapter > 1) {
            this.setState({
                chapter : this.state.chapter -1
            },() => this.findBookFromState());
        }
        else {
            if(!(this.state.book === 1 && this.state.chapter === 1) && this.state.bookIndex !==40 ){
                this.setState({
                    bookIndex : this.state.bookIndex -1,
                    chapter: this.state.previousBookLength
                },() => this.findBookFromState());
            }
            else if(this.state.bookIndex === 40){
                this.setState({
                    testament: 0,
                    book: 39,
                    chapter: 1,
                    bookIndex: 39
                },()=> this.findBookFromState());
            }
        }

    }

    goNext() {
        if(this.state.chapter < this.state.currentBook.Chapters.length) {
            this.setState({
                chapter : this.state.chapter +1
            },() => this.findBookFromState());
        }
        else {
            if(!(this.state.bookIndex === 66 && this.state.chapter === 22) && this.state.bookIndex !==39){
                this.setState({
                    bookIndex : this.state.bookIndex +1,
                    chapter: 1
                },() => this.findBookFromState());
            }
            else if(this.state.bookIndex === 39){
                // Մաղաքիա
                // navigate to first chapter of new testament
                this.setState({
                    testament: 1,
                    book: 1,
                    chapter: 1,
                    bookIndex: 40
                },()=> this.findBookFromState());
            }

        }
    }


    selectVerse(verse){

        if(this.state.selected.indexOf(verse) > -1){
            let index  = this.state.selected.indexOf(verse);
            let selected =  this.state.selected;
                selected.splice(index, 1);
            this.setState({
                selected : selected
            });
            return;
        }

        let selected =  this.state.selected;
        selected.push(verse);

        this.setState({
            selected: selected
        });

    }
    shareTheVerses(){
        let title = this.state.currentBook.Name + " " + this.state.currentChapter.Number;
        let verses = '';
        let selected =  this.state.selected;



        if(selected.length === 1){
            title = this.findVerseById(selected[0]).verseName;
            verses = this.findVerseById(selected[0]).verse.Content;

            Share.open({
                title: title,
                message: title + ' \n' + verses,
                subject: title //  for email
            });

            return;
        }

        selected.forEach((e)=>{
            verses += this.findVerseById(e).verse.Number + ' ' + this.findVerseById(e).verse.Content;
        });

        let firstToLast = this.findVerseById(selected[0]).verse.Number + '-' + this.findVerseById(selected[selected.length-1]).verse.Number; //
        Share.open({
            title: title + ':' + firstToLast, // Ծննդոց 4:3-5
            message: title + ':' + firstToLast +' \n' + verses,
            subject: title //  for email
        });
    }

    findVerseById(id){
        const Id = id.split(/(\d+)/);
        let verse = [];
        for(let i = 1; i<Id.length; i+=2){
            verse.push(parseInt(Id[i])-1);
        }
        // issue comes becouse in testament two index started at 40 not at 1
        if(verse[1]===1){
            return {
                verse : bJson.Testaments[verse[1]].Books[verse[2]-39].Chapters[verse[3]].Verses[verse[4]],
                chapterName : bJson.Testaments[verse[1]].Books[verse[2]-39].Name + ' ' + bJson.Testaments[verse[1]].Books[verse[2]-39].Chapters[verse[3]].Number,
                verseName : bJson.Testaments[verse[1]].Books[verse[2]-39].Name + ' ' + bJson.Testaments[verse[1]].Books[verse[2]-39].Chapters[verse[3]].Number + ':' + bJson.Testaments[verse[1]].Books[verse[2]-39].Chapters[verse[3]].Verses[verse[4]].Number,
            };
        }
        else {
            return {
                verse : bJson.Testaments[verse[1]].Books[verse[2]].Chapters[verse[3]].Verses[verse[4]],
                chapterName : bJson.Testaments[verse[1]].Books[verse[2]].Name + ' ' + bJson.Testaments[verse[1]].Books[verse[2]].Chapters[verse[3]].Number,
                verseName : bJson.Testaments[verse[1]].Books[verse[2]].Name + ' ' + bJson.Testaments[verse[1]].Books[verse[2]].Chapters[verse[3]].Number + ':' + bJson.Testaments[verse[1]].Books[verse[2]].Chapters[verse[3]].Verses[verse[4]].Number,
            };
        }

    }


    render() {
        return (
            <View style={{flex:1, backgroundColor: '#328FBC'}}>
                        {!this.state.ready ?
                            <View style={styles.spinerCont}>
                                <Spinner color='#328FBC' />
                            </View>
                            :
                            <Content onScroll={this._onScroll.bind(this)} ref='_scrollView' style={[styles.readingContent, {backgroundColor: (this.state.scheme === 'light' ? '#fafafa' : '#000')}]} padder>
                                <Animated.View style={[{ marginTop: this.state.height }]}/>
                                <Text style={[styles.chDesc, {fontSize:(this.state.fontSize-2), color: (this.state.scheme === 'light' ? '#000' : '#fff')}]}>{this.state.currentChapter.Description }</Text>
                                <Text style={styles.readingTexts}>

                                    {this.state.currentChapter.Verses.map((verse, key) => {
                                        return (
                                            <Text style={{backgroundColor:this.state.selected[this.state.selected.indexOf(verse.ID)] === verse.ID ? '#cee7f4': 'transparent'}} onPress={()=> this.selectVerse(verse.ID)} key={key}>
                                                <Text style={[styles.verseNum, {fontSize:(this.state.fontSize-4), color: (this.state.scheme === 'light' ? '#000' : '#fff')}]}>{verse.Number}</Text>
                                                <Text style={[styles.verse, {fontSize:(this.state.fontSize), color: (this.state.scheme === 'light' ? '#000' : '#fff')}]}>{verse.Content}</Text>
                                            </Text>
                                        );
                                    })}

                                </Text>
                                <Animated.View style={[{ marginBottom: this.state.footerHeight }]}/>
                            </Content>
                        }
                    <Animated.View style={[styles.headerAnim, { height: this.state.height, backgroundColor: (this.state.scheme === 'light' ? '#328FBC' : '#000') }]}>
                        <Animated.View style={[styles.headerContent, { opacity: this.state.opacity }]}>
                            <Left>
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.goBack()}
                                >
                                    <Icon style={styles.whiteIcon} name="arrow-back" />
                                </Button>
                            </Left>
                            <Body>
                            {this.state.ready &&
                            <Title
                                style={styles.title}>{this.state.currentBook.Name + " " + this.state.currentChapter.Number}</Title>
                            }</Body>
                            <Right>
                                <Button
                                    transparent
                                    onPress={() => this.props.navigation.navigate("BibleSearch")}>
                                    <Icon style={styles.whiteIcon} name="md-search" />
                                </Button>
                            </Right>
                        </Animated.View>
                    </Animated.View>

                <Animated.View style={[styles.footerAnim, { height: this.state.footerHeight, backgroundColor: (this.state.scheme === 'light' ? '#328FBC' : '#000') }]}>
                    <ReadingTools ref="_ReadingTools" changeFooterHeight={this.changeFooterHeight} goForward={this.goForward} goNext={this.goNext} book={this.state.bookIndex} chapter={this.state.chapter} bookIndex={this.state.bookIndex} {...this.props} />
                </Animated.View>
                {this.state.selected.length > 0 &&
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#1879ae"}}
                    position="bottomRight"
                    onPress={this.shareTheVerses}>
                    <IconNB name="md-share" />
                </Fab>
                }

            </View>

        );
    }

}

export default Reading;
