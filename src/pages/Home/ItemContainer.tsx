import React from 'react'
import { IItems } from 'api/data/types'
import Card from 'components/Card'
import {Container} from './styles'

interface Props {
    items:IItems
}

export const ItemContainer:React.FC<Props> = ({items}:Props) => {

    return (
        <Container>
            {items.map((item,idx)=>{
                return <Card item={item} key={idx}/>
            })}
        </Container>
    )
}

