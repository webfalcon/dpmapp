const React = require("react-native");
import { Dimensions } from 'react-native'
let {width, height} = Dimensions.get('window');

const { StyleSheet } = React;

export default {

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
        bottom :10,
        left: 10
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    paragraph : {
        fontSize: 15,
        color: '#535252'
    },
    paragraphBold : {
        fontSize: 15,
        fontWeight:'bold',
        marginBottom:10,
        color: '#535252'
    },
    listItem : {
        marginBottom:10
    },
    pageContent : {
        marginBottom : 85
    },
    schemeLight : {
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#fff',
        borderColor:'#2a2a2a',
        borderWidth:2,
        marginRight:5

    },
    lightButtons : {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    lightIcon : {
        color:'#2a2a2a',
        fontSize:30,
        textAlign:'center'
    },
    schemeDark : {
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#2a2a2a',
        marginLeft:5
    },
    darkIcon : {
        color:'#fff',
        fontSize:30,
        textAlign:'center'
    },
    headerContent : {
        flex:1,
        flexDirection: 'row',
        height:80
    },
    whiteIcon : {
        color : '#fff',
    },
    pageTitle : {
        color: 'white',
        fontSize: 20,
    },




};
