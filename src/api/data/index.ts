import { IItem, IItems } from "./types"

export const colors = ["red","green","yellow","blue","orange","gray"] as const
export const shapes = ["oval","round","triangle","square","rectangle"] as const

export type colorType = typeof colors[number]
export type shapeType = typeof shapes[number]

const AllItem:IItems = []
export const generateItem = ()=>{
    colors.forEach((color)=>{
        for (let i in shapes){
        let item = {} as IItem
        item.id = `${color}-${i}`
        item.color = color
        item.shape = shapes[i]
        AllItem.push(item)
        }
    })
    return AllItem
}