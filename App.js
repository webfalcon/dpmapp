import React from "react";
import App from "./js/App";
import { Font } from "expo";

import { Asset, AppLoading } from 'expo';


export default class App1 extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            fontsAreLoaded: false

    };
    }
    async componentWillMount() {
        await Font.loadAsync({
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
        });
        this.setState({fontsAreLoaded: true});
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./img/row1.png'),
                require('./img/row2.png'),
                require('./img/row3.png'),
                require('./img/row4.png'),
                require('./img/row5.png'),
                require('./img/row6.png'),

            ])
        ]);
    };



    render() {        
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        if (this.state.fontsAreLoaded)
            return <App/>;
        else
            return null;
    }

}
