import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, number } from '@storybook/addon-knobs';
import { colors as themeColors, ThemeColorsKeys } from '../..';
import { Icon } from '.';

const kinds = Object.keys(themeColors).reduce((a, key) => ({ ...a, [key]: key }), {});

const icons = {
  'grin-tears-solid.svg': 'grin-tears-solid.svg',
  'grin-tongue-solid.svg': 'grin-tongue-solid.svg',
  'kiss-solid.svg': 'kiss-solid.svg',
  'laugh-beam-solid.svg': 'laugh-beam-solid.svg',
  'smile-beam-solid.svg': 'smile-beam-solid.svg',
};

storiesOf('Atoms', module).add('Icon', () => {
  const props = {
    spin: boolean('spin', false),
    visible: boolean('visible', true),
    src: select('src', icons, 'smile-beam-solid.svg'),
    kind: select('kind', kinds, 'primary') as ThemeColorsKeys,
    size: number('size', 16),
  };

  return <Icon {...props} />;
});
