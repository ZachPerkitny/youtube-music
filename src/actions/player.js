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
    }, 1000);
}

export function playSong(song) {
    return async function(dispatch, getState) {
        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: song.id,
            url: song.path,
        });
        await TrackPlayer.play();
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
