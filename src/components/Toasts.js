import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { removeToast } from '_actions/toasts';
import Toast from '_components/Toast';

class Toasts extends Component {
    onDismiss = (id) => {
        this.props.removeToast(id);
    }

    render() {
        const toasts = this.props.toasts.map(toast => {
            return (
                <Toast
                    onDismiss={() => this.onDismiss(toast.id)}
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

const mapStateToProps = (state) => {
    return { toasts: state.toasts, }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeToast: id => dispatch(removeToast(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
