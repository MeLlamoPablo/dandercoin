import { createInstance, INDEXEDDB, LOCALSTORAGE } from 'localforage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { QueryClient } from 'react-query';
import type { DehydratedState } from 'react-query/hydration';
import { dehydrate, hydrate } from 'react-query/hydration';

import { GET_WALLET_QUERY_KEY } from './queries/wallet/getWallet';

const STATE_KEY = 'app:state';
const STATE_VERSION = 1;

type Store = ReturnType<typeof createInstance>;

function createStore(): Store {
  return createInstance({
    driver: [INDEXEDDB, LOCALSTORAGE],
    name: `dandercoin_v${STATE_VERSION}`,
  });
}

async function loadState({
  store,
}: {
  store: Store;
}): Promise<DehydratedState | undefined> {
  const serializedState = await store.getItem<string>(STATE_KEY);

  if (!serializedState) {
    return undefined;
  }

  return JSON.parse(serializedState) as DehydratedState;
}

async function saveState({
  state,
  store,
}: {
  state: DehydratedState;
  store: Store;
}): Promise<void> {
  await store.setItem(STATE_KEY, JSON.stringify(state));
}

/*
 * "hydrate" doesn't overwrite any existing queries. However there are some
 * queries that we want to always load from the cache, so we explicitly override
 * them.
 *
 * https://react-query.tanstack.com/reference/hydration/hydrate
 */
function overwriteQueries(
  client: QueryClient,
  dehydratedState: DehydratedState,
) {
  const getWalletQuery = dehydratedState.queries.find(
    (query) => query.queryKey === GET_WALLET_QUERY_KEY(),
  );

  if (getWalletQuery) {
    client.setQueryData(GET_WALLET_QUERY_KEY(), getWalletQuery.state.data, {
      updatedAt: getWalletQuery.state.dataUpdatedAt,
    });
  }
}

const useLoadState = ({
  client,
  store,
}: {
  client: QueryClient;
  store: Store;
}): { initialized: boolean } => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    loadState({ store })
      .then((dehydratedState) => {
        if (dehydratedState) {
          hydrate(client, dehydratedState);
          overwriteQueries(client, dehydratedState);
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => {
        setInitialized(true);
      });
  }, [client, setInitialized, store]);

  return {
    initialized,
  };
};

const useSaveState = ({
  client,
  initialized,
  store,
}: {
  client: QueryClient;
  initialized: boolean;
  store: Store;
}) => {
  const onCacheUpdated = useCallback(() => {
    new Promise((r) => setTimeout(r, 2000))
      .then(() =>
        saveState({
          state: dehydrate(client),
          store,
        }),
      )
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [client, store]);

  useEffect(() => {
    if (!initialized) {
      return () => {
        /* noop */
      };
    }

    const unsubscribe = client.getQueryCache().subscribe(onCacheUpdated);

    return () => {
      unsubscribe();
    };
  }, [client, initialized, onCacheUpdated]);
};

export default function useStorage(client: QueryClient) {
  const store = useMemo(createStore, []);
  const { initialized } = useLoadState({ client, store });
  useSaveState({ client, initialized, store });
}
