import { LOGIN, LOGOUT } from "../constants/authConstants";
import { alertActions } from "./alertActions";
import history from "helpers/history";
import { userService } from "helpers/userService";

export const authActions = {
    login,
    logout
}

function login(username: string, password: string) {
    return (dispatch: any) => {
        dispatch(request(username));

        userService.login(username, password)
            .then(
                res => {
                    dispatch(success(res));
                    dispatch(alertActions.success('Login successful'));
                    history.push('/home')
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(username: string) { return { type: LOGIN.LOGIN_REQUEST, username } }
    function success(res:Response) { return { type: LOGIN.LOGIN_SUCCESS, res } }
    function failure(error: Error) { return { type: LOGIN.LOGIN_FAILURE, error } }
}

function logout() {
    return (dispatch: any) => {
        dispatch(request())
            userService.logout();
    }
    function request() { return { type: LOGOUT.LOGOUT }; }
}
