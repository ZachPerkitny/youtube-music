import * as constants from '_constants/songs';

export default function(state={
    isAdding: false,
    isLoading: false,
    nowPlaying: null,
    songs: [],
}, action) {
    switch (action.type) {
        case constants.ADD_SONG_START:
            return Object.assign({}, state, {
                isAdding: true,
            });
        case constants.ADD_SONG_SUCCESS:
            return Object.assign({}, state, {
                isAdding: false,
                songs: [...state.songs, action.song],
            });
        case constants.ADD_SONG_FAILURE:
            return Object.assign({}, state, {
                isAdding: false,
            });
        case constants.GET_SONGS_START:
            return Object.assign({}, state, {
                isLoading: true
            });
        case constants.GET_SONGS_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                songs: action.songs,
            });
        case constants.GET_SONGS_FAILURE:
            return Object.assign({}, state, {
                isLoading: false,
            });
        case constants.PLAY_SONG:
            return Object.assign({}, state, {
                nowPlaying: action.song,
            });
        default:
            return state;
    }
}
