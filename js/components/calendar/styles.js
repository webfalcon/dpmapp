const React = require("react-native");
import { Dimensions } from 'react-native'

const { StyleSheet } = React;
let {width, height} = Dimensions.get('window');

export default {

    calendar : {
        backgroundColor: '#328FBC'
    },
    selectedDay : {
        color : '#fff',
        fontSize: 20

    },
    pageImage : {
        height: 203,
        width: width,
    },
    pageImageGradient : {
        height:108,
        width:width,
        position:'absolute',
        bottom :0
    },
    pageTitleIn : {
        color:'white',
        fontSize :20,
        position:"absolute",
        backgroundColor:"transparent",
        bottom :15,
        left: 10
    },

};
