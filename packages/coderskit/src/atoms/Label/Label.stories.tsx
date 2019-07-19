import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import { Label } from '.';

storiesOf('Atoms', module).add('Label', () => {
  const props = {
    children: text('children', 'Type something'),
    disabled: boolean('disabled', false),
    width: number('width', 240),
  };

  const { children, ...rest } = props;

  return <Label {...rest}>{children}</Label>;
});
