import { combineReducers } from "redux";
import player from './player';
import songs from './songs';
import toasts from './toasts';

const rootReducer = combineReducers({
    player,
    songs,
    toasts,
});

export default rootReducer;
