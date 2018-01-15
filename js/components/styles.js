const React = require("react-native");
import { Dimensions } from 'react-native'

const { StyleSheet } = React;
let {width, height} = Dimensions.get('window');

export default {
  container: {
    backgroundColor: "#fff"
  },
  title : {
    color:'white',
      width:150,
      fontSize: 20
  },
  header : {
    height: 80,
    backgroundColor : '#328FBC',
    borderBottomWidth:0
  },
  whiteIcon : {
    color : '#fff',
  },
  whiteColor : {
    color : '#fff',
  },
  footer : {
      height: 80,
      backgroundColor : '#328FBC',
      borderTopWidth:0
  },
  rowRow : {
    height: 127

  },
  rowView : {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,

  },
  rowImage : {
    flex:1,
    height: undefined,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowTitle : {
    fontSize: 28,
    textAlign: 'center',
    color: '#ffffff',
    width: undefined,
  },
  rowSubTitle : {
    fontSize: 16,
    marginTop:26,
    textAlign: 'center',
    color: '#ffffff',
  },
    headerTitle : {
        width:200,
        fontSize:20,
        color:'white'
    },
    pageHeader : {
      backgroundColor : '#328FBC'
    }

};
