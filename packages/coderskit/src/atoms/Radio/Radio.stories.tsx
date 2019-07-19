import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { Radio } from '.';

storiesOf('Atoms', module).add('Radio', () => {
  const props = {
    disabled: boolean('disabled', false),
    children: text('children', 'Radio label'),
  };

  return <Radio {...props} />;
});
