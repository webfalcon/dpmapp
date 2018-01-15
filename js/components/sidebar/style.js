const React = require("react-native");

const { StyleSheet, Platform, Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
    sidebar: {
        flex: 1,
        top: 0,
    },

    listItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    text: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        marginLeft: 10,
        textAlign: 'left',
        color: '#535252',
    },

    listItem : {
        backgroundColor : 'transparent',
        borderColor: '#C9D3D8',
        borderBottomWidth: 0.5,
    },

    container : {

    },
    menuHeader : {
        backgroundColor:'#3A728D',
        height:80
    },
    closeIcon : {
        color:'#fff',
        fontSize:40,
        marginRight:5
    },
    title : {
        color:'white',
        width:150,
        fontSize: 20,
        paddingLeft:20
    },
};
