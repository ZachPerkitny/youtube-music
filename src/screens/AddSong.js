import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { addSong } from '_actions/songs';

class AddSong extends Component {
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

const mapStateToProps = (state) => {
    const { 
        songs: {
            isAdding,
        },
    } = state;

    return {
        isAdding,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addSong: (url) => dispatch(addSong(url)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSong);
