import { colors, colorType, shapes, shapeType } from 'api/data';
import {  selectedColors, selectedShapes } from 'api/data/types';
import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/stores'
import { ItemContainer } from './ItemContainer';
import * as S from './styles'
import { filterShapeAction,filterColorAction } from 'redux/actions'

interface Props extends PropFromRedux {
}
interface State {
    selectedColorState:selectedColors,
    selectedShapeState:selectedShapes
}

class ClassFilter extends Component<Props, State> {
    shapeRefs:Array<HTMLButtonElement|null>
    colorRefs:Array<HTMLButtonElement|null>

    constructor(props:Props){
        
        super(props)
        const {selectedColors,selectedShapes} = this.props.filters
        this.state ={
            selectedColorState:selectedColors,
            selectedShapeState:selectedShapes 
        }
        this.shapeRefs = [];
        this.colorRefs = [];
    }

componentDidMount(){
    this.colorRefs.forEach(colorRef=>colorRef!.style.borderColor='#bad1fd');
    this.shapeRefs.forEach(shapeRef=>shapeRef!.style.backgroundColor='#bad1fd')
    this.colorRefs.forEach(colorRef=>colorRef!.style.boxShadow='0 0 10px');
    }
    handleClickShape =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.currentTarget.style.backgroundColor=(e.currentTarget.style.backgroundColor==='')?'#bad1fd':'';
        const select = e.currentTarget.id as shapeType
        let newSelectedShapeArray = new Set([...this.state.selectedShapeState])
        if(newSelectedShapeArray.has(select)){
            newSelectedShapeArray.delete(select)
            this.setState({selectedShapeState:Array.from(newSelectedShapeArray)}, ()=>this.props.filterShapeAction(this.state.selectedShapeState))
        }else{
            newSelectedShapeArray.add(select)
            this.setState({selectedShapeState:Array.from(newSelectedShapeArray)},()=>this.props.filterShapeAction(this.state.selectedShapeState))
        }
       
    }
    handleClickColor =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.currentTarget.style.boxShadow=(e.currentTarget.style.boxShadow==='')?'0 0 10px':'';
        e.currentTarget.style.borderColor=(e.currentTarget.style.borderColor==='')?'aliceblue':'';
        const select = e.currentTarget.id as colorType
        let newSelectedColorArray = new Set([...this.state.selectedColorState])
        if(newSelectedColorArray.has(select)){
            newSelectedColorArray.delete(select)
            this.setState({selectedColorState:Array.from(newSelectedColorArray)}, ()=>this.props.filterColorAction(this.state.selectedColorState))
        }else{
            newSelectedColorArray.add(select)
            this.setState({selectedColorState:Array.from(newSelectedColorArray)},()=>this.props.filterColorAction(this.state.selectedColorState))
        }
       
    }

    render() {
        return (
            <div>
                <h3>{'Filters'}</h3>
                <h4>{'Shapes'}</h4>
                {shapes.map((shape,idx)=><S.ShapeOption key={idx} id={shape} 
                onClick={this.handleClickShape} ref={el=>{this.shapeRefs[idx]=el}}>{shape}</S.ShapeOption>)}
                <h4>{'Colors'}</h4>
                {colors.map((color,idx)=><S.ColorOption color={color} id={color} key={idx}  onClick={this.handleClickColor} ref={el=>{this.colorRefs[idx]=el}}></S.ColorOption>)}
                <h3>{'All Items'}</h3>
                <ItemContainer items={this.props.items}/>
                
            </div>
        )
    }
}


function mapStateToProps(state:RootState){
    const {items,filters} = state.itemStore
    return {
        filters,
        items
    }
}
const mapDispatchToProps={
    filterShapeAction,
    filterColorAction
}
const connector = connect(mapStateToProps,mapDispatchToProps)
type PropFromRedux = ConnectedProps<typeof connector>

export default connector(ClassFilter)