import React from "react";

export interface IFormContext{
    submitForm:(user: IUser) => Promise<void|string>
}
export const FormCtx = React.createContext<IFormContext>({
    submitForm:(_user) => new Promise(()=>{})
});

interface IValidationContext{
    getMessagesForField:(field:string)=>Array<string>,
}

export const ValidationCtx = React.createContext<IValidationContext>({
    getMessagesForField:()=>[]
});