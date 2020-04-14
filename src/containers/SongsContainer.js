import { connect } from 'react-redux';
import { pauseSong, resumeSong } from '_actions/player';
import { deleteSong, getSongs } from '_actions/songs';
import Songs from '_components/Songs';

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
        resumeSong: () => dispatch(resumeSong()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
