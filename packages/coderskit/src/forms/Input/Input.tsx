import React from 'react';
import { FieldProps } from 'formik/dist/Field';
import { InputField, InputFieldProps } from '../..';

type Props = InputFieldProps & FieldProps;

export const FInput = ({ form, field, ...props }: Props) => {
  let state = props.state || 'default';
  const error = (form.touched[field.name] && form.errors[field.name]) as string | undefined;

  if (form.isSubmitting) {
    state = 'loading';
  }

  return <InputField {...props} {...field} state={state} error={error} />;
};
