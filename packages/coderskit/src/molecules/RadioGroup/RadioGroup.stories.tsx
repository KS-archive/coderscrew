import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, radios } from '@storybook/addon-knobs';
import { Radio } from '../..';
import { RadioGroup } from '.';

const layouts = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

storiesOf('Molecules', module).add('RadioGroup', () => {
  const props = {
    layout: radios('layout', layouts, 'vertical') as keyof typeof layouts,
    name: text('name', 'fruits'),
  };

  return (
    <RadioGroup {...props}>
      <Radio value="apple">Apple</Radio>
      <Radio value="orange">Orange</Radio>
      <Radio value="banana">Banana</Radio>
    </RadioGroup>
  );
});
