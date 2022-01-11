import React from 'react';
import { render } from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from './context/context';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';
import App from './App';
import { GlobalStyle } from './styles/globalStyle';

cryptoWaitReady().then(() => {
  keyring.loadAll({ ss58Format: 42, type: 'sr25519' }); // load all available addresses and accounts
  render(
    <ContextProvider>
      <GlobalStyle />
      <Toaster />
      <App />
    </ContextProvider>,
    document.getElementById('root')
  );
});
