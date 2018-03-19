const React = require("react-native");
import { Dimensions, Platform } from 'react-native';
let {width, height} = Dimensions.get('window');
const { StyleSheet } = React;

export default {
    title : {
        color:'white',
        width:200,
        fontSize: 20
    },
    header : {
        height: 80,
        backgroundColor : '#328FBC'
    },
    whiteIcon : {
        color : '#fff',
    },
    arrowRight: {
        color : '#fff',
        fontSize: 30
    },
    arrowLeft : {
        color : '#fff',
        fontSize:30,
        marginLeft:10
    },
    whiteColor : {
        color : '#fff',
    },
    searchBox : {
        height: 64,
        backgroundColor : '#DBE7ED',
        borderColor: '#C9D3D8',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,

    },
    searchBoxInput : {
        height: 64,
        color : '#187AAE',
        width: width,
    },
    searchIcon : {
        color : '#187AAE'
    },
    listItemResult : {
        marginLeft:0,
        backgroundColor: '#F5F5F5',
        borderBottomColor: '#C9D3D8',
    },
    listItemResultText : {
        color:'#535252',
    },
    listItemResultTitle : {
        fontSize:14,
        fontWeight:'bold',
        color:'#333333',
        marginBottom: 4,
        textAlign:'left'
    },
    searchedWord : {
        color: '#0E5C85',
        textDecorationLine: 'underline'
    },
    container: {
        flex: 1,
    },
    chapter : {
        backgroundColor: '#fff',
        width: width /5,
        height: width /5,
        justifyContent:'center',
        borderWidth:1,
        borderColor: '#F4F4F4',
        alignSelf: 'flex-start',
        borderRadius:0,

    },
    chapterNum : {
        color:'#535252',
        fontSize:16,
        textAlign:'center',
        backgroundColor: 'transparent'
    },
    listView : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:width
    },
    tab : {
        backgroundColor: 'white'
    },
    chapterCont: {
        backgroundColor: '#F4F4F4'
    },
    footer : {
        height: 55,
    },
    volumeIcon : {
        textAlign:'center',
        fontSize:40,
        color:'#fff',
        justifyContent:'center',
        width:40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:16
    },
    centeredButton : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    verseNum : {
        color:'#0E5C85',
        fontSize:11,
        marginLeft:5,
        marginRight:5,
        textAlignVertical:'top',
    },
    verse : {
        color: '#4D4D4D',
        fontSize:15,
    },
    chDesc: {
        textAlign:'center',
        color: '#4D4D4D',
        marginBottom:10,
        fontSize:13
    },
    readingView : {
        flexDirection:'row',
        flexWrap:'wrap',
        width:width
    },
    readingContent : {
        backgroundColor: '#fafafa',
        marginBottom:10
    },
    readingTexts : {
        textAlign:'justify',
        letterSpacing:0,
    },
    leftRightChapter : {
        width: 40,
    },
    spinerCont : {
        flex:1,
        alignItems:'center',
        height: height,
        justifyContent: 'center',
        flexDirection:'row'
    },
    soundIcon :{
        height: 40,
        width: 40,
        backgroundColor:'red'
    },
    loadingSound : {
        color:'white',
        top: -10,
        fontSize:10
    },
    timestamp : {
        color:'white',
        fontSize: 12
    },
    audioContainer :{
        width: width,
        zIndex:9
    },

    playbackSlider: {
        width: width-95,
        zIndex:99
    },
    timestampRow: {
        position:'absolute',
        right:10,
        top:12
    },
    headerAnim : {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        backgroundColor : '#328FBC',
        flex:1,
        alignItems:'center',
        paddingTop:10

    },
    headerContent : {
        flex:1,
        flexDirection: 'row',
    },
    footerAnim : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
    },
    spinnerTop : {
        marginTop:-80
    }


};
