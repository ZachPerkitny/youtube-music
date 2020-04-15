import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ActivityIndicator, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import TrackPlayer, { Capability } from 'react-native-track-player';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import AddSongContainer from '_containers/AddSongContainer';
import PlayerContainer from '_containers/PlayerContainer';
import SongsContainer from '_containers/SongsContainer';
import ToastsContainer from '_containers/ToastsContainer';
import { store, persistor } from './store';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#2196F3',
        accent: '#E91E63'
    }
};

const Stack = createStackNavigator();

TrackPlayer.setupPlayer();
TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
    ],
    compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
    ],
});

const App = () => (
    <Provider store={store}>
        <PaperProvider theme={theme}>
            <PersistGate
                loading={(
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large"/>
                    </View>
                )}
                persistor={persistor}
            >
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                    >
                        <Stack.Screen
                            name="Songs"
                            component={SongsContainer}
                            options={{
                                ...TransitionPresets.SlideFromRightIOS,
                            }}
                        />
                        <Stack.Screen
                            name="AddSong"
                            component={AddSongContainer}
                            options={{
                                title: "Add Song",
                                ...TransitionPresets.SlideFromRightIOS,
                            }}
                        />
                        <Stack.Screen
                            name="Player"
                            component={PlayerContainer}
                            options={{
                                ...TransitionPresets.SlideFromRightIOS,
                            }}
                        />
                    </Stack.Navigator>
                    <ToastsContainer/>
                </NavigationContainer>
            </PersistGate>
        </PaperProvider>
    </Provider>
);

export default App;
