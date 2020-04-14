import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors, Headline, IconButton, ProgressBar, Text, withTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class Player extends Component {
    static propTypes = {
        duration: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        nowPlaying: PropTypes.object,
        position: PropTypes.number.isRequired,
        shuffle: PropTypes.bool.isRequired,
        repeat: PropTypes.bool.isRequired,

        playSong: PropTypes.func.isRequired,
        pauseSong: PropTypes.func.isRequired,
        resumeSong: PropTypes.func.isRequired,
        playPrev: PropTypes.func.isRequired,
        playNext: PropTypes.func.isRequired,
        toggleShuffle: PropTypes.func.isRequired,
        toggleRepeat: PropTypes.func.isRequired,
    }

    async componentDidMount() {
        const {
            nowPlaying,
            playSong,
            route,
        } = this.props;
        const { song } = route.params;
        if (!nowPlaying || nowPlaying.id !== song.id) {
            await playSong(song);
        }
    }

    onPressPause = async () => {
        await this.props.pauseSong();
    }

    onPressPlay = async () => {
        await this.props.resumeSong();
    }

    onPressPlayPrev = async () => {
        await this.props.playPrev();
    }

    onPressPlayNext = async () => {
        await this.props.playNext();
    }

    onPressShuffle = () => {
        this.props.toggleShuffle();
    }

    onPressRepeat = () => {
        this.props.toggleRepeat();
    }

    formatTime = (t) => {
        t = Math.round(t);
        const minutes = Math.floor(t / 60);
        const seconds = t % 60;
        return `${minutes}:${('0' + seconds).slice(-2)}`;
    }

    render() {
        const {
            duration,
            isPlaying,
            position,
            nowPlaying,
            theme,
            repeat,
            shuffle,
        } = this.props;
        return (nowPlaying) ? (
            <View style={styles.container}>
                <Headline numberOfLines={1}>
                    {nowPlaying.name}
                </Headline>
                <View style={styles.progress}>
                    <ProgressBar progress={position / duration}/>
                    <View style={styles.progressTime}>
                        <Text>{this.formatTime(position)}</Text>
                        <Text>{this.formatTime(duration)}</Text>
                    </View>
                </View>
                <View style={styles.controls}>
                    <IconButton
                        icon="shuffle"
                        size={30}
                        onPress={this.onPressShuffle}
                        color={(shuffle) ? theme.colors.primary : Colors.grey400}
                    />
                    <IconButton
                        icon="skip-previous"
                        size={30}
                        onPress={this.onPressPlayPrev}
                    />
                    {(isPlaying) ? (
                        <IconButton
                            icon="pause"
                            size={42}
                            onPress={this.onPressPause}
                            color={Colors.white}
                            style={styles.playControlButton}
                        />
                    ) : (
                        <IconButton
                            icon="play"
                            size={42}
                            onPress={this.onPressPlay}
                            color={Colors.white}
                            style={styles.playControlButton}
                        />
                    )}
                    <IconButton
                        icon="skip-next"
                        size={30}
                        onPress={this.onPressPlayNext}
                    />
                    <IconButton
                        icon="repeat"
                        size={30}
                        onPress={this.onPressRepeat}
                        color={(repeat) ? theme.colors.primary : Colors.grey400}
                    />
                </View>
            </View>
        ) : (null);
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 15,
    },
    controls: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    progress: {
        marginTop: 15,
    },
    progressTime: {
        marginTop: 7.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    playControlButton: {
        backgroundColor: Colors.grey800,
    },
});

export default withTheme(Player);
