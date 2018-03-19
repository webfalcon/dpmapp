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
    Form,
    Item,
    Input,
    List,
    ListItem,
    Content,
    Text,
    Spinner,
    View
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
const reactStringReplace = require('react-string-replace');
import getBook from './bibleJson';
import bookPages from './bookPages';

import styles from "./styles";
import {FileSystem} from "expo";
let BibleJson = [];

class BibleSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : '',
            words : [],
            verses : [],
            ready : true,
            allVerses : [],
            bible : []
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.Search = this.Search.bind(this);
        this.wordContain = this.wordContain.bind(this);
        this.bJsonSearch = this.bJsonSearch.bind(this);
        this.findVerseById = this.findVerseById.bind(this);
        this.loadMoreResult = this.loadMoreResult.bind(this);

        this.resultCount = 3;
    }
    componentWillMount(){

        FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'search.json').then((res)=>{
            BibleJson = JSON.parse(res);
        });
    }
    updateSearch(val){
        console.log(val);
        this.setState({value:val},()=>{
            this.Search(val);
        });
    }
    Search(searchKey) {
        if(searchKey ==='')
            return false;
        if(searchKey.length<2){
            return false;
        }
        this.setState({
            ready: false,
            words: [],
            verses: [],

        },
            () => this.bJsonSearch(searchKey));

    }

    bJsonSearch(searchKey){
        this.resultCount = 3;
        searchKey = searchKey.toLowerCase();

        BibleJson.Verses.forEach((vers)=>{
               if(vers.Content.toLowerCase().includes(searchKey)){
                   // Search in Verses
                   if(this.wordContain(vers, searchKey)){
                       const verses = this.state.verses;


                       let versWithNav = {...vers, ...this.findVerseById(vers.ID)};


                       verses.push(versWithNav);
                       this.setState({verses : verses.slice(0, 3), allVerses: verses});
                     //  console.log(verses);


                   }
               }
           });

        this.setState({
            ready : true,
        });

        /*bJson.Testaments.forEach((test)=>{
            //Search in Testaments
            test.Books.forEach((book)=>{
                // Search in Books
                book.Chapters.forEach((chap)=>{
                    // Search in Chapters
                    chap.Verses.forEach((vers)=>{
                        if(vers.Content.toLowerCase().includes(searchKey)){
                            // Search in Verses
                            if(this.wordContain(vers, searchKey)){
                                const verses = this.state.verses;
                                verses.push(vers);
                                this.setState({verses : verses.slice(0, 3), allVerses: verses, ready: true});
                            }
                        }
                    });
                    this.setState({
                        ready : true,
                    });
                });
            });
        });*/
        return false;
    }

    wordContain(vers, searchKey) {
        if(searchKey.split(' ').length > 1 ){
            if(vers.Content.includes(searchKey)){
                return true;
            }
        }
        else {
            const res = vers.Content.split(' ');
            for(let i=0; i<res.length; i++){
                let _word = res[i].replace(/[&\/\\#,~՜՝՛․…՞«»+()$%.'"*?<>{}]/g, '');
                if(_word.toLowerCase().startsWith(searchKey)){
                    return true;
                }
            }
        }

        return false;
    }
     findVerseById(id) {
         const Id = id.split(/(\d+)/);
         let verse = [];

         for (let i = 1; i < Id.length; i += 2) {
             verse.push(parseInt(Id[i]) - 1);
         }
         // issue comes becouse in testament two index started at 40 not at 1
            let old = 0;
                if(verse[1] ===1){
                    old = 39;
                }
            //console.log(bookPages[verse[1]].books[]);
             let result  = {
                 verseName: bookPages[verse[1]].books[(verse[2] - old)].name + ' ' + (verse[3] + 1) + ':' + (verse[4] + 1),
                 navigate: {
                     book: verse[2] - old,
                     chapter: verse[3] + 1,
                     testament: verse[1],
                     bookIndex: verse[2] + 1
                 }
             };

         return result;
     }
    loadMoreResult() {
        this.setState({
            verses : this.state.allVerses.slice(0, this.resultCount+=10)
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header backgroundColor="#116b9c" androidStatusBarColor="#116b9c" iosBarStyle="dark-content" searchBar rounded style={{backgroundColor: 'white'}}>
                    <Item>
                        <Icon active name="search" />
                        <Input value={this.state.value}  onChangeText={(text) => this.updateSearch(text)}  placeholder="Փնտրել" />
                    </Item>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Text>Փակել</Text>
                    </Button>
                </Header>

                <Content>
                    {!this.state.ready ?
                        <Body>
                            <Spinner color='#328FBC'/>
                        </Body>
                        :
                        <View>
                            <List
                                dataArray={this.state.verses}
                                renderRow={(data, i) =>
                                    <ListItem style={styles.listItemResult} onPress={() => this.props.navigation.navigate("Reading", data.navigate)} key={i}>
                                        <Body>
                                        <Text style={styles.listItemResultTitle}>{data.verseName}</Text>
                                        <Text style={styles.listItemResultText}>{
                                            reactStringReplace(data.Content, this.state.value, (match, i) => (
                                                <Text key={i} style={styles.searchedWord}>{match}</Text>
                                            ))
                                        }</Text>
                                        </Body>
                                    </ListItem>}
                            />
                            {
                                (this.state.verses.length !=0 && this.state.allVerses.length > 3 && this.resultCount < this.state.allVerses.length) &&
                                    <View padder>
                                        <Button block blue onPress={()=> this.loadMoreResult()}>
                                            <Text>Ավելին</Text>
                                        </Button>
                                    </View>
                            }
                        </View>

                    }
                    {
                        (this.state.verses.length === 0 && this.state.value.length > 1 && this.state.ready) &&
                        <Body style={{paddingTop:15}}>
                            <Text>Ոչինչ չի գտնվել։</Text>
                        </Body>
                    }
                </Content>
            </Container>

        );
    }

}

export default BibleSearch;
