import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { globalStyle } from '@coderscrew/coderskit';
import { Global } from '@emotion/core';
import axios from 'axios';
import { theme } from 'utils';
import { AuthProvider } from 'providers/AuthContext';

// import Home from 'pages/Home';
import LoggedWrapper from 'pages/LoggedWrapper';
import SignIn from 'pages/SignIn';
import Dashboard from 'pages/Dashboard';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

const Root = () => (
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={() => <div>Home</div>} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route path="/app">
          <LoggedWrapper>
            <Route exact path="/app" component={Dashboard} />
          </LoggedWrapper>
        </Route>
      </Switch>
    </AuthProvider>
  </ThemeProvider>
);

export default Root;
