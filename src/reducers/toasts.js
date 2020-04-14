import * as constants from '_constants/toasts';

export default function(state=[], action) {
    switch (action.type) {
        case constants.ADD_TOAST:
            return [action.toast, ...state];
        case constants.REMOVE_TOAST:
            return state.filter(toast => toast.id !== action.id);
        default:
            return state;
    }
}
