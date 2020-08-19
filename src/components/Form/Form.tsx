import React from 'react'
import c from './Form.module.css'
import classNames from 'classnames'
import { WrappedFieldProps, Field } from 'redux-form'
import { FieldValidatorType } from '../../form_validation_checks/formChecks'

const FormControl: React.FC<WrappedFieldProps> = (props) => {
    let {input, meta, children, ...restProps} = props
    const hasError = meta.touched && meta.error
    const form_control_class = classNames({
        [c.form_control]: true,
        [c.error]: hasError
    });
    return (
        <div className={c.wrap}>
            <div className={form_control_class}>
                {children}
            </div>
            {hasError ? <span className={c.span_error}>{meta.error}</span> : null}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    let {input, meta, ...restProps} = props
    return (
        <FormControl {...props}><input {...input} {...restProps}/></FormControl>
    )
}

export function createField<T extends string>(component: React.FC<WrappedFieldProps>,
                            name: T,
                            type: string,
                            placeholder: string,
                            validators: Array<FieldValidatorType> | Array<() => FieldValidatorType> | Array<void>,
                            classname?: string
                            ): JSX.Element {
    return (
        <Field className={classname} name={name} component={component} type={type} placeholder={placeholder} validate={validators}/>
    )
}