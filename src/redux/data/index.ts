import { IItem, IItems } from "./types"

const colors = ["red","green","yellow","blue","orange","grey"]
const shapes = ["oval","round","triangle","square","rectangle"]

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