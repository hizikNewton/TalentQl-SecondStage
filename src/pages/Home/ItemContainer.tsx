import React from 'react'
import { IItems } from 'redux/data/types'

interface Props {
    items:IItems
}

export const ItemContainer:React.FC<Props> = ({items}:Props) => {
    return (
        <div>
            {items.map(({id,color,shape})=>{
                return <div>{id}{color},{shape}</div>
            })}
        </div>
    )
}

