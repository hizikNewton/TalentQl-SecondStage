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
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
async function handleResponse(response: Response) {

    response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            console.log('ee',response)
            if (response.status === 401) {
                const location  = new Location()
                logout();
                location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
    });
        return response;
}