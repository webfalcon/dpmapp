import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Text, View, Separator, Right, Body, Left, Picker, Form, List, ListItem, Item as FormItem } from "native-base";
import Slider from 'react-native-slider';
import { Ionicons } from '@expo/vector-icons';
import {TouchableWithoutFeedback, AsyncStorage } from 'react-native';

import PageHeader from '../PageHeader';
import styles from "./styles";
import bSt from "../bible/styles";
const Item = Picker.Item;


class Settings extends Component {
    constructor(props){
        super();
        this.state = {
            fontSize: 14,
            scheme : 'light',
            Verses : [{"Number":1,"Content":"  Սկզբումն Աստուած  ստեղծեց երկինքը եւ երկիրը։ \n","ID":"b1t1b1c1v1","intID":1101001001,},{"Number":2,"Content":" Եւ երկիրն  անձեւ ու դատարկ էր. եւ խաւար կար անդունդի վերայ. եւ  Աստուծոյ Հոգին շրջում էր ջրերի վերայ։ ","ID":"b1t1b1c1v2","intID":1101001002,},{"Number":3,"Content":" Եւ Աստուած ասեց,  Լոյս լինի. եւ լոյս եղաւ։ ","ID":"b1t1b1c1v3","intID":1101001003,},{"Number":4,"Content":" Եւ Աստուած տեսաւ լոյսը, որ բարի է։ Եւ Աստուած բաժանեց լոյսը խաւարիցը։ ","ID":"b1t1b1c1v4","intID":1101001004,},{"Number":5,"Content":" Եւ Աստուած լոյսը կոչեց Ցերեկ, եւ խաւարը կոչեց Գիշեր. եւ իրիկուն առաւօտ եղաւ՝ առաջին օրը։ \n","ID":"b1t1b1c1v5","intID":1101001005,},{"Number":6,"Content":" Եւ Աստուած ասեց.  Ջրերի մէջ տեղը հաստատութիւն լինի, որ ջրերը ջրերիցը բաժանէ։ ","ID":"b1t1b1c1v6","intID":1101001006,},{"Number":7,"Content":" Եւ Աստուած շինեց հաստատութիւնը, եւ բաժանեց  հաստատութեան տակի ջրերը  հաստատութեան վերայ եղող ջրերիցը։ Եւ այնպէս եղաւ։ ","ID":"b1t1b1c1v7","intID":1101001007,},{"Number":8,"Content":" Եւ Աստուած հաստատութիւնը կոչեց Երկինք։ Եւ իրիկուն եւ առաւօտ եղաւ՝ երկրորդ օրը։ \n","ID":"b1t1b1c1v8","intID":1101001008,},{"Number":9,"Content":" Եւ Աստուած ասեց.  Երկնքի տակի ջրերը մէկ տեղ ժողովուին, եւ ցամաքը երեւայ։ Եւ այնպէս եղաւ։ ","ID":"b1t1b1c1v9","intID":1101001009,},{"Number":10,"Content":" Եւ Աստուած ցամաքը կոչեց Երկիր, եւ ջրերի ժողովը կոչեց Ծով։ Եւ Աստուած տեսաւ, որ բարի է։ ","ID":"b1t1b1c1v10","intID":1101001010,}],
        };
        this.onSchemeSelect = this.onSchemeSelect.bind(this);

    }

    componentWillMount() {
        this.getSetting();
    }


    componentWillUnmount(){
        AsyncStorage.setItem('@DPMArmenia:fontSize', Math.floor(this.state.fontSize).toString());
        AsyncStorage.setItem('@DPMArmenia:scheme', this.state.scheme);
    }


     onSchemeSelect(value){
        this.setState({
            scheme: value
        });

    }

    async getSetting(){
        AsyncStorage.getItem('@DPMArmenia:fontSize').then((value) => {
            if(value !== null){
                this.setState({
                    fontSize: parseInt(value)
                });
                console.log(value);
            }

        });
        AsyncStorage.getItem('@DPMArmenia:scheme').then((value) => {
            if(value !== null){
                this.setState({
                    scheme: value
                });
                console.log(value);
            }
        });

    }



    render() {
        return (
            <Container>
                <PageHeader title="Կարգավորումներ" {...this.props} />
                    <Content>
                        <Separator bordered>
                            <Text>Ընտրել տառաչափը՝</Text>
                        </Separator>
                        <View padder>
                            <Slider
                                minimumValue={10}
                                maximumValue={26}
                                thumbTintColor="#0E5C85"
                                minimumTrackTintColor="#0E5C85"
                                value={this.state.fontSize}
                                onValueChange={(fontSize)=> this.setState({fontSize: fontSize})} />
                            <Text>Չափսը՝: {Math.floor(this.state.fontSize)}</Text>
                        </View>

                        <Separator bordered>
                            <Text>Գունային համադրություն՝</Text>
                        </Separator>
                        <View padder style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
                            <Button transparent style={[styles.schemeLight]} onPress={()=> this.onSchemeSelect('light')}>
                                <View style={styles.lightButtons}>
                                    <Ionicons style={styles.lightIcon} name="ios-sunny" size={32} color="white" />
                                </View>
                            </Button>
                            <Button transparent style={[styles.schemeDark]} onPress={()=> this.onSchemeSelect('dark')}>
                                <View style={styles.lightButtons}>
                                    <Ionicons style={styles.darkIcon} name="ios-moon" size={32} color="white" />
                                </View>
                            </Button>
                        </View>
                        <View>
                            <View style={[styles.headerContent, {backgroundColor: (this.state.scheme === 'light' ? '#328FBC' : '#000')}] }>
                                <Left>
                                    <Button
                                        transparent
                                    >
                                        <Icon style={styles.whiteIcon} name="arrow-back" />
                                    </Button>
                                </Left>
                                <Body>
                                <Title
                                    style={styles.pageTitle}>Ծննդոց 1</Title>
                                </Body>
                                <Right>
                                    <Button
                                        transparent>
                                        <Icon style={styles.whiteIcon} name="md-search" />
                                    </Button>
                                </Right>
                            </View>
                            <View style={{backgroundColor: (this.state.scheme === 'light' ? '#fafafa' : '#000')}}>
                                <View style={{backgroundColor: (this.state.scheme === 'light' ? '#fafafa' : '#000')}} padder>
                                    <Text style={[bSt.chDesc,{fontSize:(this.state.fontSize-2), color: (this.state.scheme === 'light' ? '#000' : '#fff')}]}>
                                        Աշխարհքի ստեղծագործութիւնը։ Մարդը ստեղծվում է Աստուծոյ պատկերով։
                                    </Text>
                                    <Text style={bSt.readingTexts}>
                                        {this.state.Verses.map((verse, key) => {
                                            return (
                                                <Text key={key}>
                                                    <Text style={[bSt.verseNum,{fontSize:(this.state.fontSize-4), color: (this.state.scheme === 'light' ? '#0E5C85' : '#fff')}]}>{verse.Number}</Text>
                                                    <Text style={[bSt.verse, {fontSize:this.state.fontSize, color: (this.state.scheme === 'light' ? '#000' : '#fff')}]}>{verse.Content}</Text>
                                                </Text>
                                            );
                                        })}
                                    </Text>
                                </View>
                            </View>

                        </View>

                    </Content>
            </Container>

        );
    }

}

export default Settings;