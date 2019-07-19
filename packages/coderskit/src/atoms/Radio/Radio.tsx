import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { Icon, Typography } from '..';

import CircleSolid from '../../icons/CircleSolid';
import CircleRegular from '../../icons/CircleRegular';
import DotCircleSolid from '../../icons/DotCircleSolid';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const RadioContainer = styled.div<RadioProps>(props => {
  const { space, fontSizes, lineHeights, colors } = props.theme;
  const { disabled } = props;

  return {
    display: 'flex',
    alignItems: 'center',

    '.cc-radio--wrapper': {
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

    '.cc-radio--hidden': {
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

    '.cc-radio--label': {
      paddingLeft: space[8],
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      color: colors[disabled ? 'fontDisabled' : 'fontRegular'],
    },
  };
});

export const Radio = (props: RadioProps) => {
  const { children, name, value } = props;
  const valueString = String(value);
  const className = classnames(props.className, 'cc-radio');

  return (
    <RadioContainer {...props} className={className}>
      <div className="cc-radio--wrapper">
        <input
          className="cc-radio--hidden"
          type="radio"
          id={valueString}
          aria-label={props['aria-label'] || valueString}
          disabled={props.disabled}
          name={name}
          value={value}
        />
        <Icon icon={CircleRegular} />
        <Icon icon={DotCircleSolid} />
        <Icon icon={CircleSolid} />
      </div>
      {children && (
        <Typography as="label" className="cc-radio--label" htmlFor={valueString}>
          {children}
        </Typography>
      )}
    </RadioContainer>
  );
};
