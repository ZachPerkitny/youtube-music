import * as constants from '_constants/toasts';

let id = 0;

export function addToast(message) {
    return {
        toast: {
            id: id++,
            message,
        },
        type: constants.ADD_TOAST,
    }
}

export function removeToast(id) {
    return {
        id,
        type: constants.REMOVE_TOAST,
    }
}
