import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Icon, Typography } from '..';

import SquareSolid from '../../icons/SquareSolid';
import SquareRegular from '../../icons/SquareRegular';
import CheckSquareSolid from '../../icons/CheckSquareSolid';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const CheckboxContainer = styled.div<CheckboxProps>(props => {
  const { space, fontSizes, lineHeights, colors } = props.theme;
  const { disabled } = props;

  return {
    display: 'flex',
    alignItems: 'center',

    '.cc-checkbox--wrapper': {
      position: 'relative',
      width: 20,
      height: 20,
      overflow: 'hidden',

      '.cc-icon': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        '&:first-of-type': {
          visibility: 'visible',
          color: colors.border,
          zIndex: 1,
        },

        '&:nth-of-type(2)': {
          visibility: 'hidden',
          color: colors.primary,
        },

        '&:last-of-type': {
          visibility: 'hidden',
          color: colors.disabled,
        },
      },
    },

    '.cc-checkbox--hidden': {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'scale(2)',
      padding: 0,
      zIndex: 2,
      opacity: 0,

      '&:hover:not(:disabled) + .cc-icon:first-of-type': {
        opacity: 0.64,
        color: colors.primary,
      },

      '&:focus + .cc-icon:first-of-type': {
        opacity: 1,
        color: colors.primary,
      },

      '&:checked ~ .cc-icon:first-of-type': {
        visibility: 'hidden',
      },

      '&:checked ~ .cc-icon:nth-of-type(2)': {
        visibility: 'visible',
      },

      '&:disabled:not(:checked) ~ .cc-icon:last-of-type': {
        visibility: 'visible',
      },

      '&:disabled:checked ~ .cc-icon': {
        opacity: 1,
        color: colors.border,
      },
    },

    '.cc-checkbox--label': {
      paddingLeft: space[8],
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      color: colors[disabled ? 'fontDisabled' : 'fontRegular'],
    },
  };
});

export const Checkbox = (props: CheckboxProps) => {
  const { children, name, disabled } = props;
  const className = classnames(props.className, 'cc-checkbox');

  return (
    <CheckboxContainer {...props} className={className}>
      <div className="cc-checkbox--wrapper">
        <input
          className="cc-checkbox--hidden"
          type="checkbox"
          id={name}
          aria-label={props['aria-label'] || name}
          disabled={disabled}
          name={name}
        />
        <Icon icon={SquareRegular} />
        <Icon icon={CheckSquareSolid} />
        <Icon icon={SquareSolid} />
      </div>
      {children && (
        <Typography as="label" className="cc-checkbox--label" htmlFor={name}>
          {children}
        </Typography>
      )}
    </CheckboxContainer>
  );
};
