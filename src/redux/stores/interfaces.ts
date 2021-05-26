import { colorType, shapeType } from "api/data";
import { IItems } from "api/data/types";

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
}