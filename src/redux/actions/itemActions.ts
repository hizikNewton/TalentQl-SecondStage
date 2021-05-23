import { IItems } from "api/data/types";
import { itemAction } from "./actionType";

export const setItemAction = (items:IItems) => {
  return{  
      type: itemAction.SET_ITEM,
        payload: items
    }
}