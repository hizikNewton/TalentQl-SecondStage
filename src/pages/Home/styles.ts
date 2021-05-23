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
    &:hover {
        background-color:${props=>props.theme.button.colors.primary.background};
    };
`
export const ColorOption = styled.button<{color:colorType}>`
    border-radius:50%;
    border:1px solid black;
    margin:${props=>props.theme.button.margin.small};
    width:40px;
    height:40px;
    background-color:${props=>props.theme.colors[props.color]};
    &:hover {
        background-color:${props=>props.theme.button.colors.primary.background};
    };
`

export const Container =styled.div`
    display:flex;
    flex-wrap:wrap;
`