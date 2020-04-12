import TrackPlayer from 'react-native-track-player';
import { pauseSong, resumeSong } from '_actions/player';
import store from './store';

module.exports = async function() {
    TrackPlayer.addEventListener('remote-play', () => {
        store.dispatch(resumeSong());
    })

    TrackPlayer.addEventListener('remote-pause', () => {
        store.dispatch(pauseSong());
    });

    TrackPlayer.addEventListener('remote-next', () => {
        // TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-previous', () => {
        // TrackPlayer.skipToPrevious();
    });
};
