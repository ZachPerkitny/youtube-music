import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Divider, FAB, Searchbar } from 'react-native-paper';
import { pauseSong, playSong, resumeSong } from '_actions/player';
import { deleteSong, getSongs } from '_actions/songs';
import MiniPlayer from '_components/MiniPlayer';
import Song from '_components/Song';

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onDeleteSong = this.onDeleteSong.bind(this);
        this.onPressSong = this.onPressSong.bind(this);
        this.onPressPause = this.onPressPause.bind(this);
        this.onPressPlay = this.onPressPlay.bind(this);
    }

    async componentDidMount() {
        await this.props.getSongs();
    }

    onChangeSearch(query) {
        this.setState({ query });
    }

    onPressAdd() {
        this.props.navigation.navigate('AddSong');
    }

    async onDeleteSong(song) {
        await this.props.deleteSong(song);
    }

    async onPressSong(song) {
        await this.props.playSong(song);
    }

    async onPressPause() {
        await this.props.pauseSong();
    }

    async onPressPlay() {
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
        const songElems = songs
            .filter(song => song.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
            .map((song, i) => {
                return <Song
                    onDelete={this.onDeleteSong}
                    onPress={this.onPressSong}
                    key={i}
                    song={song}
                />
            });
        return (
            <View style={styles.container}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={this.onChangeSearch}
                    value={query}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 64 }}>
                    { songElems }
                </ScrollView>
                <FAB
                    onPress={this.onPressAdd}
                    icon="plus"
                    style={(nowPlaying) ? styles.fabSongPlaying : styles.fab}
                />
                <MiniPlayer
                    isPlaying={isPlaying}
                    progress={position / duration}
                    onPlay={this.onPressPlay}
                    onPause={this.onPressPause}
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

const mapStateToProps = (state) => {
    const {
        player: {
            duration,
            isPlaying,
            nowPlaying,
            position,
        },
        songs: {
            isLoading,
            songs,
        },
    } = state;

    return {
        duration,
        isPlaying,
        nowPlaying,
        position,
        isLoading,
        songs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSong: song => dispatch(deleteSong(song)),
        getSongs: () => dispatch(getSongs()),
        pauseSong: () => dispatch(pauseSong()),
        playSong: song => dispatch(playSong(song)),
        resumeSong: () => dispatch(resumeSong()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
