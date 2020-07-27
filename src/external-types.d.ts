/// <reference types="yoshi/types" />
/// <reference types="jest-yoshi-preset/types" />
/// <reference types="@wix/wix-bootstrap-renderer/declarations" />

interface Window {
  __LOCALE__: string;
  __BASEURL__: string;
  __MESSAGES__: Messages;
}

// tslint:disable-next-line:no-namespace
declare namespace Express {
  interface Request {
    aspects: any;
  }
}

declare module 'yoshi-template-intro';
declare module 'wix-node-i18n-cache';
declare module 'react-async-ssr';
