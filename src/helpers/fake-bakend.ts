
interface IUserResponse extends Partial<IUser>{
    id:number,
    token:string
}

export function configureFakeBackend() {
    window.fetch = function (url:RequestInfo, opts:RequestInit|undefined) {
        
        let myurl = url.toString()
        return new Promise<Response>((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                if (myurl.endsWith('/users/authenticate') && opts?.method === 'POST') {
                    let params = JSON.parse(opts?.body?.toString() as string);

                    if (params.username==='isaac'&&params.password==='bamidele') {
                        // if login details are valid return user details and fake jwt token

                        let user = {
                            username:'hizik',
                            fullname:'Isaac Bamidele',
                            id:123456
                        };
                        let responseJson:IUserResponse = {
                            id: user.id as number,
                            username: user.username,
                            fullname:user.fullname,
                            token: 'fake-jwt-token'
                        }
                        const response = new Response(JSON.stringify(responseJson))
                        resolve({ 
                                    ok: true,
                                    text: () => Promise.resolve(response.text())
                                } as Response);
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }
                }
                
            }, 500);
        });
    }
}