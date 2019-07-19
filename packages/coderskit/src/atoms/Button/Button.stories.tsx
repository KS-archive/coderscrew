import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { colors as themeColors } from '../..';
import { Button } from '.';
import readme from './Button.md';

const variants = {
  contained: 'contained',
  outlined: 'outlined',
  text: 'text',
};

const sizes = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const elements = {
  a: 'a',
  button: 'button',
  div: 'div',
  span: 'span',
};

const kinds = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

storiesOf('Atoms', module)
  .addParameters({
    readme: {
      content: readme,
    },
  })
  .add('Button', () => {
    const props = {
      disabled: boolean('disabled', false),
      variant: select('variant', variants, 'contained') as keyof typeof variants,
      kind: select('kind', kinds, 'primary') as keyof typeof kinds,
      size: select('size', sizes, 'default') as keyof typeof sizes,
      as: select('as', elements, 'button') as keyof typeof elements,
    };

    return <Button {...props}>Example Button</Button>;
  });
