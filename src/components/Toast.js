import React, { Component } from 'react';
import { Snackbar } from 'react-native-paper';

class Toast extends Component {
    state = { visible: true }

    onDismiss = () => {
        this.setState({
            visible: false
        });
        const { onDismiss } = this.props;
        if (onDismiss) {
            onDismiss();
        }
    }

    render() {
        const {
            children,
            duration = 3500,
        } = this.props;

        return (
            <Snackbar
                duration={duration}
                onDismiss={this.onDismiss}
                visible={this.state.visible}
            >
                {this.props.children}
            </Snackbar>
        );
    }
}

export default Toast;
