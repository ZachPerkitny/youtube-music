import { combineReducers } from "redux";
import player from './player';
import songs from './songs';

const rootReducer = combineReducers({
    player,
    songs
});

export default rootReducer;
