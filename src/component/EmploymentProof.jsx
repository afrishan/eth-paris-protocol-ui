import React from "react";
import { SismoConnectButton, AuthType } from "@sismo-core/sismo-connect-react";

const MySismoConnectButton = () => {
  const config = {
    appId: "0xd7689d36e3813e9f11f8c3ddcc695737",
    vault: {
      impersonate: ["chaaam.eth", "twitter:iamchaam", "github:jflo"],
    },
  };

  const handleResponseBytes = async (bytes) => {
    // console.debug("bytes", bytes);
  };

  return (
    <>
      <SismoConnectButton
        config={config}
        auths={[{ authType: AuthType.VAULT }, { authType: AuthType.TWITTER }]}
        claims={[{ groupId: "0xe9caa36df5e8c24f195cc7a9c475de08" }]}
        signature={{message: "I confirm to work for this company", isSelectableByUser: true}}
        onResponse={ async (response) => {
          await fetch("http://localhost:3000/verify-sismo-connect", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ sismo: response })
          });
        }}
        />
    </>
  );
};

export default MySismoConnectButton;
