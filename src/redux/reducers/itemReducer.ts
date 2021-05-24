import { IItems } from "api/data/types";
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
        const new_storage = {...item_storage}
        const newState = {...new_storage,...action.payload}
        handleSetSessionStorage('items',newState);
        console.log('pl',action.payload)
        console.log('yo',state)
        return Object.assign({},{...state},{items:action.payload as IItems} );
      }

      case itemAction.SELECT_ALL_ITEMS:{
        let new_storage = {...filter_storage}
        const newState= {...new_storage,...action.payload}
        handleSetSessionStorage('filters',newState);
        return Object.assign({},state,{filters:action.payload});
      }

    default:
      return state;
  }
};