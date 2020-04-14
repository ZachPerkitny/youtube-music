import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Headline, IconButton, ProgressBar, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class LargePlayer extends Component {
    onPressPause = () => {
        const { onPressPause } = this.props;
        if (onPressPause) onPressPause();
    }

    onPressPlay = () => {
        const { onPressPlay } = this.props;
        if (onPressPlay) onPressPlay();
    }

    onPressPlayPrev = () => {
        const { onPressPlayPrev } = this.props;
        if (onPressPlayPrev) onPressPlayPrev();
    }

    onPressPlayNext = () => {
        const { onPressPlayNext } = this.props;
        if (onPressPlayNext) onPressPlayNext();
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
            song,
            style,
        } = this.props;
        return (song) ? (
            <View style={Object.assign({}, styles.container, style)}>
                <Headline numberOfLines={1}>
                    {song.name}
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

export default LargePlayer;
