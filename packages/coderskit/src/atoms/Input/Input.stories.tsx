import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text, number } from '@storybook/addon-knobs';
import { Input } from '.';

const sizes = {
  large: 'large',
  default: 'default',
  small: 'small',
};

const states = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading',
};

const types = {
  email: 'email',
  hidden: 'hidden',
  password: 'password',
  search: 'search',
  tel: 'tel',
  text: 'text',
  url: 'url',
};

storiesOf('Atoms', module).add('Input', () => {
  const props = {
    disabled: boolean('disabled', false),
    hasFeedback: boolean('hasFeedback', true),
    size: select('size', sizes, 'default') as keyof typeof sizes,
    type: select('type', types, 'text') as keyof typeof types,
    state: select('state', states, 'default') as keyof typeof states,
    placeholder: text('placeholder', 'Placeholder'),
    width: number('width', 240),
    name: text('name', 'field'),
  };

  return <Input {...props} />;
});
