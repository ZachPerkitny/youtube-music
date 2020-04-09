import React, { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Divider, FAB, Searchbar } from 'react-native-paper';
import { getSongs, playSong } from '_actions/songs';
import Song from '_components/Song';

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = { query: '' };

        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onPressAdd = this.onPressAdd.bind(this);
        this.onPressSong = this.onPressSong.bind(this);
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

    async onPressSong(song) {
        await this.props.playSong(song);
    }

    render() {
        const { query } = this.state;
        const songs = this.props.songs
            .filter(song => song.name.indexOf(query) !== -1)
            .map((song, i) => {
                return <Song
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
                { songs }
                <FAB
                    onPress={this.onPressAdd}
                    icon="plus"
                    style={styles.fab}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
});

const mapStateToProps = (state) => {
    const { 
        songs: {
            isLoading,
            songs,
        },
    } = state;

    return {
        isLoading,
        songs,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSongs: () => dispatch(getSongs()),
        playSong: (song) => dispatch(playSong(song)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
