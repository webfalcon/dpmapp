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
    Content
} from "native-base";
import {ImageBackground, Text} from 'react-native';

import styles from "./styles";

class PostItem extends Component {
    constructor(props){
        super();
    }
    render() {
        return (
                <Body style={styles.listItem}>
                    <ImageBackground style={styles.pageImage} source={require('../../../img/newbook.png')}>
                        <ImageBackground style={styles.pageImageGradient} source={require('../../../img/grBottom.png')}>
                            <Text  onPress={() => this.props.navigation.navigate("SinglePage")} style={styles.pageTitleIn}>Նոր գիրք Դերեկ Պրինսից</Text>
                        </ImageBackground>
                    </ImageBackground>
                </Body>
        );
    }

}

export default PostItem;