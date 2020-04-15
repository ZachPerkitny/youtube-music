import TrackPlayer, { Event  } from 'react-native-track-player';
import { pauseSong, resumeSong, playPrev, playNext } from '_actions/player';
import { store } from './store';

module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        store.dispatch(resumeSong());
    });

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        store.dispatch(pauseSong());
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        store.dispatch(playPrev());
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        store.dispatch(playNext());
    });

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, ({ track }) => {
        if (track) store.dispatch(playNext());
    });
};
