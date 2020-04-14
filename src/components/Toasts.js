import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Toast from '_components/Toast';

class Toasts extends Component {
    static propTypes = {
        toasts: PropTypes.array.isRequired,

        removeToast: PropTypes.func.isRequired,
    }

    onDismiss = (id) => {
        this.props.removeToast(id);
    }

    render() {
        const toasts = this.props.toasts.map((toast, i) => {
            return (
                <Toast
                    onDismiss={() => this.onDismiss(toast.id)}
                    key={i}
                >
                    {toast.message}
                </Toast>
            );
        });

        return (
            <View>
                {toasts}
            </View>
        );
    }
}

export default Toasts;
