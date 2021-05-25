import { colorType } from "api/data";
import {styled} from "globalStyles";

export const Main = styled.main`
    background-color:${props=>props.theme.colors.mainBackgroundColor};
`

export const ShapeOption = styled.button`
    border:1px solid black;
    border-radius:10px;
    padding:${props=>props.theme.button.padding.small};
    margin:${props=>props.theme.button.margin.small};
`
export const ColorOption = styled.button<{color:colorType}>`
    border-color:#bad1fd;
    border-radius:50%;
    border:3px solid transparent;
    margin:${props=>props.theme.button.margin.small};
    width:50px;
    height:50px;
    background-color:${props=>props.theme.colors[props.color]};
    
`

export const Container =styled.div`
    display:flex;
    flex-wrap:wrap;
`