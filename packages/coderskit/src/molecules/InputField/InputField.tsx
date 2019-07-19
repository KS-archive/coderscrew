import styled from '@emotion/styled';
import React from 'react';
import { Omit } from 'utility-types';
import { ErrorMessage, Input, InputProps, Label } from '../..';

export interface InputFieldProps extends InputProps {
  error?: string;
  label?: string;
}

type WrapperProps = Omit<InputFieldProps, 'state' | 'size'>;

const InputFieldWrapper = styled.div<WrapperProps>(() => {
  return {
    width: 'fit-content',
  };
});

export const InputField = ({
  type,
  state,
  size,
  hasFeedback,
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  width,
  id,
  label,
  error,
  name,
  ...props
}: InputFieldProps) => {
  const inputProps = { type, state, size, hasFeedback, disabled, value, onChange, onFocus, onBlur, width, id };

  if (error && state !== 'loading') {
    inputProps.state = 'error';
  }

  return (
    <InputFieldWrapper {...props}>
      <Label htmlFor={name}>{label}</Label>
      <Input {...inputProps} id={name} />
      <ErrorMessage>{error}</ErrorMessage>
    </InputFieldWrapper>
  );
};
