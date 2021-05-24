import { colorType, shapeType } from ".";

export interface IItem {
    id:string
    color:colorType
    shape:shapeType
}

export interface Ifilters {
    selectedColors:selectedColors
    selectedShapes:selectedShapes
}

export type IItems = Array<IItem>

export type selectedColors = Array<colorType>
export type selectedShapes = Array<shapeType>
