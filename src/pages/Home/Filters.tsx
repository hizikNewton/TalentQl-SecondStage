import { colors, shapes } from 'api/data'
import { IItems } from 'api/data/types'
import * as S from './styles'

import React from 'react'
import { ItemContainer } from './ItemContainer'
interface Props {
    items:IItems
}

export const Filters:React.FC<Props> = ({items}:Props) => {
    
    return (
        <div>
            <h3>{'Filters'}</h3>
            <h4>{'Shapes'}</h4>
            {shapes.map(shape=><S.ShapeOption>{shape}</S.ShapeOption>)}
            <h4>{'Colors'}</h4>
            {colors.map(color=><S.ColorOption color={color}></S.ColorOption>)}
            <h3>{'All Items'}</h3>
            <ItemContainer items={items}/>
        </div>
    )
}

