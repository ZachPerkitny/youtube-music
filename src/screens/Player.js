import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { playSong, pauseSong, resumeSong, playPrev, playNext } from '_actions/player';
import LargePlayer from '_components/LargePlayer';

class Player extends Component {
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

    render() {
        const {
            duration,
            isPlaying,
            nowPlaying,
            position,
        } = this.props;
        return (
            <LargePlayer
                isPlaying={isPlaying}
                duration={duration}
                position={position}
                onPressPause={this.onPressPause}
                onPressPlay={this.onPressPlay}
                onPressPlayPrev={this.onPressPlayPrev}
                onPressPlayNext={this.onPressPlayNext}
                song={nowPlaying}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        player: {
            duration,
            isPlaying,
            nowPlaying,
            position,
        },
    } = state;

    return {
        duration,
        isPlaying,
        nowPlaying,
        position,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        playSong: song => dispatch(playSong(song)),
        pauseSong: () => dispatch(pauseSong()),
        resumeSong: () => dispatch(resumeSong()),
        playPrev: () => dispatch(playPrev()),
        playNext: () => dispatch(playNext()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
