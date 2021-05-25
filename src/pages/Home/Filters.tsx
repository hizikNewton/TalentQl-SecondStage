import {  IItems, selectedColors, selectedShapes } from 'api/data/types'
import * as S from './styles'
import React, { useEffect, useRef, useState } from 'react'
import { ItemContainer } from './ItemContainer'
import { colors, shapes, shapeType,colorType } from 'api/data'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/stores'
import { filterShapeAction } from 'redux/actions'

interface Props extends PropFromRedux {
    items:IItems
}

const Filters:React.FC<Props> = (props:Props) => {

    const {items,filters} = props
    
    const {selectedColors,selectedShapes} = filters

    const shapeRefs = useRef<Array<HTMLButtonElement|null>>([])

    const colorRefs = useRef<Array<HTMLButtonElement|null>>([])
    
    const [selectedColorState, setSelectColorState] = useState<selectedColors>(selectedColors);

    const [selectedShapeState, setSelectShapeState] = useState<selectedShapes>(selectedShapes);

    useEffect(() => {
        shapeRefs.current = shapeRefs.current.slice(0, selectedShapeState?.length);
        colorRefs.current = colorRefs.current.slice(0,selectedColorState?.length);
        shapeRefs.current.forEach(shapeRef=>shapeRef!.style.backgroundColor='blue');
        colorRefs.current.forEach(colorRef=>colorRef!.style.boxShadow='0 0 12px');
        return () => {
        }
    }, [])

    const handleClickShape =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.currentTarget.style.backgroundColor=(e.currentTarget.style.backgroundColor==='blue')?'':'blue';
        const select = e.currentTarget.id as shapeType
        let newSelectedShapeArray = new Set([...selectedShapeState])
        if(newSelectedShapeArray.has(select)){
            newSelectedShapeArray.delete(select)
            setSelectShapeState(Array.from(newSelectedShapeArray))
        }else{
            newSelectedShapeArray.add(select)
            setSelectShapeState(Array.from(newSelectedShapeArray))
        }
        props.filterShapeAction(selectedShapeState)
    }

    const handleClickColor =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.currentTarget.style.boxShadow=(e.currentTarget.style.boxShadow==='0 0 12px')?'':'0 0 12px';
        const select = e.currentTarget.id as colorType
        let newSelectedColorArray = new Set([...selectedColorState])
        if(newSelectedColorArray.has(select)){
            newSelectedColorArray.delete(select)
            setSelectColorState(Array.from(newSelectedColorArray))
        }else{
            newSelectedColorArray.add(select)
            setSelectColorState(Array.from(newSelectedColorArray))
        }
    }

    return (
        <div>
            <h3>{'Filters'}</h3>
            <h4>{'Shapes'}</h4>
            {shapes.map((shape,idx)=><S.ShapeOption key={idx} id={shape} ref={el=>shapeRefs.current[idx]=el} 
            onClick={handleClickShape}>{shape}</S.ShapeOption>)}
            <h4>{'Colors'}</h4>
            {colors.map((color,idx)=><S.ColorOption color={color} id={color} key={idx} ref={el=>colorRefs.current[idx]=el} onClick={handleClickColor}></S.ColorOption>)}
            <h3>{'All Items'}</h3>
            <ItemContainer items={items}/>
        </div>
    )
}

function mapStateToProps(state:RootState){
    const {items,filters} = state.itemStore
    return {
        filters,
        items
    }
}
const mapDispatchToProps={
    filterShapeAction
}
const connector = connect(mapStateToProps,mapDispatchToProps)

type PropFromRedux = ConnectedProps<typeof connector>

export default connector(Filters)