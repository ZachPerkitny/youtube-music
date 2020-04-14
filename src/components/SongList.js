import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import Song from '_components/Song';

class SongList extends Component {
    static propTypes = {
        songs: PropTypes.object.isRequired,

        onDeleteSong: PropTypes.func.isRequired,
        onPressSong: PropTypes.func.isRequired,
    }

    onDeleteSong = (song) => {
        this.props.onDeleteSong(song);
    }

    onPressSong = (song) => {
        this.props.onPressSong(song);
    }

    render() {
        const {
            filter,
            songs,
            style,
        } = this.props;
        const songElems = Object.values(songs)
            .filter(song => song.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
            .map((song, i) => {
                return <Song
                    onDelete={this.onDeleteSong}
                    onPress={this.onPressSong}
                    key={i}
                    song={song}
                />
            });

        return (
            <ScrollView contentContainerStyle={style}>
                {songElems}
            </ScrollView>
        );
    }
}

export default SongList;
