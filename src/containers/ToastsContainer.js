import { connect } from 'react-redux';
import { removeToast } from '_actions/toasts';
import Toasts from '_components/Toasts';

const mapStateToProps = (state) => {
    return { toasts: state.toasts, }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeToast: id => dispatch(removeToast(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
