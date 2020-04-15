import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { addTrackPlayerListeners } from '_actions/player';
import rootReducer from '_reducers/';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['songs',],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk));

export const persistor = persistStore(store);
