import { alertConstants } from "redux/constants/alertConstants";



function success(message:string) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message:string) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}

export const alertActions = {
    success,
    error,
    clear
};
