import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon
} from "native-base";

import styles from "./styles";

class MainFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab1: false,
      tab2: false,
    };
  }

  toggleTab1() {
    this.setState({
      tab1: true,
      tab2: false,
    });
  }

  toggleTab2() {
    this.setState({
      tab1: false,
      tab2: true,
    });
  }

  render() {
        return (
            <Footer style={styles.footer}>
              <FooterTab style={styles.footer}>
                <Button active={this.state.tab1} onPress={() => this.props.navigation.navigate("Bible")}>
                  <Icon style={styles.whiteIcon} active={this.state.tab1} name="book" />
                  <Text style={styles.whiteColor}>Աստվածաշունչ</Text>
                </Button>
                <Button active={this.state.tab2} onPress={() => this.props.navigation.navigate("DpmCalendar")}>
                  <Icon style={styles.whiteIcon} active={this.state.tab2} name="calendar" />
                  <Text style={styles.whiteColor} >Օրվա խոսք</Text>
                </Button>
              </FooterTab>
            </Footer>
        );
  }
}

export default MainFooter;
