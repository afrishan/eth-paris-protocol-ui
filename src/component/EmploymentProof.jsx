import React from 'react';
import {
  SismoConnectButton,
  AuthType,
} from '@sismo-core/sismo-connect-react';

import {
  formatError,
  useContract,
  getResults,
  goerli,
} from "@/utils";

const CHAIN = mumbaiFork;
const [responseBytes, setResponseBytes] = useState<string | null>(null);
const MySismoConnectButton = () => {
  // Configurations for SismoConnect
const config = {
    appId: '0xf4977993e52606cfd67b7a1cde717069',
    vault: {
      impersonate: [ 
        'chaaam.eth', 
        'twitter:iamchaam',
        'github:jflo'
      ],
    },
};

 const { airdropContract, waitingForTransaction } = useContract({
    responseBytes,
    chain: CHAIN,
  });

  // Callback function for when SismoConnect responds with proofs
  const handleResponse = async (response) => {
    // Send the response to your server to verify it
    // using the @sismo-core/sismo-connect-server package
    write.doSomethingUsingSismoConnect
  };

  // Callback function for when SismoConnect responds with bytes
  const handleResponseBytes = async (bytes) => {
    try {
      //Write in the smart contract the hash of the bytes 
      const hash = await airdropContract.write.doSomethingUsingSismoConnect([responseBytes, address]);
      let twReceipt = await waitingForTransaction(hash);
      if (twReceipt?.status === "success") {
        console.log("transaction success");
      } else {
        console.log("transaction failed");
      }

    } catch (e) {
      console.log(e);
      }
    };
}; 

  return (
    <>
      {/* First SismoConnectButton */}
      <SismoConnectButton
        config={config}
        auth={{ authType: AuthType.VAULT }}
        claim={{ groupId: '0x42c768bb8ae79e4c5c05d3b51a4ec74a' }}
        signature={{ message: 'I confirm to work for this compagny' }}
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
          { groupId: '0xe9caa36df5e8c24f195cc7a9c475de08' },
        ]}
        signature={{ message: 'I confirm to work for this compagny' }}
        onResponse={handleResponse}
        onResponseBytes={handleResponseBytes}
      />
    </>
  );
};

export default MySismoConnectButton;
