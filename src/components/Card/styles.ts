import { colorType } from "api/data";
import {styled} from "globalStyles";

export const Shape = styled.div<{color:colorType}>`
        background:${props=>props.theme.colors[props.color]};
        width:${props=>props.theme.shapes.width};
        height:${props=>props.theme.shapes.height};
        margin:10px auto;
    &#square {
    };
    &#rectangle{
    height:${props=> `calc(${props.theme.shapes.height}/2)`};
    };
    &#round {
        border-radius:50%;
        background:${props=>props.theme.colors[props.color]};
    };
    &#oval {
    width:${props=> `calc(${props.theme.shapes.height}/2)`};
    border-radius:50%;
    };
    &#triangle{
        background-color:transparent;
        width: 0;
        height: 0;
        border-bottom:${props=> `${props.theme.shapes.height}  solid  ${props.theme.colors[props.color]}`} ;
        border-right: ${props=> `calc(${props.theme.shapes.height} / 2) solid transparent`};
        border-left: ${props=>`calc(${props.theme.shapes.height} / 2) solid transparent`};
    };

`
export const CardStyle = styled.div`
    width:100px;
    height:100px;
    background:${props=>props.theme.colors.white};
    margin:10px auto;
    justify-content:center;
`