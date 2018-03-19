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
    Fab,
    IconNB
} from "native-base";
import {ImageBackground, Text} from 'react-native';
import PageHeader from '../PageHeader';
import styles from "./styles";
import { Dimensions } from 'react-native';

import HTML from 'react-native-render-html';
import { Share } from 'react-native';



class SinglePage extends Component {
    constructor(props){
        super();
        this.state = {
            post: [],
            ready:false,
            title : ''
        }
        this.shareThePage = this.shareThePage.bind(this);
    }
    componentWillMount(){
        const {navigation: {state: {params}}} = this.props;
        this.setState({
            post:params[0],
            title: params[1],
            ready: true,
        },()=> console.log(this.state));

    }
    shareThePage(){
        Share.share({
            title: this.state.post.title.rendered,
            message: this.state.post.title.rendered + '\n',
            url : this.state.post.guid.rendered,
            subject: this.state.post.title.rendered //  for email
        });
    }

    render() {
        return (
            <Container>
                <PageHeader title={this.state.title} {...this.props} />
                {this.state.ready ?
                <Content>
                    <ImageBackground style={styles.pageImage} source={{uri : (this.state.post.better_featured_image.media_details.sizes.medium ? this.state.post.better_featured_image.media_details.sizes.medium.source_url : this.state.post.better_featured_image.media_details.sizes.thumbnail.source_url)}}>
                        <ImageBackground style={styles.pageImage} source={require('../../../img/Gradient.png')}>
                            <Text style={styles.pageTitleIn}>{this.state.post.title.rendered}</Text>
                        </ImageBackground>
                    </ImageBackground>
                    <Content padder style={styles.pageContent}>
                        <HTML html={this.state.post.better_content.content}
                              imagesMaxWidth={Dimensions.get('window').width-20}
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
                                        },
                                      iframe : {
                                        width:Dimensions.get('window').width-20,
                                          left:-10
                                      }
                                  }}
                              //baseFontStyle="16"
                        />
                    </Content>
                </Content>
                    :
                    <View style={styles.spinerCont}>
                        <Spinner color='#328FBC' />
                    </View>
                }
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

export default SinglePage;