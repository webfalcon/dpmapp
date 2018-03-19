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
    List,
    ListItem
} from "native-base";
import { Dimensions, Platform } from 'react-native';
let {width, height} = Dimensions.get('window');

import Grid from 'react-native-grid-component';


import styles from "./styles";

class BibleChapters extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.chapterSelected = this.chapterSelected.bind(this);
    }

    chapterSelected(chapter){
            this.props.goReading(chapter, this.props.testament);
    }
    numToArray(num){
        let arr = [];
        for(let i =1; i <= num; i++){
            arr.push(i);
        }
        return arr;
    }
    render() {
        return (
            <Container style={styles.chapterCont}>

                <Grid
                    style={styles.list}
                    renderItem={(item, i) =>
                        <Button style={styles.chapter} onPress={()=> this.chapterSelected(item)} key={i}>
                            <Text style={styles.chapterNum}>{item}</Text>
                        </Button>
                    }
                    data={this.numToArray(this.props.bookPages[this.props.testament].books[this.props.book].books)}
                    itemsPerRow={5}
                />



            </Container>
        );
    }

}

export default BibleChapters;
