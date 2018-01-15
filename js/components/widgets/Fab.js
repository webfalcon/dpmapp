import React, { Component } from "react";
import { View, Platform } from "react-native";

import {
    Container,
    Header,
    Title,
    Fab,
    Button,
    IconNB,
    Left,
    Right,
    Body,
    Icon
} from "native-base";

import styles from "./styles";

class ShareFab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    // TODO: Set Fab to show when user scrolls bottom.

    render() {
        return (
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: "#328FBC" }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <IconNB name="md-share" />
                </Fab>
        );
    }
}

export default ShareFab;
