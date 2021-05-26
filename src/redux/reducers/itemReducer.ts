
import {Ifilters, IItems} from "api/data/types";
import storage,{ getSessionStorage, setSessionStorage } from "helpers/storage";
import { IAction, itemAction} from "redux/actions";
import { IItemStore, itemStore } from "redux/stores";

const handleSetSessionStorage = (where:keyof typeof storage,data: IItemStore) => {
  setSessionStorage(storage[where], data);
};

export const itemReducer = (state = itemStore,action:IAction):IItemStore => {

    const item_storage = getSessionStorage(storage.items);
    const filter_storage = getSessionStorage(storage.filters);
    switch (action.type) {
      
      case itemAction.SET_ITEM:{
        const newState = {...item_storage,...action.payload}
        handleSetSessionStorage('items',newState);
        return Object.assign({},state,{items:action.payload} );
      }

      case itemAction.SELECT_ALL_ITEMS:{
        let new_storage = {...filter_storage}
        const payload = action.payload as Ifilters
        const newState= {...new_storage,...action.payload}
        handleSetSessionStorage('filters',newState);
        if(payload.selectedColors && payload.selectedShapes){
          return Object.assign({},state,{filters:action.payload});
        }
        else if(payload.selectedColors){
          return Object.assign({},state,{filters:{selectedColors:action.payload}});
        }
        else if(payload.selectedShapes){
          console.log(action.payload)
          return Object.assign({},state,{filters:{selectedShapes:action.payload}});
        }
        else{
          return state
        }
      }

      case itemAction.FILTER_COLOR:{
        const {selectedColors} = action.payload as Ifilters
        const userSelected = selectedColors.map(color=>color)
        const items:IItems= Object.values(item_storage)
        const newState = items.filter(({color})=>{return userSelected.includes(color)})
        return Object.assign({},state,{items:newState});
      }

      case itemAction.FILTER_SHAPE:{
        const {selectedShapes} = action.payload as Ifilters 
        const userSelected = selectedShapes.map(shape=>shape)
        const items:IItems= Object.values(item_storage)
        const newState = items.filter(({shape})=>{return userSelected.includes(shape)})
        return Object.assign({},state,{items:newState});
      }

      case itemAction.UPDATE_TITLE:{
        return Object.assign({},state,{title:action.payload})
      }
    default:
      return state;
  }
};