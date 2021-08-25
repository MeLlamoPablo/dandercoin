import { useEffect, useState } from 'react';

import useWeb3 from '$/api/hooks/wallet/useWeb3';

export default function useCurrentBlock() {
  const { web3 } = useWeb3();
  const [block, setBlock] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!web3) {
      return;
    }

    web3.eth
      .getBlock('latest')
      .then((block) => {
        setBlock(block.number);
      })
      .catch(() => setBlock(0));
  }, [setBlock, web3]);

  const initialized = typeof block !== 'undefined';

  useEffect(() => {
    if (!initialized || !web3) {
      return;
    }

    const subscription = web3.eth.subscribe(
      'newBlockHeaders',
      (error, block) => {
        if (!error) {
          setBlock(block.number);
        }
      },
    );

    return () => {
      void subscription.unsubscribe();
    };
  }, [initialized, setBlock, web3]);

  return block;
}
