import storage,{ getSessionStorage, setSessionStorage } from "helpers/storage";
import { IAction, itemAction} from "redux/actions";
import { IItemStore, itemStore } from "redux/stores";

const handleSetSessionStorage = (data: IItemStore) => {
  setSessionStorage(storage.items, data);
};

export const itemReducer = (state = itemStore,action:IAction):IItemStore => {
    const item_storage = getSessionStorage(storage.items);
  
    switch (action.type) {
      case itemAction.SET_ITEM:{
        const newStorage = { ...item_storage };
        newStorage['items'] = action.payload
        const newState = {
          ...item_storage,
          ...newStorage
        };
        handleSetSessionStorage(newState);
        console.log(getSessionStorage(storage.items))
        return newState;
      }

    default:
      return state;
  }
};