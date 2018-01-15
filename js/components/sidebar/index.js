import React, { Component } from "react";
import  {Linking} from "react-native";
import {
	Content,
	Text,
	List,
    Body,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
	Header,
	Title
} from "native-base";

import styles from "./style";


const datas = [
	{
		name: "Ծրագրի Մասին",
		route: "http://www.derekprincearmenia.com/", // create page about app
		type: 'url',
		app: false
	},
	{
		name: "Կարգավորումներ",
		route: "Settings",
        type: 'route',
        app: false
	},
	{
		name: "Կապ Մեզ հետ",
		route: "http://www.derekprincearmenia.com/contact/",
        type: 'url',
        app: false
	},
	{
		name: "Նվիրատվություն",
		route: "http://www.derekprincearmenia.com/", // create donate page in website
        type: 'url',
        app: false
	},
	{
		name: "Վեբ Կայք",
		route: "http://www.derekprincearmenia.com/",
        type: 'url',
        app: false
	},
	{
		name: "Հայտնել Խնդրի մասին",
		route: "mailto:webfalcon.us@gmail.com",
        type: 'url',
        app: false
	},
	{
		name: "Ֆեյսբուք",
		route: "fb://profile/101273566605833",
        type: 'url',
        app: false
	},
    {
        name: "YouTube",
        route: "https://www.youtube.com/channel/UCK-cXqmlEtRwvHmXqEE1SSw",
        type: 'url',
        app: {
            name: 'youtube',
            link: 'https://www.youtube.com/channel/UCK-cXqmlEtRwvHmXqEE1SSw'
		}
    },
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
		this.goToLink = this.goToLink.bind(this);
	}


    goToLink(url, app){
        Linking.openURL(url);
	}
	render() {
		return (
			<Container style={styles.container}>
				<Header androidStatusBarColor="#fff" iosBarStyle="light-content" style={styles.menuHeader}>
					<Left>
						<Text style={styles.title}>DPM Armenia</Text>
					</Left>
					<Right>
						<Button
							transparent
							onPress={() => this.props.navigation.navigate("DrawerClose")}
						>
							<Icon style={styles.closeIcon} name="close" />
						</Button>
					</Right>
				</Header>
				<Content style={styles.sidebar} bounces={false} >
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem style={styles.listItem} button noBorder onPress={() =>
								data.type ==='route' ?
								this.props.navigation.navigate(data.route)
									:
                                    this.goToLink(data.route, data.app)

                            }>
								<Left>
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								<Right>
									<Icon name="arrow-forward" />
								</Right>
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
