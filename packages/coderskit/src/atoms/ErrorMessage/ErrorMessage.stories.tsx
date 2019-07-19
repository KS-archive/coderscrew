import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import { ErrorMessage } from '.';

storiesOf('Atoms', module).add('ErrorMessage', () => {
  const props = {
    children: text('children', 'Type something'),
    width: number('width', 240),
  };

  const { children, ...rest } = props;

  return <ErrorMessage {...rest}>{children}</ErrorMessage>;
});
