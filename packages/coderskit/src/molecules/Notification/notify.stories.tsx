import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text, number } from '@storybook/addon-knobs';
import { Button } from '../../';
import { notify } from '.';

const variants = {
  contained: 'contained',
  outlined: 'outlined',
};

const kinds = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

storiesOf('Molecules', module).add('Notification', () => {
  const props = {
    message: text('message', 'Sample notification'),
    duration: number('duration', 10),
    variant: select('variant', variants, 'contained') as keyof typeof variants,
    kind: select('kind', kinds, 'default') as keyof typeof kinds,
  };

  const { message, duration, ...rest } = props;

  const handleClick = () => {
    notify(message, { duration }, rest);
  };

  return <Button onClick={handleClick}>Notify me</Button>;
});
