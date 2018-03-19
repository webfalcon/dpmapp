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
    Content,
    Spinner
} from "native-base";
import {ImageBackground, Text} from 'react-native';
import PageHeader from '../PageHeader';
import styles from "./styles";
import HTML from 'react-native-render-html';

const api = 'https://derekprincearmenia.com/wp-json/wp/v2/';


class DerekPrince extends Component {
    constructor(props){
        super();
        this.state = {
            result : [],
            loading: false,
            ready:false,
        }

    }
    componentDidMount() {
        this.getApi();
    }

    getApi(){
        return fetch(api+'pages/4248')
            .then((response) => response.json())
            .then((responseJson) => {

            this.setState({
                    result : responseJson,
                    ready : true,
                    loading: false,
                });
                console.log(this.state);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <Container>
                <PageHeader title="Դերեկ Պրինս" {...this.props} />
                    <Content>
                        { this.state.ready ?
                            <View>
                                <ImageBackground style={styles.pageImage} source={{uri : this.state.result.better_featured_image.source_url}}>
                                    <ImageBackground style={styles.pageImage} source={require('../../../img/Gradient.png')}>
                                        <Text style={styles.pageTitleIn}>{this.state.result.title.rendered}</Text>
                                    </ImageBackground>
                                </ImageBackground>
                                <Content padder>
                                    <HTML html={this.state.result.better_content.content}
                                          tagsStyles={{

                                              h2 : {
                                                  fontSize:22,
                                                  color: '#535252'
                                              },
                                              h3 : {
                                                  fontSize:22,
                                                  color: '#535252'
                                              },
                                              img : {
                                                  marginBottom:8
                                              }

                                          }}
                                    />
                                </Content>
                            </View>
                            :
                            <View style={styles.spinerCont}>
                                <Spinner color='#328FBC' />
                            </View>
                        }
                    </Content>
            </Container>

        );
    }

}

export default DerekPrince;