import { renderToStringAsync } from 'react-async-ssr';
import React from 'react';
import App from './components/App';

export const renderAppHtmlToString = async () => {
  return renderToStringAsync(
        <App />
  );
}
