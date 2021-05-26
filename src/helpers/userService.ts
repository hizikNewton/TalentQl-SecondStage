import createHistory from 'history/createBrowserHistory'
const history = createHistory();

export const userService = {
    login,
    logout,
};

async function login(username: string, password: string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const response = await fetch(`/users/authenticate`, requestOptions);
    const user = await handleResponse(response);
    return user;
}

function logout() {
}
async function handleResponse(response: Response) {

    response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                const location  = new Location()
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log('correct')
        history.go(0)
    });
        return response;
}