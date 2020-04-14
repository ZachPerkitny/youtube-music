import * as constants from '_constants/player';

export default function(state={
    bufferedPosition: 0,
    position: 0,
    duration: 0,
    isPlaying: false,
    nowPlaying: null,
    shuffle: false,
    repeat: false,
}, action) {
    switch (action.type) {
        case constants.PLAY_SONG:
            return Object.assign({}, state, {
                isPlaying: true,
                nowPlaying: action.song,
            });
        case constants.PAUSE_SONG:
            return Object.assign({}, state, {
                isPlaying: false,
            });
        case constants.RESUME_SONG:
            return Object.assign({}, state, {
                isPlaying: true,
            });
        case constants.SET_PROGRESS:
            return Object.assign({}, state, {
                bufferedPosition: action.bufferedPosition,
                position: action.position,
                duration: action.duration,
            });
        case constants.TOGGLE_SHUFFLE:
            return Object.assign({}, state, {
                shuffle: !state.shuffle,
            });
        case constants.TOGGLE_REPEAT:
            return Object.assign({}, state, {
                repeat: !state.repeat,
            });
        default:
            return state;
    }
}
