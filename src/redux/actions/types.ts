
import { Ifilters, IItems, selectedColors, selectedShapes } from "api/data/types";

export interface IAction {
    type: string;
    payload: IItems|Ifilters|selectedColors|selectedShapes
  }
