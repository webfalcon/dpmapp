import React, { Component } from "react";
import { Image, Text, View, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import styles from './styles'



class HomeRow extends Component {

  constructor(props){
    super(props);
    this.state = {
      row1 : ""
    }
  }

  render() {
    return (
      <Container>
          <Content>
              <View  style={styles.rowRow}>
                  <TouchableOpacity style={styles.rowView} onPress={() => this.props.navigation.navigate("DerekPrince")}>
                      <ImageBackground style={styles.rowImage} source={require('../../img/row1.png')}>
                          <Text style={styles.rowTitle}>Դերեկ Պրինս</Text>
                      </ImageBackground>
                  </TouchableOpacity>
              </View>
              <View style={styles.rowRow}>
                  <TouchableOpacity style={styles.rowView} onPress={() => this.props.navigation.navigate("Books")}>
                      <ImageBackground style={styles.rowImage} source={require('../../img/row2.png')}>
                          <Text onPress={() => this.props.navigation.navigate("Books")} style={styles.rowTitle}>Գրքեր</Text>
                      </ImageBackground>
                  </TouchableOpacity>
              </View>
              <View style={styles.rowRow}>
                  <TouchableOpacity style={styles.rowView} onPress={() => this.props.navigation.navigate("Sermons")} >
                      <ImageBackground style={styles.rowImage} source={require('../../img/row3.png')}>
                          <Text onPress={() => this.props.navigation.navigate("Sermons")} style={styles.rowTitle}>Պատգամներ</Text>
                      </ImageBackground>
                  </TouchableOpacity>
              </View>
              <View style={styles.rowRow}>
                  <TouchableOpacity style={styles.rowView}  onPress={() => this.props.navigation.navigate("News")}>
                      <ImageBackground style={styles.rowImage} source={require('../../img/row4.png')}>
                          <Text style={styles.rowTitle}>Նորություններ</Text>
                      </ImageBackground>
                  </TouchableOpacity>
              </View>
              <View style={styles.rowRow}>
                  <TouchableOpacity style={styles.rowView} onPress={() => this.props.navigation.navigate("Videos")}>
                      <ImageBackground style={styles.rowImage} source={require('../../img/row5.png')}>
                          <Text style={styles.rowTitle}>Տեսանյութեր</Text>
                      </ImageBackground>
                  </TouchableOpacity>
              </View>
              <View style={styles.rowRow}>
                  <TouchableOpacity style={styles.rowView}>
                      <ImageBackground style={styles.rowImage} source={require('../../img/row6.png')}>
                          <Text style={styles.rowTitle}>Աուդիոգրքեր</Text>
                          <Text style={styles.rowSubTitle}>Շուտով...</Text>
                      </ImageBackground>
                  </TouchableOpacity>
              </View>
          </Content>
      </Container>
    );
  }
}

export default HomeRow;
