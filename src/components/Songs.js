import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Divider, FAB, Searchbar } from 'react-native-paper';
import MiniPlayer from '_components/MiniPlayer';
import SongList from '_components/SongList';

class Songs extends Component {
    static propTypes = {
        duration: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        nowPlaying: PropTypes.object,
        position: PropTypes.number.isRequired,
        songs: PropTypes.object.isRequired,

        pauseSong: PropTypes.func.isRequired,
        resumeSong: PropTypes.func.isRequired,
    }

    state = { query: '' }

    onChangeSearch = (query) => {
        this.setState({ query });
    }

    onPressAdd = () => {
        this.props.navigation.navigate('AddSong');
    }

    onDeleteSong = async (song) => {
        await this.props.deleteSong(song);
    }

    onPressSong = (song) => {
        this.props.navigation.navigate('Player', { song });
    }

    onPressPause = async () => {
        await this.props.pauseSong();
    }

    onPressPlay = async () => {
        await this.props.resumeSong();
    }

    render() {
        const {
            duration,
            isPlaying,
            nowPlaying,
            position,
            songs,
        } = this.props;
        const { query } = this.state;
        return (
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={query}
                />
                <SongList
                    filter={query}
                    onDeleteSong={this.onDeleteSong}
                    onPressSong={this.onPressSong}
                    songs={songs}
                    style={{ flexGrow: 1, paddingBottom: 64 }}
                />
                <FAB
                    onPress={this.onPressAdd}
                    icon="plus"
                    style={(nowPlaying) ? styles.fabSongPlaying : styles.fab}
                />
                <MiniPlayer
                    isPlaying={isPlaying}
                    duration={duration}
                    position={position}
                    onPressSong={this.onPressSong}
                    onPressPlay={this.onPressPlay}
                    onPressPause={this.onPressPause}
                    song={nowPlaying}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottom: {
        flexDirection: 'column',
        flex: 0,
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    fabSongPlaying: {
        position: 'absolute',
        bottom: 76,
        right: 15,
    }
});

export default Songs;
