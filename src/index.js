import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import { Provider } from 'react-redux';
import AddSong from '_screens/AddSong';
import Songs from '_screens/Songs';
import store from './store';

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
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        // TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        // TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
    compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        // TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        // TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
});

const App = () => (
    <Provider store={store}>
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen
                        name="Songs"
                        component={Songs}
                        options={{
                            ...TransitionPresets.SlideFromRightIOS,
                        }}
                    />
                    <Stack.Screen
                        name="AddSong"
                        component={AddSong}
                        options={{
                            title: "Add Song",
                            ...TransitionPresets.SlideFromRightIOS,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    </Provider>
);

export default App;
