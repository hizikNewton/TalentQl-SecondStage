import { Ifilters, IItems } from "api/data/types";

export interface IAction {
    type: string;
    payload?: IItems|Ifilters
  }
