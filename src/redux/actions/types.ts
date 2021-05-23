import { IItems } from "redux/data/types";

export interface IAction {
    type: string;
    payload?: IItems
  }
  