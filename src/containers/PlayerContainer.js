import { connect } from 'react-redux';
import {
    playSong,
    pauseSong,
    resumeSong,
    playPrev,
    playNext,
    toggleShuffle,
    toggleRepeat,
} from '_actions/player';
import Player from '_components/Player';

const mapStateToProps = (state) => {
    const { 
        player: {
            duration,
            isPlaying,
            nowPlaying,
            position,
            shuffle,
            repeat,
        },
    } = state;

    return {
        duration,
        isPlaying,
        nowPlaying,
        position,
        shuffle,
        repeat,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        playSong: id => dispatch(playSong(id)),
        pauseSong: () => dispatch(pauseSong()),
        resumeSong: () => dispatch(resumeSong()),
        playPrev: () => dispatch(playPrev()),
        playNext: () => dispatch(playNext()),
        toggleShuffle: () => dispatch(toggleShuffle()),
        toggleRepeat: () => dispatch(toggleRepeat()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
