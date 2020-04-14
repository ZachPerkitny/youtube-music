import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

class AddSong extends Component {
    static propTypes = {
        isAdding: PropTypes.bool.isRequired,

        addSong: PropTypes.func.isRequired,
    }

    state = { url: '' }

    handleChange = (text) => {
        this.setState({ url: text });
    }

    handleDownload = async () => {
        if (this.state.url) {
            await this.props.addSong(this.state.url);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.props.isAdding &&
                <View>
                    <TextInput
                        disabled={this.props.isAdding}
                        placeholder="Enter YouTube URL..."
                        style={styles.textField}
                        onChangeText={this.handleChange}
                        value={this.state.url}
                    />
                    <Button onPress={this.handleDownload} mode="contained">
                        Download
                    </Button>
                </View>
                }
                {this.props.isAdding && <ActivityIndicator size="large"/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginRight: 15,
        marginLeft: 15,
    },
    textField: {
        marginBottom: 15,
    },
});

export default AddSong;
