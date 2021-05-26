let user:IUser = JSON.parse(localStorage.getItem('user') as string);
const initialState = user ? { loggedIn: true, user } : {};

export interface IAuthState{
    loading:boolean;
    registered:boolean|null;
    initialState:{
        loggedIn?:boolean,
        user?:IUser
    }
}

export const authState:IAuthState = {
    loading:false,
    registered:null,
    initialState
  }