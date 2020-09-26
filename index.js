import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/apm';

import {
  Router,
  Redirect,
  createHistory,
  LocationProvider,
} from '@reach/router'

import "core-js/stable"
import "regenerator-runtime/runtime"

import './reset.css'

import Editor from './src/components/editor'

import theme from './src/theme'

const history = createHistory(window)

Sentry.init({
  dsn: "https://d45502e3d91647baaf14421f64fc61f1@o437865.ingest.sentry.io/5400910",
  integrations: [
    new Integrations.Tracing(),
  ],
  tracesSampleRate: 1.0,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Editor />
  </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
