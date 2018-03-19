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

import getBook from './bibleJson';

import { Grid, Row, Col } from "react-native-easy-grid";
import { FileSystem } from 'expo';

import {
    Animated,
    View,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native'
import { Share } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import styles from "./styles";
import ReadingTools from './ReadingTools';

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

     getJsonData(url) {
        return fetch(url)
            .then(res => res.json())
            .catch(error => console.log("error", error));
    }

    /*importBook(bookIndex){
       console.log(FileSystem.documentDirectory + '1.json');

        this.getJsonData(FileSystem.documentDirectory + '1.json').then(data => {
            console.log(data);
        });


        let book;
        switch(bookIndex) {
            case 1 :
                book = require('./bjson/1.json');
                break;

            case 2 :
                book = require('./bjson/2.json');
                break;

            case 3 :
                book = require('./bjson/3.json');
                break;

            case 4 :
                book = require('./bjson/4.json');
                break;

            case 5 :
                book = require('./bjson/5.json');
                break;

            case 6 :
                book = require('./bjson/6.json');
                break;

            case 7 :
                book = require('./bjson/7.json');
                break;

            case 8 :
                book = require('./bjson/8.json');
                break;

            case 9 :
                book = require('./bjson/9.json');
                break;

            case 10 :
                book = require('./bjson/10.json');
                break;

            case 11 :
                book = require('./bjson/11.json');
                break;

            case 12 :
                book = require('./bjson/12.json');
                break;

            case 13 :
                book = require('./bjson/13.json');
                break;

            case 14 :
                book = require('./bjson/14.json');
                break;

            case 15 :
                book = require('./bjson/15.json');
                break;

            case 16 :
                book = require('./bjson/16.json');
                break;

            case 17 :
                book = require('./bjson/17.json');
                break;

            case 18 :
                book = require('./bjson/18.json');
                break;

            case 19 :
                book = require('./bjson/19.json');
                break;

            case 20 :
                book = require('./bjson/20.json');
                break;

            case 21 :
                book = require('./bjson/21.json');
                break;

            case 22 :
                book = require('./bjson/22.json');
                break;

            case 23 :
                book = require('./bjson/23.json');
                break;

            case 24 :
                book = require('./bjson/24.json');
                break;

            case 25 :
                book = require('./bjson/25.json');
                break;

            case 26 :
                book = require('./bjson/26.json');
                break;

            case 27 :
                book = require('./bjson/27.json');
                break;
            case 28 :
                book = require('./bjson/28.json');
                break;
            case 29 :
                book = require('./bjson/29.json');
                break;
            case 30 :
                book = require('./bjson/30.json');
                break;
            case 31 :
                book = require('./bjson/31.json');
                break;
            case 32 :
                book = require('./bjson/32.json');
                break;
            case 33 :
                book = require('./bjson/33.json');
                break;
            case 34 :
                book = require('./bjson/34.json');
                break;
            case 35 :
                book = require('./bjson/35.json');
                break;
            case 36 :
                book = require('./bjson/36.json');
                break;
            case 37 :
                book = require('./bjson/37.json');
                break;
            case 38 :
                book = require('./bjson/38.json');
                break;
            case 39 :
                book = require('./bjson/39.json');
                break;
            case 40 :
                book = require('./bjson/40.json');
                break;
            case 41 :
                book = require('./bjson/41.json');
                break;
            case 42 :
                book = require('./bjson/42.json');
                break;
            case 43 :
                book = require('./bjson/43.json');
                break;
            case 44 :
                book = require('./bjson/44.json');
                break;
            case 45 :
                book = require('./bjson/45.json');
                break;
            case 46 :
                book = require('./bjson/46.json');
                break;
            case 47 :
                book = require('./bjson/47.json');
                break;
            case 48 :
                book = require('./bjson/48.json');
                break;
            case 49 :
                book = require('./bjson/49.json');
                break;
            case 50 :
                book = require('./bjson/50.json');
                break;
            case 51 :
                book = require('./bjson/51.json');
                break;
            case 52 :
                book = require('./bjson/52.json');
                break;
            case 53 :
                book = require('./bjson/53.json');
                break;
            case 54 :
                book = require('./bjson/54.json');
                break;
            case 55 :
                book = require('./bjson/55.json');
                break;
            case 56 :
                book = require('./bjson/56.json');
                break;
            case 57 :
                book = require('./bjson/57.json');
                break;
            case 58 :
                book = require('./bjson/58.json');
                break;
            case 59 :
                book = require('./bjson/59.json');
                break;
            case 60 :
                book = require('./bjson/60.json');
                break;
            case 61 :
                book = require('./bjson/61.json');
                break;
            case 62 :
                book = require('./bjson/62.json');
                break;
            case 63 :
                book = require('./bjson/63.json');
                break;
            case 64 :
                book = require('./bjson/64.json');
                break;
            case 65 :
                book = require('./bjson/65.json');
                break;
            case 66 :
                book = require('./bjson/66.json');
                break;



        }
        return book;
    }*/ //remove this


    findBookFromState(){
         const bookIndex = this.state.bookIndex;
         console.log(bookIndex);
         let book = getBook(bookIndex).then((book)=>{
             this.setState({
                 currentChapter : book.Chapters[this.state.chapter-1],
                 currentBook : book,
                 previousBookLength : (bookIndex < 1 ) ? getBook(bookIndex-1).then((res)=> {return res}) : false,
                 nextBookLength : (bookIndex > 66 ) ? getBook(bookIndex+1).then((res)=> {return res}) : false,
                 ready :true
             });
         });


        return book;


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

            Share.share({
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
        Share.share({
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


        if(verse[1]===1){
            return {
                verse : this.state.currentBook.Chapters[verse[3]].Verses[verse[4]],
                chapterName : this.state.currentBook.Name + ' ' + this.state.currentBook.Chapters[verse[3]].Number,
                verseName : this.state.currentBook.Name + ' ' + this.state.currentBook.Chapters[verse[3]].Number + ':' + this.state.currentBook.Chapters[verse[3]].Verses[verse[4]].Number,
            };
        }
        else {
            return {
                verse : this.state.currentBook.Chapters[verse[3]].Verses[verse[4]],
                chapterName : this.state.currentBook.Name + ' ' + this.state.currentBook.Chapters[verse[3]].Number,
                verseName : this.state.currentBook.Name + ' ' + this.state.currentBook.Chapters[verse[3]].Number + ':' + this.state.currentBook.Chapters[verse[3]].Verses[verse[4]].Number,
            };
        }

    }


    render() {
        let color = this.state.scheme === 'light' ? '#000' : '#fff';
        let backgroundColor = this.state.scheme === 'light' ? '#328FBC' : '#000';
        let contentBgColor = this.state.scheme === 'light' ? '#fafafa' : '#000';

        return (
            <View style={{flex:1}}>
                        {!this.state.ready ?
                            <View style={styles.spinerCont}>
                                <Spinner color='#328FBC' />
                            </View>
                            :
                            <Content onScroll={this._onScroll.bind(this)} ref='_scrollView' style={[styles.readingContent, {backgroundColor: contentBgColor}]} padder>
                                <Animated.View style={[{ marginTop: this.state.height }]}/>
                                <Text style={[styles.chDesc, {fontSize:(this.state.fontSize-2), color: color}]}>{this.state.currentChapter.Description }</Text>
                                <Text style={[styles.readingTexts, {color:color, fontSize:(this.state.fontSize)}]}>

                                    {this.state.currentChapter.Verses.map((verse, key) => {
                                        return (
                                            <Text style={{color:color,fontSize:(this.state.fontSize-4), backgroundColor:this.state.selected[this.state.selected.indexOf(verse.ID)] === verse.ID ? '#cee7f4': 'transparent'}} onPress={()=> this.selectVerse(verse.ID)} key={key}>
                                                <Text style={[styles.verseNum, {color:color, fontSize:(this.state.fontSize-4)}]}>{verse.Number}</Text>
                                                <Text style={[styles.verse, {color:color, fontSize:(this.state.fontSize)}]}>{verse.Content}</Text>
                                            </Text>
                                        );
                                    })}

                                </Text>
                                <Animated.View style={[{ marginBottom: this.state.footerHeight }]}/>
                            </Content>
                        }
                    <Animated.View style={[styles.headerAnim, { height: this.state.height, backgroundColor: backgroundColor }]}>
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

                <Animated.View style={[styles.footerAnim, { height: this.state.footerHeight, backgroundColor: backgroundColor }]}>
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
