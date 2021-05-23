import { colorType, shapeType } from ".";

export interface IItem {
    id:string
    color:colorType
    shape:shapeType
}

export type IItems = Array<IItem>