"use client";

import { useEffect, useState } from "react";
import {
  goerli,
} from "viem/chains";
import { Chain, configureChains, createConfig } from "wagmi";
import { WagmiConfig } from "wagmi";
import { publicProvider } from '@wagmi/core/providers/public'
import React from "react";
export { goerli };
import EmploymentProof from "../component/EmploymentProof.jsx"

const { chains, publicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
  })

export function WagmiProvider({ children }: { children: React.ReactNode }) {

  return (
    <WagmiConfig config={config}>
        <EmploymentProof/>
    </WagmiConfig>
  );
}