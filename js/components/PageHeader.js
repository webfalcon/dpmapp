import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import styles from "./styles";

class PageHeader extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : 'title'
        };
    }

    changeTitle(title){
        this.setState(title);
    }

    render() {
    return (
        <Header androidStatusBarColor="#fff" iosBarStyle="light-content" style={styles.pageHeader}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.whiteIcon} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>{this.props.title}</Title>
          </Body>
          <Right />
        </Header>

    );
  }

}

export default PageHeader;
