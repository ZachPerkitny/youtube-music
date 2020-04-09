import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, TouchableRipple } from 'react-native-paper';

class Song extends Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        this.props.onPress(this.props.song);
    }

    render() {
        return (
            <TouchableRipple style={styles.container} onPress={this.onPress}>
                <View style={styles.flex}>
                    <Text>{this.props.song.name}</Text>
                    <IconButton icon="dots-vertical" style={styles.button}/>
                </View>
            </TouchableRipple>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 7.5,
        paddingTop: 7.5,
    },
    flex: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

export default Song;
