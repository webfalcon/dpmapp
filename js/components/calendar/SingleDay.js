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
    Spinner,
    Fab,
    IconNB
} from "native-base";
import {ImageBackground, Text} from 'react-native';
import PageHeader from '../PageHeader';
import styles from "./styles";
import HTML from 'react-native-render-html';
import Share from 'react-native-share';

const api = 'http://derekprincearmenia.com/wp-json/wp/v2/';


class SingleDay extends Component {
    constructor(props){
        super();
        this.state = {
            result : [],
            loading: false,
            ready:false,
            id: ''
        };
        this.shareThePage = this.shareThePage.bind(this);

    }

    componentWillMount(){
        const {navigation: {state: {params}}} = this.props;
        this.setState({
            id:params,
        },()=> this.getApi());
        console.log(params);

    }

    getApi(){
        return fetch(api+'posts/'+ this.state.id)
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
    shareThePage() {
        Share.open({
            title: this.state.result.title.rendered,
            message: this.state.result.title.rendered + '\n',
            url: this.state.result.guid.rendered,
            subject: this.state.result.title.rendered //  for email
        });
    }

    render() {
        return (
            <Container>
                <PageHeader title="Օրվա Խոսքը" {...this.props} />
                    <Content>
                        { this.state.ready ?
                            <View>
                                <ImageBackground style={styles.pageImage} source={{url : this.state.result.better_featured_image.source_url}}>
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
                                          baseFontStyle="16"
                                    />
                                </Content>
                            </View>
                            :
                            <View style={styles.spinerCont}>
                                <Spinner color='#328FBC' />
                            </View>
                        }
                    </Content>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#1879ae"}}
                    position="bottomRight"
                    onPress={this.shareThePage}>
                    <IconNB name="md-share" />
                </Fab>
            </Container>

        );
    }

}

export default SingleDay;