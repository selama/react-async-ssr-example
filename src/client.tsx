import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import { create as createFedopsLogger } from '@wix/fedops-logger';
import App from './components/App';
import { FetchersResources, FetcherResourcesCTX } from './hooks/use-fetcher';

const baseURL = window.__BASEURL__;
const fetchersResources: FetchersResources = window.__FETCHERS_RESOURCES__;

wixAxiosConfig(axios, { baseURL });

const fedopsLogger = createFedopsLogger('react-async-ssr-example');

// Move the following `appLoaded()` call to the point where your app has fully loaded.
// See https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md
fedopsLogger.appLoaded();

ReactDOM.hydrate(
  <FetcherResourcesCTX.Provider value={fetchersResources}>
    <App />
  </FetcherResourcesCTX.Provider>,
  document.getElementById('root'),
);
