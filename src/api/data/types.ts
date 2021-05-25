import { colorType, shapeType } from ".";

export interface IItem {
    id:string
    color:colorType
    shape:shapeType
}

export interface Ifilters {
    selectedShapes:selectedShapes,
    selectedColors:selectedColors
}

export type IItems = Array<IItem>

export type selectedColors = Array<colorType>
export type selectedShapes = Array<shapeType>
