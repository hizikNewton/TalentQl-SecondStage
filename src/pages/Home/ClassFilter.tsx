import { colors, colorType, shapes, shapeType } from 'api/data';
import {  selectedColors, selectedShapes } from 'api/data/types';
import React, { Component } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/stores'
import { ItemContainer } from './ItemContainer';
import * as S from './styles'
import { filterShapeAction,filterColorAction,selectAllItemAction,updateTitleAction } from 'redux/actions'

interface Props extends PropFromRedux {
}
interface State {
    selectedColorState:selectedColors,
    selectedShapeState:selectedShapes,
    title:string
}

class ClassFilter extends Component<Props, State> {
    shapeRefs:Array<HTMLButtonElement|null>
    colorRefs:Array<HTMLButtonElement|null>

    constructor(props:Props){
        
        super(props)
        const {selectedColors,selectedShapes} = this.props.filters
        this.state ={
            selectedColorState:selectedColors,
            selectedShapeState:selectedShapes,
            title:'All Items'
        }
        this.shapeRefs = [];
        this.colorRefs = [];
    }


componentDidMount(){
    this.colorRefs.forEach(colorRef=>colorRef!.style.borderColor='#bad1fd');
    this.shapeRefs.forEach(shapeRef=>shapeRef!.style.backgroundColor='#bad1fd')
    this.colorRefs.forEach(colorRef=>colorRef!.style.boxShadow='0 0 10px');
    }

handleReset = ()=>{
    console.log('handle reset')
    this.shapeRefs.slice(0,this.shapeRefs.length).forEach(shapeRef=>{shapeRef?.click()
    })
    this.props.filterShapeAction(this.state.selectedShapeState)
}

handleColorReset = ()=>{
    this.colorRefs.slice(0,this.shapeRefs.length).forEach(colorRef=>{colorRef?.click()
    })
    this.props.filterColorAction(this.state.selectedColorState)
}

    handleClickShape =(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.currentTarget.style.backgroundColor=(e.currentTarget.style.backgroundColor==='')?'#bad1fd':'';
        const select = e.currentTarget.id as shapeType
        let newSelectedShapeArray = new Set([...this.state.selectedShapeState])
        if(newSelectedShapeArray.has(select)){
            newSelectedShapeArray.delete(select)
            this.setState({selectedShapeState:Array.from(newSelectedShapeArray)}, 
            ()=>{this.props.filterShapeAction(this.state.selectedShapeState)
                if (this.state.selectedShapeState.length===0){
                    this.handleReset()
                }
            }
            
        )
        }else{
            newSelectedShapeArray.add(select)
            this.setState({selectedShapeState:Array.from(newSelectedShapeArray)},()=>{
                this.props.filterShapeAction(this.state.selectedShapeState)
                if (this.state.selectedShapeState.length===0){
                    this.handleReset()
                }
            }
        )
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

    componentDidUpdate(){
        const {selectedColorState :selectedColors,selectedShapeState :selectedShapes} = this.state
        const allColors = selectedColors.length === [...colors].length
        const allShapes = selectedShapes.length === [...shapes].length
        const multipleColor = selectedColors.length >1
        const multipleShape = selectedShapes.length >1
        const singleColor = selectedColors.length === 1
        const singleShape = selectedShapes.length === 1
        console.log(allColors,allShapes,multipleShape)

        if(allColors&&allShapes){
            this.props.updateTitleAction('All Items')
        }
        else if((allColors&&multipleShape)||(allShapes&&multipleColor)){
            this.props.updateTitleAction('Multiple Items')
        }
        else if(allShapes&&singleColor){
            this.props.updateTitleAction(`All ${selectedColors} Items`)
        }
        else if(allColors&&singleShape){
            this.props.updateTitleAction(`All ${selectedShapes} Items`)
        }
        else if(multipleShape&&singleColor){
            this.props.updateTitleAction(`Multiple ${selectedColors} Items`)
        }
        else if(multipleColor&&singleShape){
            this.props.updateTitleAction(`Multiple ${selectedShapes} Items`)
        }
        else if(singleShape&&singleColor){
            this.props.updateTitleAction(`${selectedColors} ${selectedShapes} Items`)
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
                <h3>{this.props.title}</h3>
                <ItemContainer items={this.props.items}/>
            </div>
        )
    }
}


function mapStateToProps(state:RootState){
    const {items,filters,title} = state.itemStore
    return {
        filters,
        items,
        title
    }
}
const mapDispatchToProps={
    filterShapeAction,
    filterColorAction,
    selectAllItemAction,
    updateTitleAction
}
const connector = connect(mapStateToProps,mapDispatchToProps)
type PropFromRedux = ConnectedProps<typeof connector>

export default connector(ClassFilter)