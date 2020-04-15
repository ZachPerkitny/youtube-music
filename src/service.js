import TrackPlayer from 'react-native-track-player';
import { pauseSong, resumeSong, playPrev, playNext } from '_actions/player';
import { store } from './store';

module.exports = async function() {
    TrackPlayer.addEventListener('remote-play', () => {
        store.dispatch(resumeSong());
    });

    TrackPlayer.addEventListener('remote-pause', () => {
        store.dispatch(pauseSong());
    });

    TrackPlayer.addEventListener('remote-previous', () => {
        store.dispatch(playPrev());
    });

    TrackPlayer.addEventListener('remote-next', () => {
        store.dispatch(playNext());
    });

    TrackPlayer.addEventListener('playback-queue-ended', ({ track }) => {
        if (track) store.dispatch(playNext());
    });
};
