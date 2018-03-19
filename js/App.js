import React from "react";

import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import DpmMainPage from "./components/Main";
import DpmCalendar from "./components/calendar/Calendar";
import Bible from "./components/bible/Bible";
import BibleSearch from "./components/bible/Search";
import Reading from "./components/bible/Reading";
import DerekPrince from "./components/pages/DerekPrince";
import Books from "./components/pages/Books";
import Settings from "./components/pages/Settings";
import Sermons from "./components/pages/Sermons";
import News from "./components/pages/News";
import Videos from "./components/pages/Videos";
import SinglePage from "./components/pages/SinglePage";
import SingleDay from "./components/calendar/SingleDay";

const AppNavigator = StackNavigator(
    {
      /* DPM START */
        Drawer: { screen: Drawer },
        DpmMainPage : {screen: DpmMainPage },
        DpmCalendar : {screen: DpmCalendar },
        Bible : {screen: Bible},
        BibleSearch : {screen: BibleSearch},
        DerekPrince : {screen: DerekPrince},
        Books : {screen: Books},
        Sermons : {screen: Sermons},
        News : {screen: News},
        Videos : {screen: Videos},
        SinglePage : {screen: SinglePage},
        SingleDay : {screen: SingleDay},
        Reading : {screen: Reading},
        Settings : {screen: Settings},
      /* DPM END START */
    },
    {
        initialRouteName: "Drawer",
        headerMode: "none",
    }
);

export default () =>

    <Root>
        <AppNavigator />
    </Root>;
