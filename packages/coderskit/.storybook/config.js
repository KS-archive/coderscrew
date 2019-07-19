import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { addReadme } from 'storybook-readme';
import { theme, globalStyle, initializeNotifications } from '../src';

const req = require.context('../src', true, /.stories.tsx$/);

const withGlobal = story => (
  <ThemeProvider theme={theme}>
    <div style={{ width: '100%', height: '100%', padding: 32 }}>
      <Global styles={globalStyle} />
      {story()}
      {initializeNotifications()}
    </div>
  </ThemeProvider>
);

addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(addReadme);
addDecorator(withGlobal);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
