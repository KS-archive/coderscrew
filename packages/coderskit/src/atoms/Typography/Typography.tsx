import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { ThemeColorsKeys, ThemeFontWeightsKeys, ThemeFontSizesKeys } from '../..';

export interface TypographyProps extends React.HTMLAttributes<any> {
  children: React.ReactNode;
  el?: ThemeFontSizesKeys;
  as?: React.ElementType | string;
  color?: ThemeColorsKeys;
  weight?: ThemeFontWeightsKeys;
  [key: string]: any;
}

const components = {
  h1: styled.h1<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.h1,
      lineHeight: lineHeights.h1,
      color: colors[color! || 'fontPrimary'],
      fontWeight: fontWeights[weight || 'bold'],
    };
  }),
  h2: styled.h2<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.h2,
      lineHeight: lineHeights.h2,
      color: colors[color! || 'fontPrimary'],
      fontWeight: fontWeights[weight || 'bold'],
    };
  }),
  h3: styled.h3<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.h3,
      lineHeight: lineHeights.h3,
      color: colors[color! || 'fontPrimary'],
      fontWeight: fontWeights[weight || 'bold'],
    };
  }),
  h4: styled.h4<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.h4,
      lineHeight: lineHeights.h4,
      color: colors[color! || 'fontPrimary'],
      fontWeight: fontWeights[weight || 'bold'],
    };
  }),
  button1: styled.span<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.button1,
      lineHeight: lineHeights.button1,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'medium'],
    };
  }),
  button2: styled.span<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.button2,
      lineHeight: lineHeights.button2,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'medium'],
    };
  }),
  caption1: styled.span<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.caption1,
      lineHeight: lineHeights.caption1,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'medium'],
    };
  }),
  caption2: styled.span<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.caption2,
      lineHeight: lineHeights.caption2,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'medium'],
    };
  }),
  body1: styled.div<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.body1,
      lineHeight: lineHeights.body1,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'regular'],
    };
  }),
  body2: styled.div<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.body2,
      lineHeight: lineHeights.body2,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'regular'],
    };
  }),
  label: styled.label<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.label,
      lineHeight: lineHeights.label,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'bold'],
    };
  }),
  small: styled.small<TypographyProps>(props => {
    const { fontSizes, lineHeights, fontWeights, colors } = props.theme;
    const { weight, color } = props;

    return {
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
      color: colors[color! || 'fontRegular'],
      fontWeight: fontWeights[weight || 'regular'],
    };
  }),
};

export const Typography = (props: TypographyProps) => {
  const { el, children } = props;
  const TypographyContainer = components[el!];
  const className = classnames(props.className, 'cc-typography', `cc-typography-${el!}`);

  return (
    <TypographyContainer {...props} className={className}>
      {children}
    </TypographyContainer>
  );
};

Typography.defaultProps = {
  el: 'body2',
};
