import { alertConstants } from "redux/constants/alertConstants";

interface IAlertActions{
    type:alertConstants
    payload:{
        message:string
    }
}
export function alertReducer(state = {}, action:Action<IAlertActions>) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.payload
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.payload
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}