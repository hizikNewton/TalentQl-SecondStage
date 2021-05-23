import { IItem } from 'api/data/types'
import React from 'react'
import * as S from './styles'

interface Props {
    item:IItem;

}

const Card:React.FC<Props> = ({item}: Props) => {
    const {color,shape} = item
    return (
        <S.CardStyle>
            <S.Shape color={color} id={shape}/>
        </S.CardStyle>
    )
}

export default Card
