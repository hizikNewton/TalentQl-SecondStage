import React from "react";
import { IProps } from "./types";


const Icon: React.FC<IProps> = ({ icon,size = 32, color, text }: IProps) => {
  console.log(icon,size,color,text)
  return <></>
}

export default Icon