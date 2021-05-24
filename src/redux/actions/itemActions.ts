
import { IItems, selectedColors, selectedShapes } from "api/data/types";
import { itemAction } from "./actionType";

export const setItemAction = (items:IItems) => {
  return{  
      type: itemAction.SET_ITEM,
        payload: items
    }
}

export const selectAllItemAction = (selectedColors:selectedColors,selectedShapes:selectedShapes)=>{
  return {
    type:itemAction.SELECT_ALL_ITEMS,
    payload:{
          selectedColors,
          selectedShapes
      }
    }
}