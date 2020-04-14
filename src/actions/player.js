import TrackPlayer from 'react-native-track-player';
import * as constants from '_constants/player';

async function getProgress() {
    const [position, bufferedPosition, duration] = await Promise.all([
        TrackPlayer.getPosition(),
        TrackPlayer.getBufferedPosition(),
        TrackPlayer.getDuration()
    ]);
    return { position, bufferedPosition, duration };
}

function setProgress({ position, bufferedPosition, duration }) {
    return {
        type: constants.SET_PROGRESS,
        position,
        bufferedPosition,
        duration,
    }
}

let timer = null;
function startProgressTimer(dispatch) {
    timer = setInterval(async function() {
        const progress = await getProgress();
        dispatch(setProgress(progress));
    }, 500);
}

export function playSong(song) {
    return async function(dispatch, getState) {
        const {
            nowPlaying
        } = getState().player;
        await TrackPlayer.stop();
        await TrackPlayer.add({
            id: song.id,
            url: song.path,
            title: song.name,
        });
        if (nowPlaying) {
            await TrackPlayer.skip(song.id);
            await TrackPlayer.remove(nowPlaying.id);
        }
        await TrackPlayer.play();
        const progress = await getProgress();
        dispatch(setProgress(progress));
        startProgressTimer(dispatch);
        dispatch({
            type: constants.PLAY_SONG,
            song,
        });
    }
}

export function pauseSong() {
    return async function(dispatch) {
        clearInterval(timer);
        await TrackPlayer.pause();
        dispatch({
            type: constants.PAUSE_SONG
        });
    }
}

export function resumeSong() {
    return async function(dispatch) {
        await TrackPlayer.play();
        startProgressTimer(dispatch);
        dispatch({
            type: constants.RESUME_SONG,
        });
    }
}

export function playPrev() {
    return async function(dispatch, getState) {
        const state = getState();
        const {
            ids,
            songs,
        } = state.songs;
        const { nowPlaying } = state.player;
        const index = ids.indexOf(nowPlaying.id);
        let song;
        if (index - 1 < 0) {
            song = songs[ids[ids.length - 1]];
        } else {
            song = songs[ids[index - 1]];
        }
        dispatch(playSong(song));
    }
}

export function playNext() {
    return async function(dispatch, getState) {
        const state = getState();
        const {
            ids,
            songs,
        } = state.songs;
        const {
            nowPlaying,
            shuffle,
            repeat,
        } = state.player;
        let song;
        if (shuffle) {
            const nowPlayingIndex = ids.indexOf(nowPlaying.id);
            let index;
            do {
                index = Math.floor(Math.random() * ids.length);
            } while (index === nowPlayingIndex);
            song = songs[ids[index]];
        } else if (repeat) {
            song = nowPlaying;
        } else {
            const index = ids.indexOf(nowPlaying.id);
            if (index + 1 >= ids.length) {
                song = songs[ids[0]];
            } else {
                song = songs[ids[index + 1]];
            }
        }
        dispatch(playSong(song));
    }
}

export function toggleShuffle() {
    return {
        type: constants.TOGGLE_SHUFFLE,
    }
}

export function toggleRepeat() {
    return {
        type: constants.TOGGLE_REPEAT,
    }
}
