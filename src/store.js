import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import playerReducer from '_reducers/player';
import songsReducer from '_reducers/songs';
import toastsReducer from '_reducers/toasts';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['songs',],
}

const songsConfig = {
    key: 'songs',
    storage: AsyncStorage,
    whitelist: ['songs', 'ids',],
}

const rootReducer = combineReducers({
    player: playerReducer,
    songs: persistReducer(songsConfig, songsReducer),
    toasts: toastsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk));

export const persistor = persistStore(store);
