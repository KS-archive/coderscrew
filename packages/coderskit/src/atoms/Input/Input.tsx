import React, { useState, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { omit } from 'ramda';
import { Omit } from 'utility-types';
import { tint } from 'polished';
import { Theme, Icon } from '../..';

import SpinnerSolid from '../../icons/SpinnerSolid';
import ExclamationCircleSolid from '../../icons/ExclamationCircleSolid';
import EyeSolid from '../../icons/EyeSolid';
import CheckCircleSolid from '../../icons/CheckCircleSolid';

export type InputSize = 'small' | 'default' | 'large';

export type InputState = 'loading' | 'error' | 'warning' | 'success' | 'default';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  state: InputState;
  size: InputSize;
  hasFeedback?: boolean;
}

const getSizeProps = (size: InputSize, { fontSizes, space }: Theme) => {
  if (size === 'large')
    return {
      height: 48,
      padding: `0 ${space[16]}`,
      fontSize: fontSizes.button1,
    };

  if (size === 'small')
    return {
      height: 32,
    };

  return {};
};

const getStateProps = (state: InputState, { colors }: Theme) => {
  switch (state) {
    case 'loading': {
      return {
        backgroundColor: colors.background,
      };
    }
    case 'default': {
      return {
        '&:hover:not(:disabled):not(:focus)': {
          borderColor: tint(0.5, colors.primary),
        },
      };
    }
    default:
      return {
        borderColor: colors[state],

        '&:hover:not(:disabled):not(:focus)': {
          borderColor: tint(0.5, colors[state]),
        },
      };
  }
};

const InputContainer = styled.div<InputProps>(props => {
  const { theme, size, state, width } = props;
  const { colors, borderWidths, shadows, radii, fontSizes } = theme;

  return {
    position: 'relative',
    display: 'inline-block',

    '.cc-input--input': {
      width: typeof width === 'string' ? width : `${width}px`,
      height: 40,
      padding: `0 12px`,
      borderWidth: borderWidths.regular,
      borderStyle: 'solid',
      borderColor: colors.border,
      borderRadius: radii.small,
      outline: 'none',
      backgroundColor: colors.white,
      fontSize: fontSizes.button2,

      '&:focus': {
        padding: `0 ${size === 'large' ? 15 : 11}px`,
        borderWidth: borderWidths.bold,
        borderColor: colors.primary,
        boxShadow: shadows.md,
      },

      '&:disabled': {
        backgroundColor: colors.disabled,
        color: colors.fontDisabled,
        cursor: 'not-allowed',

        '&::placeholder': {
          color: colors.fontDisabled,
        },
      },

      '&::placeholder': {
        color: colors.fontPlaceholder,
      },

      ...getSizeProps(size!, theme),
      ...getStateProps(state!, theme),
    },

    '.cc-input--icons': {
      position: 'absolute',
      right: size === 'large' ? 32 : 28,
      top: 0,
      bottom: 0,

      '.cc-icon': {
        position: 'absolute',
        top: 'calc(50% - 8px)',
      },

      '.cc-input--eye-icon': {
        right: state !== 'default' ? 12 : 0,
      },
    },
  };
});

const customPropKeys = ['size', 'style', 'className', 'hasFeedback'];

export const Input = ({ id, ...props }: InputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  const { state, type, disabled, className, hasFeedback } = props;
  const containerProps: InputProps = {
    ...props,
    disabled: disabled || state === 'loading',
    className: classnames(className, 'cc-input'),
    type: type !== 'password' || !passwordVisible ? type : 'text',
  };
  const innerInputProps = omit(customPropKeys, containerProps);

  return (
    <InputContainer {...containerProps}>
      <input {...innerInputProps} className="cc-input--input" id={id} />

      {hasFeedback && (
        <div className="cc-input--icons">
          {state === 'success' && <Icon icon={CheckCircleSolid} kind="success" />}
          {state === 'loading' && <Icon icon={SpinnerSolid} kind="info" spin />}
          {state === 'error' && <Icon icon={ExclamationCircleSolid} kind="error" />}
          {state === 'warning' && <Icon icon={ExclamationCircleSolid} kind="warning" />}
          {type === 'password' && (
            <Icon
              icon={EyeSolid}
              kind={passwordVisible ? 'primary' : 'border'}
              className="cc-input--eye-icon"
              onClick={togglePasswordVisible}
              hoverable
            />
          )}
        </div>
      )}
    </InputContainer>
  );
};

Input.defaultProps = {
  size: 'default',
  state: 'default',
  width: '100%',
  hasFeedback: true,
};
