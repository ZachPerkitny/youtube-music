import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback, View, ViewPropTypes, StyleSheet } from 'react-native';
import { IconButton, ProgressBar, Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

class MiniPlayer extends Component {
    static propTypes = {
        duration: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        position: PropTypes.number.isRequired,
        song: PropTypes.object,

        style: ViewPropTypes.style,

        onPressSong: PropTypes.func.isRequired,
        onPressPause: PropTypes.func.isRequired,
        onPressPlay: PropTypes.func.isRequired,
    }

    onPressSong = () => {
        const { onPressSong, song } = this.props;
        onPressSong(song);
    }

    onPressPause = () => {
        const { onPressPause, song } = this.props;
        onPressPause(song);
    }

    onPressPlay = () => {
        const { onPressPlay, song } = this.props;
        onPressPlay(song);
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
                <TouchableWithoutFeedback onPress={this.onPressSong}>
                    <View style={styles.songAndControls}>
                        <Image
                            source={{ uri: `file://${song.thumbnailPath}` }}
                            style={styles.thumbnail}
                        />
                        <Text numberOfLines={1} style={{ flex: 1 }}>{song.name}</Text>
                        {(isPlaying) ? (
                            <IconButton icon="pause" size={30} onPress={this.onPressPause}/>
                        ) : (
                            <IconButton icon="play" size={30} onPress={this.onPressPlay}/>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </Surface>
        ) : (null);
    }
}

const styles = StyleSheet.create({
    container: {
        height: 64,
        elevation: 4,
    },
    thumbnail: {
        height: 48,
        width: 48,
        borderWidth: 1,
        borderRadius: 24,
        marginRight: 15,
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
