import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Divider, IconButton, Menu, Text, TouchableRipple } from 'react-native-paper';

class Song extends Component {
    static propTypes = {
        song: PropTypes.object.isRequired,

        onPress: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    }

    state = { menuOpen: false }

    onPress = () => {
        this.props.onPress(this.props.song);
    }

    onPressDelete = () => {
        this.props.onDelete(this.props.song);
    }

    closeMenu = () => {
        this.setState({ menuOpen: false });
    }

    openMenu = () => {
        this.setState({ menuOpen: true });
    }

    render() {
        return (
            <TouchableRipple style={styles.container} onPress={this.onPress}>
                <View style={styles.flex}>
                    <Text numberOfLines={1} style={{ flex: 1 }}>{this.props.song.name}</Text>
                    <Menu
                        visible={this.state.menuOpen}
                        onDismiss={this.closeMenu}
                        anchor={
                            <IconButton
                                icon="dots-vertical"
                                onPress={this.openMenu}
                            />
                        }
                    >
                        <Menu.Item title="Delete" onPress={this.onPressDelete}/>
                    </Menu>
                </View>
            </TouchableRipple>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 7.5,
    },
    flex: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
    },
});

export default Song;
