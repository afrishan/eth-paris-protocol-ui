import React from 'react';
import {
  SismoConnectButton,
  AuthType,
  SismoConnectConfig,
  SismoConnectResponse,
} from '@sismo-core/sismo-connect-react';

const MySismoConnectButton = () => {
  // Configurations for SismoConnect
  const config: SismoConnectConfig = {
    appId: '0xf4977993e52606cfd67b7a1cde717069',
  };

  // Callback function for when SismoConnect responds with proofs
  const handleResponse = async (response: SismoConnectResponse) => {
    // Send the response to your server to verify it
    // using the @sismo-core/sismo-connect-server package
  };

  // Callback function for when SismoConnect responds with bytes
  const handleResponseBytes = async (bytes: string) => {
    // Send the response to your contract to verify it
    // using the @sismo-core/sismo-connect-solidity package
  };

  return (
    <>
      {/* First SismoConnectButton */}
      <SismoConnectButton
        config={config}
        auth={{ authType: AuthType.VAULT }}
        claim={{ groupId: '0x42c768bb8ae79e4c5c05d3b51a4ec74a' }}
        signature={{ message: 'Your message' }}
        onResponse={handleResponse}
        onResponseBytes={handleResponseBytes}
      />

      {/* Second SismoConnectButton */}
      <SismoConnectButton
        config={config}
        auths={[
          { authType: AuthType.VAULT },
          { authType: AuthType.TWITTER },
        ]}
        claims={[
          { groupId: '0x42c768bb8ae79e4c5c05d3b51a4ec74a' },
          { groupId: '0x8b64c959a715c6b10aa8372100071ca7' },
        ]}
        signature={{ message: 'Your message' }}
        onResponse={handleResponse}
        onResponseBytes={handleResponseBytes}
      />
    </>
  );
};

export default MySismoConnectButton;
