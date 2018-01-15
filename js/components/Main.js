import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body
} from "native-base";
import HomeRow from './HomeRow';
import MainFooter from './MainFooter';

import Share, {ShareSheet} from 'react-native-share';



import styles from "./styles";

class DpmMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }



  render() {

      let shareOptions = {
          title: "DPM Armenia",
          message: "Welcome to DPM Armenia Mobile APP",
          url: "http://derekprincearmenia.com/",
          subject: "DPM Armenia" //  for email
      };

    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor="#fff" iosBarStyle="light-content" style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={styles.whiteIcon} name="ios-menu" />
            </Button>
          </Left>
          <Body>
              <Title style={styles.title}>DPM Armenia</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={()=>{
                  Share.open(shareOptions);
              }}
            >
              <Icon style={styles.whiteIcon} name="md-share" />
            </Button>
          </Right>

        </Header>

        <HomeRow {...this.props} />


        <MainFooter {...this.props} />
      </Container>
    );
  }

}

export default DpmMainPage;
