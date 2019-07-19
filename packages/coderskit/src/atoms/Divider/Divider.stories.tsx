import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Divider } from '.';

storiesOf('Atoms', module).add('Divider', () => {
  const props = {
    children: text('children', 'Label text'),
  };

  const { children } = props;

  return <Divider>{children}</Divider>;
});
