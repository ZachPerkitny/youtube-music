import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Song from '_components/Song';

class SongList extends Component {
    onDeleteSong = (song) => {
        const { onDeleteSong } = this.props;
        if (onDeleteSong) {
            onDeleteSong(song);
        }
    }

    onPressSong = (song) => {
        const { onPressSong } = this.props;
        if (onPressSong) {
            onPressSong(song);
        }
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
