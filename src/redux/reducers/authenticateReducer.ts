import { combineReducers } from "redux";
import { authState } from "redux/stores/authState";
import { LOGIN, LOGOUT, REGISTER } from "../constants/authConstants";

export const authReducer = combineReducers({
  register,
  login,
  logout
})

interface registerActionType {
  type: REGISTER
  payload: IUser|string
}

function register(state = authState, action: Action<registerActionType>) {
  const { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } = REGISTER

  switch (action.type) {
    case REGISTER_REQUEST:
      return {...state,loading: true };
    case REGISTER_SUCCESS:
      return {...state,payload:action.payload,loading:false,registered:true}
    case REGISTER_FAILURE:
      return Object.assign(state,{loading:false,registered:false})
    default:
      return state
  }
}


interface AuthActionType{
    type:LOGIN
    payload:IUser
}

function login(state = authState, action:Action<AuthActionType>) {
    const {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE} = LOGIN
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    case LOGIN_FAILURE:
      return {};
    default:
      return state
  }
}

interface Ilogout{
  type:LOGOUT

}
function logout(state=authState,action:Action<Ilogout>){
  switch (action.type) {
  case LOGOUT.LOGOUT:
    return {};
  default:
    return state
  }
}