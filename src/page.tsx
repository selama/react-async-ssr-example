import { renderToStringAsync } from 'react-async-ssr';
import React from 'react';
import App from './components/App';
import { FetchersResources, FetcherResourcesCTX } from './hooks/use-fetcher';

export const renderAppHtmlToString = async (
  fetchersResources: FetchersResources,
) => {
  return renderToStringAsync(
    <FetcherResourcesCTX.Provider value={fetchersResources}>
      <App />
    </FetcherResourcesCTX.Provider>,
  );
};
