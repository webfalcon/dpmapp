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
    List,
    Text,
    Spinner
} from "native-base";
import {ImageBackground, TouchableOpacity} from 'react-native';
import PageHeader from '../PageHeader';
import styles from "./styles";
const api = 'https://derekprincearmenia.com/wp-json/wp/v2/';


class Sermons extends Component {
    constructor(props){
        super();
        this.state = {
            books : [],
            loading: false,
            ready:false,
            end : false,
            bookPage: 1
        };

        this.loadMoreResult = this.loadMoreResult.bind(this);
    }

    componentDidMount(){
        this.getApi();

        this.setState({
            books : [],
            loading: false,
            ready:false,
            end : false,
            bookPage : 1
        });
    }
    getApi(){
        return fetch(api+'posts?per_page=5&categories=1&page='+this.state.bookPage)
            .then((response) => response.json())
            .then((responseJson) => {
                let books = this.state.books;
                books = [...books, ...responseJson];

                this.setState({
                    books : books,
                    ready : true,
                    loading: false,
                    bookPage: this.state.bookPage+=1
                });
                if(responseJson.code === 'rest_post_invalid_page_number'){
                    this.setState({end: true});
                }
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    loadMoreResult(){
        if(this.state.end)
            return;

        this.setState({loading:true});

        this.getApi();
    }
    render() {
        return (
            <Container>
                <PageHeader title="Պատգամներ" {...this.props} />
                {this.state.ready ?
                    <Content>
                        <List dataArray={this.state.books} renderRow={(item)=>
                            <Body style={styles.listItem}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("SinglePage", [item, 'Պատգամներ'])}>
                                <ImageBackground style={styles.pageImage} source={{uri : (item.better_featured_image.media_details.sizes.medium ? item.better_featured_image.media_details.sizes.medium.source_url : item.better_featured_image.media_details.sizes.thumbnail.source_url)}}>
                                    <ImageBackground style={styles.pageImageGradient} source={require('../../../img/grBottom.png')}>
                                        <Text padder style={styles.pageTitleIn}>{item.title.rendered}</Text>
                                    </ImageBackground>
                                </ImageBackground>
                            </TouchableOpacity>
                            </Body>
                        }/>
                        {
                            !this.state.end ?

                                this.state.loading ?
                                    <View style={styles.spinerCont}>
                                        <Spinner color='#328FBC' />
                                    </View>
                                    :
                                    <View padder>
                                        <Button block blue onPress={()=> this.loadMoreResult()}>
                                            <Text>Ավելին</Text>
                                        </Button>
                                    </View>
                                : <Text/>
                        }

                    </Content> :
                    <View style={styles.spinerCont}>
                        <Spinner color='#328FBC' />
                    </View>
                }

            </Container>

        );
    }

}

export default Sermons;