import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Text,
  Body,
  Spinner,
  View,
  Content
} from "native-base";
import {ImageBackground, TouchableOpacity} from 'react-native';
import { Grid, Row } from "react-native-easy-grid";
import PageHeader from '../PageHeader';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Moment from 'moment';
import Days from './Days.json';
const api = 'https://derekprincearmenia.com/wp-json/wp/v2/';


LocaleConfig.locales['hy'] = {
    monthNames: ['Հունվար','Փետրվար','Մարտ','Ապրիլ','Մայիս','Հունիս','Հուլիս','Օգոստոս','Սեպտեմբեր','Հոկտեմբեր','Նոյեմբեր','Դեկտեմբեր'],
    dayNamesShort: ['Երկ','Երք','Չրք','Հնգ','Ուր','Շբթ','Կրկ']
};

LocaleConfig.defaultLocale = 'hy';

import styles from "./styles";
class DpmCalendar extends Component {
    constructor(props){
        super();
        this.state = {
            selected : Moment(new Date()).format('YYYY-MM-DD'),
            todayDate : Moment(new Date()).format('MM.DD'),
            result: [],
            ready: false,
            loading : false,
            today : ''
        };
        this.onDayPress = this.onDayPress.bind(this);
    }

    componentWillMount(){
        this.getApi();
    }

    getApi(){
        let todayDate = this.state.todayDate;
        let toDay = Days.findIndex(function(item, i){
            return item.date === todayDate;
        });

        this.setState({today: Days[toDay].id});
        return fetch(api+'posts/'+ Days[toDay].id)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    result : responseJson,
                    ready : true,
                    loading: false,
                });
            })
            .catch(console.error);
    }

    onDayPress(day) {
        console.log(day);
        this.setState({
            selected: day.dateString,
            todayDate : Moment(day.timestamp).format('MM.DD'),
            ready:false
        },() => this.getApi());
    }


  render() {
    return (
      <Container>
        <PageHeader title="Օրվա Խոսքը" {...this.props} />
          <Calendar
              minDate={'2018-01-01'}
              maxDate={'2018-12-31'}
              monthFormat={'MMMM'}
              onDayPress={this.onDayPress}
              style={styles.calendar}
              markedDates={{[this.state.selected]: {selected: true}}}
              theme={{
                  calendarBackground: '#333248',
                  textSectionTitleColor: 'white',
                  dayTextColor: 'white',
                  todayTextColor: 'white',
                  selectedDayTextColor: 'white',
                  monthTextColor: 'white',
                  selectedDayBackgroundColor: '#187AAE',
                  arrowColor: 'white',
                  'stylesheet.calendar.header': {
                      week: {
                          marginTop: 15,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginLeft :10,
                          marginRight :10
                      }
                  }
              }}

          />

          {this.state.ready ?
              <Body style={styles.todayArticle}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("SingleDay", this.state.today)}>
                  <ImageBackground style={styles.pageImage} source={{uri : this.state.result.better_featured_image.source_url}}>
                      <ImageBackground style={styles.pageImageGradient} source={require('../../../img/grBottom.png')}>
                          <Text style={styles.pageTitleIn}>{this.state.result.title.rendered}</Text>
                      </ImageBackground>
                  </ImageBackground>
              </TouchableOpacity>
              </Body>
              :
              <Content>
                  <View style={styles.spinerCont}>
                      <Spinner color='#328FBC' />
                  </View>
              </Content>
          }
      </Container>

    );
  }

}

export default DpmCalendar;
