import React, { Component } from "react";

import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Footer,
    FooterTab,
    Text,
    Body,
    Left,
    Right,
    Icon,
    View
} from "native-base";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Row, Grid } from 'react-native-easy-grid';


import {
    Dimensions,
    Image,
    Slider,
    TouchableHighlight,
} from 'react-native';
import { Asset, Audio, Font, Video } from 'expo';

class IconJnjel {
    constructor(module, width, height) {
        this.module = module;
        this.width = width;
        this.height = height;
    }
    componentWillMount(){
        Asset.fromModule(this.module).downloadAsync();
    }
}

const ICON_TRACK_1 = new IconJnjel(require('.../../../img/audiotrack.png'), 166, 5);
const ICON_THUMB_1 = new IconJnjel(require('../../../img/audiopick.png'), 26, 26);
const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const BUFFERING_STRING = 'ներբեռնում...';


import styles from "./styles";

class ReadingTools extends Component {
    constructor(props) {
        super(props);
        this.index = 0;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;
        this.state = {
            playing : false,
            loopingType: LOOPING_TYPE_ALL,
            muted: false,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            audioSource : '',
            audioSource : 'http://derekprince.ru/audiofiles/hy/',
            audio : '1/1.mp3',
            book : 0,
            chapter: 1
        };

        this.goForward = this.goForward.bind(this);
        this.goNext = this.goNext.bind(this);

    }

    componentWillMount(){
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        this._loadNewPlaybackInstance(false);
    }

    componentWillUnmount(){
        if(this.state.isPlaying)
            this._onPlayPausePressed();

    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance !== null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: false,
            isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
        };

        const { sound, status } = await Audio.Sound.create(
            { uri: this.state.audioSource+this.props.book + '/'+this.props.chapter+'.mp3' },
            initialStatus,
            this._onPlaybackStatusUpdate,
            false
        );
        this.playbackInstance = sound;

        this._updateScreenForLoading(false);
    }

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                isPlaying: false,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true,
            });
        } else {
            this.setState({
                isLoading: false,
            });
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                shouldCorrectPitch: status.shouldCorrectPitch,
            });
            this.props.changeFooterHeight(status.isPlaying);
            if (status.didJustFinish && !status.isLooping) {
                this.goNext();
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };


    _onPlayPausePressed = () => {
        if (this.playbackInstance !== null) {
            console.log(this.state);
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            } else {
                this.playbackInstance.playAsync();

            }
        }
    };

    _onForwardPressed = () => {
        if (this.playbackInstance !== null) {
            this._loadNewPlaybackInstance(this.state.isPlaying);
        }
    };

    _onBackPressed = () => {
        if (this.playbackInstance !== null) {
            this._loadNewPlaybackInstance(this.state.isPlaying);
        }
    };

    _onSeekSliderValueChange = value => {
        if (this.playbackInstance !== null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            //this.playbackInstance.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async value => {
        if (this.playbackInstance !== null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition(){
        if (
            this.playbackInstance !== null &&
            this.state.playbackInstancePosition !== null &&
            this.state.playbackInstanceDuration !== null
        ){
            return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance !== null &&
            this.state.playbackInstancePosition !== null &&
            this.state.playbackInstanceDuration !== null
        ) {
            return `${this._getMMSSFromMillis(
                this.state.playbackInstancePosition
            )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
        }
        return '';
    }


    goForward(){
        this.props.goForward();
        this._onForwardPressed();
    }

    goNext(){
        this.props.goNext();
        this._onBackPressed();
    }


    render() {
        return (
            <View style={[styles.footer, styles.headerContent, {height: (this.state.isPlaying ? 110 : 80)}]}>
                <Container>
                    <Grid>
                        {(this.state.isPlaying && !this.state.isLoading) &&
                            <Row style={{height: 30}}>
                                <View style={styles.audioContainer}>
                                    <View>
                                        <Slider
                                            style={styles.playbackSlider}
                                            trackImage={ICON_TRACK_1.module}
                                            thumbImage={ICON_THUMB_1.module}
                                            value={this._getSeekSliderPosition()}
                                            onValueChange={this._onSeekSliderValueChange}
                                            onSlidingComplete={this._onSeekSliderSlidingComplete}
                                            disabled={this.state.isLoading}
                                        />
                                        <View style={styles.timestampRow}>
                                            <Text style={styles.timestamp}>
                                                {this._getTimestamp()}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </Row>
                        }

                        <Row style={{height: 80 }}>
                            <Left>
                                <Button style={styles.leftRightChapter}
                                        transparent
                                        onPress={() => this.goForward()}>
                                    <MaterialIcons style={styles.arrowLeft} name="keyboard-arrow-left" />
                                </Button>
                            </Left>
                            <Body>
                            {this.state.isPlaying ?
                                <Button transparent style={styles.centeredButton} onPress={this._onPlayPausePressed}>
                                    <Ionicons style={styles.volumeIcon} name="ios-pause-outline" size={32} color="white" />
                                </Button>
                                :
                                <Button transparent style={styles.centeredButton} onPress={this._onPlayPausePressed}>
                                    <Ionicons style={styles.volumeIcon} name="ios-play-outline" size={32} color="white" />
                                </Button>
                            }
                            <Text style={styles.loadingSound}>
                                {this.state.isBuffering ? BUFFERING_STRING : ''}
                            </Text>

                            </Body>
                            <Right>
                                <Button style={styles.leftRightChapter}
                                        transparent
                                        onPress={() => this.goNext()}>
                                    <MaterialIcons style={styles.arrowRight} name="keyboard-arrow-right" />
                                </Button>
                            </Right>
                        </Row>
                    </Grid>
                </Container>
            </View>
        );
    }
}

export default ReadingTools;
