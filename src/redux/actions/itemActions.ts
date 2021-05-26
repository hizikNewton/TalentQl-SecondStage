
import { IItems, selectedColors, selectedShapes } from "api/data/types";
import { itemAction } from "./actionType";

export const setItemAction = (items:IItems) => {
  return{  
      type: itemAction.SET_ITEM,
        payload: items
    }
}

export const selectAllItemAction = (selectedColors?:selectedColors,selectedShapes?:selectedShapes)=>{
  return {
    type:itemAction.SELECT_ALL_ITEMS,
    payload:{
          selectedColors,
          selectedShapes
      }
    }
}

export const filterShapeAction = (selectedShapes:selectedShapes)=>{
  return {
    type:itemAction.FILTER_SHAPE,
    payload:{
          selectedShapes
      }
    }
}


export const filterColorAction = (selectedColors:selectedColors)=>{
  return {
    type:itemAction.FILTER_COLOR,
    payload:{
          selectedColors
      }
    }
}

export const updateTitleAction = (title:string)=>{
 return{ 
    type:itemAction.UPDATE_TITLE,
    payload:title
  }

}