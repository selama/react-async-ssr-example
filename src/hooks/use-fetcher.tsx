import React, { useContext } from 'react';

export interface FetchersResources {
  fethchersResources: {
    [fetchId: string]: {
      status: 'pre-fetch' | 'fetch-fulfilled';
      data?: unknown;
    };
  };
}

export const FetcherResourcesCTX = React.createContext<FetchersResources>({
  fethchersResources: {},
});

export const suspendable = <P extends React.PropsWithChildren<unknown>>(
  Component: React.FunctionComponent<P>,
) => {
  return (props: P) => (
    <React.Suspense fallback="loading">
      <Component {...props} />
    </React.Suspense>
  );
};

export const useFetcher = <D extends unknown>(
  fetcher: () => Promise<D>,
  fetchMemoId: string,
) => {
  const { fethchersResources } = useContext(FetcherResourcesCTX);

  if (!fethchersResources[fetchMemoId]) {
    fethchersResources[fetchMemoId] = { status: 'pre-fetch' };
  }

  if (fethchersResources[fetchMemoId].status === 'fetch-fulfilled') {
    return fethchersResources[fetchMemoId].data as D;
  }

  const promise = fetcher()
    .then((res) => {
      fethchersResources[fetchMemoId].status = 'fetch-fulfilled';
      fethchersResources[fetchMemoId].data = res;
    })
    .catch(() => {
      fethchersResources[fetchMemoId].status = 'fetch-fulfilled';
    });
  throw promise;
};
