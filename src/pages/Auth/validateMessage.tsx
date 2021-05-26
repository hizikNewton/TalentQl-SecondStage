import React,{ Component } from "react";
import { ValidationCtx } from "./context";
interface Props{
    field:string
}


export class ValidationMessage extends Component<Props>{
    static contextType = ValidationCtx;
    context!: React.ContextType<typeof ValidationCtx>

    render() {
        return this.context.getMessagesForField(this.props.field).map(err =>
            <div key={ err } >
                { err }
            </div>
        )
    }
}