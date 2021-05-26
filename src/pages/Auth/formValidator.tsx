import React,{ Component } from 'react'
import { FormCtx, ValidationCtx } from './context';
import { IData, IRule, ValidateData } from './validate';

type errors = Array<string>

interface Props {
    loading:boolean
    data:any
    rules:IRule
    validateForm(data:IData):errors
}
interface State {
    errors: {
        [fields:string]:any
    },
    dirty: {
        [fields:string]:any
    },
    formSubmitted: boolean,
    getMessagesForField:(field:string)=>[]
}

export class FormValidator extends Component<Props, State> {
    
    constructor(props:Props){
        super(props)
        this.state={
            errors: {},
            dirty: {},
            formSubmitted: false,
            getMessagesForField:this.getMessagesForField
        }
    }
    static contextType = FormCtx
    context!: React.ContextType<typeof FormCtx>

    static getDerivedStateFromProps(props:Props, state:State) {
        state.errors = ValidateData(props.data, props.rules);
        if (state.formSubmitted && Object.keys(state.errors).length === 0) {
            let formErrors = props.validateForm(props.data);
            if (formErrors.length > 0) {
                state.errors.form = formErrors;
            }
        }
        return state;
    }
    get formValid() {
        return Object.keys(this.state.errors).length === 0;
    }

    getMessagesForField = (field:string) => {
        return (this.state.formSubmitted || this.state.dirty[field]) ?
            this.state.errors[field] || [] : []
    }

    handleChange = (ev:React.ChangeEvent<HTMLInputElement>)=>{
        let name = ev.target.name;
        this.setState(state=>{state.dirty[name]=true})
    }

    handleClick = () => {
        this.setState({ formSubmitted: true }, () => {
            if (this.formValid) {
                let formErrors = this.props.validateForm(this.props.data);
                if (formErrors.length === 0) {
                    this.context.submitForm(this.props.data)
                }
            }
        });
    }

    getButtonClasses() {
        return this.state.formSubmitted && !this.formValid
            ? "btn-danger" : "btn-primary";
    }

    render() {

        const { loading } = this.props;
        return <React.Fragment>
            <ValidationCtx.Provider value={ this.state }>
                <div onChange={ this.handleChange }>
                    { this.props.children }
                </div>
            </ValidationCtx.Provider>
            <div>
                <button className={ `btn ${ this.getButtonClasses() }`}
                        onClick={ this.handleClick }
                        disabled={ this.state.formSubmitted && !this.formValid } >
                    {'Submit'}
                    {loading &&
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt={'spinner'}/>}
                </button>
            </div>
        </React.Fragment>
    }
}
