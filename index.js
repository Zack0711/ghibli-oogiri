import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/styles'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'


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
  dsn: "https://acc748d7f2304822a8842570ccc73c14@o437865.ingest.sentry.io/5442139",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Editor />
  </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
