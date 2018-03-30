/* @flow */ 
import React from "react";
import App from "./js/App";
import { Font } from "expo";
import { Text, View } from 'react-native';



export default class App1 extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            fontsAreLoaded: false

    }

    }
    
    async componentWillMount() {
        await Font.loadAsync({
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf')

        });
        this.setState({fontsAreLoaded: true});
    }

    render() {        
        if (this.state.fontsAreLoaded){
            return (
                <App/>
            );
        }
        else {
            return null;
        }
    }

}
