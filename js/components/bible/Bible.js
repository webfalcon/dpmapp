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
    View,
    Text,
    Content,
    Tabs,
    Tab
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import styles from "./styles";
import BibleBooks from './BibleBooks'
import BibleChapters from './BibleChapters';


import bJson from './bibleJson';
const tabRef ='';
class Bible extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedBook : 0,
            selectedChapter : 1,
            testament : 0,
            bookIndex : 1,
            bibleReady: false

        };
        this.goChapter = this.goChapter.bind(this);
        this.goReading = this.goReading.bind(this);

    }


    goChapter(num, testament, index){
        this.setState({
            selectedBook:num-1,
            testament : testament,
            bookIndex : index
        }, ()=> {this.tabRef.goToPage(1)});


        console.log(num);
    }
    goReading(num, testament){
        this.setState({selectedChapter:num},
            ()=> this.props.navigation.navigate("Reading",{book:this.state.selectedBook+1, chapter:this.state.selectedChapter, testament: this.state.testament, bookIndex: this.state.bookIndex})
        );

    }
  render() {
    return (
      <Container>
          <Header androidStatusBarColor="#fff" iosBarStyle="light-content" style={styles.header}>
              <Left>
                  <Button
                      transparent
                      onPress={() => this.props.navigation.goBack()}
                  >
                      <Icon style={styles.whiteIcon} name="arrow-back" />
                  </Button>
              </Left>
              <Body>
              <Title style={styles.title}>Աստվածաշունչ</Title>
              </Body>
              <Right>
                  <Button
                      transparent
                      onPress={() => this.props.navigation.navigate("BibleSearch")}>
                      <Icon style={styles.whiteIcon} name="md-search" />
                  </Button>
              </Right>
          </Header>

          <Tabs ref={ t=>this.tabRef = t } tabBarUnderlineStyle={{borderBottomWidth:2, borderBottomColor:'#187AAE'}} style={styles.tabs}>
              <Tab style={styles.tab}  activeTextStyle={{color: '#187AAE'}} heading="Գրքեր">
                  <BibleBooks bible={bJson} goChapter={this.goChapter} />
              </Tab>
              <Tab heading="Գլուխ" activeTextStyle={{color: '#187AAE'}}>
                  <BibleChapters bible={bJson} goReading={this.goReading} testament={this.state.testament} book={this.state.selectedBook} {...this.props} />
              </Tab>
          </Tabs>
      </Container>

    );
  }

}

export default Bible;
