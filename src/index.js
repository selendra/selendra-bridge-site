import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { ContextProvider } from './context/context';
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

cryptoWaitReady().then(() => {
  // load all available addresses and accounts
  keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
  
  render(
    <ContextProvider>
      <Toaster />
      <App />
    </ContextProvider>,
    document.getElementById('root')
  );
});