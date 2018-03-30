
import React from "react";
import { DrawerNavigator } from "react-navigation";


import DpmMainPage from './components/Main';
import SideBar from "./components/sidebar";


const DrawerExample = DrawerNavigator(
  {
    DpmMainPage: { screen: DpmMainPage },
  },
  {
    initialRouteName: "DpmMainPage",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
