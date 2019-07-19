import { transparentize } from 'polished';

export const colors = {
  primary: '#477BFF',
  info: '#57ABFF',
  success: '#00CC92',
  warning: '#FF985C',
  error: '#FF526C',
  gray: '#8A94A6',
  black: '#252529',
  white: '#FFFFFF',
  background: '#F9F9FC',
  border: '#E1E4E8',
  disabled: '#F0F0F5',
  itemHover: '#F6F6F9',
  fontPrimary: '#0A1F44',
  fontRegular: '#4E5D78',
  fontPlaceholder: '#8A94A6',
  fontDisabled: '#B0B7C3',
};

export type ThemeColors = typeof colors;
export type ThemeColorsKeys = keyof ThemeColors;

export const space = {
  0: 0,
  2: '2px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  72: '72px',
  80: '80px',
  88: '88px',
  96: '96px',
  104: '104px',
  112: '112px',
  120: '120px',
};

export type ThemeSpaces = typeof space;
export type ThemeSpacesKeys = keyof ThemeSpaces;

export const fontSizes = {
  h1: '32px',
  h2: '24px',
  h3: '18px',
  h4: '14px',
  body1: '16px',
  body2: '14px',
  button1: '16px',
  button2: '14px',
  caption1: '12px',
  caption2: '10px',
  small: '12px',
  label: '12px',
};

export type ThemeFontSizes = typeof fontSizes;
export type ThemeFontSizesKeys = keyof ThemeFontSizes;

export const lineHeights = {
  h1: '40px',
  h2: '32px',
  h3: '24px',
  h4: '20px',
  body1: '24px',
  body2: '20px',
  button1: '24px',
  button2: '16px',
  caption1: '16px',
  caption2: '12px',
  small: '16px',
  label: '16px',
};

export type ThemeLineHeights = typeof lineHeights;
export type ThemeLineHeightsKeys = keyof ThemeLineHeights;

export const fontWeights = {
  regular: 400,
  medium: 600,
  bold: 700,
};

export type ThemeFontWeights = typeof fontWeights;
export type ThemeFontWeightsKeys = keyof ThemeFontWeights;

export const borderWidths = {
  regular: '1px',
  bold: '2px',
};

export type ThemeBorderWidths = typeof borderWidths;
export type ThemeBorderWidthsKeys = keyof ThemeBorderWidths;

export const borders = {
  light: `1px solid ${colors.border}`,
};

export type ThemeBorders = typeof borders;
export type ThemeBordersKeys = keyof ThemeBorders;

export const radii = {
  small: '4px',
  large: '8px',
};

export type ThemeRadii = typeof radii;
export type ThemeRadiiKeys = keyof ThemeRadii;

const shadowColor1 = transparentize(0.9, colors.fontPrimary);
const shadowColor2 = transparentize(0.94, colors.fontPrimary);
export const shadows = {
  xs: `0 1px 1px 0 ${shadowColor1}, 0 0 1px 0 ${shadowColor2}`,
  sm: `0 3px 3px -1px ${shadowColor1}, 0 0 1px 0 ${shadowColor2}`,
  md: `0 6px 6px -1px ${shadowColor1}, 0 0 1px 0 ${shadowColor2}`,
  lg: `0 16px 16px -1px ${shadowColor1}, 0 0 1px 0 ${shadowColor2}`,
  xl: `0 32px 40px -2px ${transparentize(0.88, colors.fontPrimary)}, 0 0 1px 0 ${shadowColor2}`,
};

export type ThemeShadows = typeof shadows;
export type ThemeShadowsKeys = keyof ThemeShadows;

export const transitions = {
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
};

export type ThemeTransitions = typeof transitions;
export type ThemeTransitionsKeys = keyof ThemeTransitions;

const theme = {
  colors,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  borderWidths,
  borders,
  radii,
  shadows,
  transitions,
};

export type Theme = typeof theme;

export default theme;
