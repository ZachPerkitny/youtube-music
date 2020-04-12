import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressBar, Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class MiniPlayer extends Component {
    render() {
        const {
            onPause,
            onPlay,
            isPlaying,
            progress,
            song,
            style,
        } = this.props;
        return (song) ? (
            <Surface style={Object.assign({}, styles.container, style)}>
                <ProgressBar progress={progress}/>
                <View style={styles.songAndControls}>
                    <Text numberOfLines={1} style={{ flex: 1 }}>{song.name}</Text>
                    {(isPlaying) ? (
                        <Icon name="pause" size={30} onPress={onPause}/>
                    ) : (
                        <Icon name="play-arrow" size={30} onPress={onPlay}/>
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
