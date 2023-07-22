import { useEffect, useState } from "react";
import {
  Chain,
  GetContractReturnType,
  PublicClient,
  TransactionReceipt,
  WalletClient,
  getContract,
} from "viem";
import { useAccount, useNetwork, useSwitchNetwork, useWalletClient } from "wagmi";
import { waitForTransaction, getPublicClient } from "@wagmi/core";
import { ParityABI } from "./abi/ParityABI.json";


import { fundMyAccountOnLocalFork } from "./fundMyAccountOnLocalFork";

export type ContractClaim = {
  airdropContract: GetContractReturnType<typeof ParityABI, PublicClient, WalletClient>;
  switchNetworkAsync: ((chainId?: number | undefined) => Promise<Chain>) | undefined;
  waitingForTransaction: (hash: `0x${string}`) => Promise<TransactionReceipt | undefined>;
  error: string;
};

export default function useContract({
  responseBytes,
  chain,
}: {
  responseBytes: string | null;
  chain: Chain;
}): ContractClaim {
  const [error, setError] = useState<string>("");
  const { chain: currentChain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const publicClient = getPublicClient();
  const { data: walletClient } = useWalletClient();
  const { isConnected, address } = useAccount({
    onConnect: async ({ address }) => address && (await fundMyAccountOnLocalFork(address)),
  });

  const ParityContract = getContract({
    address: transactions[0].contractAddress as `0x${string}`,
    abi: [...ParityABI],
    publicClient,
    walletClient: walletClient as WalletClient,
  });

  async function waitingForTransaction(
    hash: `0x${string}`
  ): Promise<TransactionReceipt | undefined> {
    let txReceipt: TransactionReceipt | undefined;
    if (chain.id === 5151111) {
      const timeout = new Promise((_, reject) =>
        setTimeout(() => {
          setError(
            "Transaction timed-out: If you are running a local fork on Anvil please make sure to reset your wallet nonce. In metamask:  Go to settings > advanced > clear activity and nonce data"
          );
        }, 10000)
      );
      const txReceiptPromise = hash && waitForTransaction({ hash: hash });
      const race = await Promise.race([txReceiptPromise, timeout]);
      txReceipt = race as TransactionReceipt;
    } else {
      txReceipt = hash && (await waitForTransaction({ hash: hash }));
    }
    return txReceipt;
  }

  return {
    airdropContract,
    switchNetworkAsync,
    waitingForTransaction,
    error,
  };
}