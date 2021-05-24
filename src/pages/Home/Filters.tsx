import {  IItems } from 'api/data/types'
import * as S from './styles'
import React, { useEffect, useRef, useState } from 'react'
import { ItemContainer } from './ItemContainer'
import { colors, shapes } from 'api/data'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/stores'

interface Props extends PropFromRedux {
    items:IItems
}

const Filters:React.FC<Props> = (props:Props) => {

    const {items,filters} = props
    
    const {selectedColors,selectedShapes} = filters

    const shapeRefs = useRef<Array<HTMLButtonElement|null>>([])

    const colorRefs = useRef<Array<HTMLButtonElement|null>>([])

    const [selectedState, setSelectState] = useState({selectedColors,selectedShapes})

    useEffect(() => {
        shapeRefs.current = shapeRefs.current.slice(0, selectedState.selectedShapes.length);
        colorRefs.current = colorRefs.current.slice(0,selectedState.selectedColors.length);
        shapeRefs.current.forEach(shapeRef=>shapeRef!.style.backgroundColor='blue')
        return () => {
        }
    }, [])

    const handleSelect=()=>{
        console.log(filters,setSelectState)
        //toggle state
    }
    const handleClick =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        if (selectedState){
            e.currentTarget.style.backgroundColor = 'blue'
        }
        else{
            e.currentTarget.style.backgroundColor = ''
        }
        handleSelect()
    }
    return (
        <div>
            <h3>{'Filters'}</h3>
            <h4>{'Shapes'}</h4>
            {shapes.map((shape,idx)=><S.ShapeOption key={idx} ref={el=>shapeRefs.current[idx]=el} 
            onClick={handleClick}>{shape}</S.ShapeOption>)}
            <h4>{'Colors'}</h4>
            {colors.map((color,idx)=><S.ColorOption color={color} key={idx} ref={el=>colorRefs.current[idx]=el}></S.ColorOption>)}
            <h3>{'All Items'}</h3>
            <ItemContainer items={items}/>
        </div>
    )
}

function mapStateToProps(state:RootState){
    return {
        filters:state.itemStore.filters
    }
}

const connector = connect(mapStateToProps)

type PropFromRedux = ConnectedProps<typeof connector>

export default connector(Filters)