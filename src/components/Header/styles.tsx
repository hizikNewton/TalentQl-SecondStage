import styled from "styled-components";

export const Head = styled.header`
    border-top:1px solid black;
    display:flex;
    justify-content:space-between;
    height:50px;
    align-items:center;
    padding:${props=>props.theme.content.padding};
    button{
        display:inherit;
        align-items:center;
    }
`