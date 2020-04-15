import * as constants from '_constants/songs';

export default function(state={
    isAdding: false,
    isDeleting: false,
    ids: [],
    songs: {},
}, action) {
    switch (action.type) {
        case constants.ADD_SONG_START:
            return Object.assign({}, state, {
                isAdding: true,
            });
        case constants.ADD_SONG_SUCCESS:
            return Object.assign({}, state, {
                isAdding: false,
                ids: [...state.ids, action.song.id],
                songs: {
                    ...state.songs,
                    [action.song.id]: action.song,
                },
            });
        case constants.ADD_SONG_FAILURE:
            return Object.assign({}, state, {
                isAdding: false,
            });
        case constants.DELETE_SONG_START:
            return Object.assign({}, state, {
                isDeleting: true,
            });
        case constants.DELETE_SONG_SUCCESS: {
            const songs = Object.keys(state.songs).reduce((acc, id) => {
                if (id !== action.id) acc[id] = state.songs[id];
                return acc;
            }, {});
            const index = state.ids.indexOf(action.id);
            return Object.assign({}, state, {
                isDeleting: false,
                ids: [
                    ...state.ids.slice(0, index),
                    ...state.ids.slice(index + 1),
                ],
                songs,
            });
        }
        case constants.DELETE_SONG_FAILURE:
            return Object.assign({}, state, {
                isDeleting: false,
            });
        default:
            return state;
    }
}
