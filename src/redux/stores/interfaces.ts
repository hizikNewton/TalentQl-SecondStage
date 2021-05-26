import { colorType, shapeType } from "api/data";
import { IItems } from "api/data/types";
import { IAlertState } from "./alertState";
import { IAuthState } from "./authState";

export interface IItemStore{
    items:IItems
    filters:{
        selectedShapes:Array<shapeType>
        selectedColors:Array<colorType>
    },
    title:string

}

export type RootState = {
    itemStore:IItemStore
    alert:IAlertState
    auth:IAuthState
}
