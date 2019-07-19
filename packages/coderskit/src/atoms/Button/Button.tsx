import React, { HTMLAttributes, ElementType, ReactNode } from 'react';
import styled from '@emotion/styled';
import { shade, tint } from 'polished';
import { ThemeColorsKeys } from '../..';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export type ButtonSize = 'small' | 'default' | 'large';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  as?: ElementType;
  children: ReactNode;
  color?: string;
  kind?: ThemeColorsKeys;
  size?: ButtonSize;
  variant?: ButtonVariant;
  [key: string]: any;
}

const ButtonBase = styled.button<ButtonProps>(({ size, ...props }) => {
  const { fontSizes, fontWeights, lineHeights, radii, transitions } = props.theme;

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: radii.small,
    fontSize: size === 'large' ? fontSizes.button1 : fontSizes.button2,
    textAlign: 'center',
    lineHeight: size === 'large' ? lineHeights.button1 : lineHeights.button2,
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    transition: `all 0.3s ${transitions.easeOutQuad}`,

    '&:disabled': {
      cursor: 'not-allowed',
    },
  };
});

const ContainedButton = styled(ButtonBase)(({ theme, size, ...props }) => {
  const color = props.color || theme.colors[props.kind!];

  return {
    padding: size === 'small' ? '7px 15px' : '11px 23px',
    backgroundColor: color,
    color: theme.colors.white,
    borderColor: color,

    '&:hover:not(:disabled)': {
      backgroundColor: tint(0.08, color),
      boxShadow: theme.shadows.md,
    },

    '&:focus:not(:disabled)': {
      boxShadow: `${theme.shadows.md}, 0 0 0 4px ${tint(0.8, color)}`,
    },

    '&:active:not(:disabled)': {
      backgroundColor: shade(0.04, color),
      boxShadow: 'none',
    },

    '&:disabled': {
      opacity: 0.6,
    },
  };
});

const OutlinedButton = styled(ButtonBase)(({ theme, size, ...props }) => {
  const color = props.color || theme.colors[props.kind!];

  return {
    padding: size === 'small' ? '7px 15px' : '11px 23px',
    backgroundColor: theme.colors.white,
    color,
    borderColor: color,

    '&:hover:not(:disabled)': {
      backgroundColor: tint(0.96, color),
      boxShadow: theme.shadows.md,
    },

    '&:focus:not(:disabled)': {
      boxShadow: `${theme.shadows.md}, 0 0 0 4px ${tint(0.8, color)}`,
    },

    '&:active:not(:disabled)': {
      backgroundColor: tint(0.92, color),
      boxShadow: 'none',
    },

    '&:disabled': {
      opacity: 0.6,
    },
  };
});

const TextButton = styled(ButtonBase)(({ theme, size, ...props }) => {
  const color = props.color || theme.colors[props.kind!];

  return {
    padding: size === 'small' ? 7 : 11,
    backgroundColor: 'transparent',
    color,
    borderColor: 'transparent',
    '&:hover:not(:disabled)': {
      backgroundColor: tint(0.94, color),
    },

    '&:focus:not(:disabled)': {
      boxShadow: `${theme.shadows.md}, 0 0 0 4px ${tint(0.8, color)}`,
    },

    '&:active:not(:disabled)': {
      backgroundColor: tint(0.88, color),
    },

    '&:disabled': {
      opacity: 0.8,
      color: theme.colors.fontDisabled,
    },
  };
});

export const Button = (props: ButtonProps) => {
  const { variant, children } = props;

  const ButtonContainer =
    variant === 'contained' ? ContainedButton : variant === 'outlined' ? OutlinedButton : TextButton;

  return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

Button.defaultProps = {
  as: 'button',
  children: '',
  color: '',
  kind: 'primary',
  size: 'default',
  variant: 'contained',
};
