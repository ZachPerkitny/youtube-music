import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { addTrackPlayerListeners } from '_actions/player';
import rootReducer from '_reducers/';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk));

export default store;
