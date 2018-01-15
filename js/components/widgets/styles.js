const React = require("react-native");
import { Dimensions } from 'react-native'

let {width, height} = Dimensions.get('window');
const { StyleSheet } = React;

export default {
    container: {
        backgroundColor: "#FFF"
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
