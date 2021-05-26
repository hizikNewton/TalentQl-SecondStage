import validator from "validator";
type rules = {
    required: boolean;
    minlength: number;
    alpha: boolean;
    email: boolean;
    password: boolean;
    checked: boolean;
    equals: string;
    strAlpha:boolean
    alphanumeric:boolean
}

export interface IRule {
    [x: string]:Partial<rules>
}
export interface IData {
    [x: string]: any
}

interface IErrors {
    [field: string]: Array<string>
}


export function ValidateData(data: IData, rules: IRule) {
    let errors: IErrors = {};
    Object.keys(data).forEach(field => {
        
        if (rules.hasOwnProperty(field)) {
            let fielderrors = [];
            let val = data[field];
            if (rules[field].checked) {
                if (!val) {
                    fielderrors.push("Must be checked");
                }
            }else{
            if (rules[field].required && validator.isEmpty(val)) {
                fielderrors.push("Value required");
            }
            if (!validator.isEmpty(data[field])) {
                if (rules[field].strAlpha && !validator.matches(val,/^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/ig)){
                    fielderrors.push("value must be a fullname eg 'John Doe'");
                }
                if (rules[field].minlength
                    && !validator.isLength(val, { min: rules[field].minlength })) {
                    fielderrors.push(`Enter at least ${rules[field].minlength}`
                        + " characters");
                }
                if (rules[field].alphanumeric && !validator.isAlphanumeric(val)) {
                    fielderrors.push("field can only contain alphanumeric values");
                }
                if (rules[field].alpha && !validator.isAlpha(val)) {
                    fielderrors.push("Enter only letters");
                }
                if (rules[field].email && !validator.isEmail(val)) {
                    fielderrors.push("Enter a valid email address");
                }
                if (rules[field].password && !validator.isStrongPassword(val)) {
                    fielderrors.push("password must be 8 character long \n must contain at least a special character,1 capital letter and a numeric value ");
                }
                if (rules[field].equals
                    && !validator.equals(val, data[rules[field].equals as keyof rules])) {
                fielderrors.push("Values don't match");
            }
            }
        }
            if (fielderrors.length > 0) {
                errors[field] = fielderrors;
            }
        }
    })
    return errors;
}