import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, ProgressBar, Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class MiniPlayer extends Component {
    onPressSong = () => {
        const { onPressSong, song } = this.props;
        if (onPressSong) onPressSong(song);
    }

    onPressPause = () => {
        const { onPressPause, song } = this.props;
        if (onPressPause) onPressPause(song);
    }

    onPressPlay = () => {
        const { onPressPlay, song } = this.props;
        if (onPressPlay) onPressPlay(song);
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
            <Surface style={Object.assign({}, styles.container, style)}>
                <ProgressBar progress={position / duration}/>
                <View style={styles.songAndControls}>
                    <Text onPress={this.onPressSong} numberOfLines={1} style={{ flex: 1 }}>{song.name}</Text>
                    {(isPlaying) ? (
                        <IconButton icon="pause" size={30} onPress={this.onPressPause}/>
                    ) : (
                        <IconButton icon="play" size={30} onPress={this.onPressPlay}/>
                    )}
                </View>
            </Surface>
        ) : (null);
    }
}

const styles = StyleSheet.create({
    container: {
        height: 64,
        elevation: 4,
    },
    songAndControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        flex: 1,
    },
});

export default MiniPlayer;
