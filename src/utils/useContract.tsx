import { useState } from "react";
import {
  Chain,
  GetContractReturnType,
  PublicClient,
  TransactionReceipt,
  WalletClient,
  getContract,
} from "viem";
import { useWalletClient } from "wagmi";
import { waitForTransaction, getPublicClient } from "@wagmi/core";
import ParityABI from "./abi/ParityABI.json";


import { fundMyAccountOnLocalFork } from "./fundMyAccountOnLocalFork";

export type ContractClaim = {
  parityContract: GetContractReturnType<typeof ParityABI, PublicClient, WalletClient>;
  waitingForTransaction: (hash: `0x${string}`) => Promise<TransactionReceipt | undefined>;
  error: string;
};

export default function useContract({
  chain,
}: {
  responseBytes: string | null;
  chain: Chain;
}): ContractClaim {
  const [error, setError] = useState<string>("");
  const publicClient = getPublicClient();
  const { data: walletClient } = useWalletClient();

  const ParityContract = getContract({
    address: '0x06d7ba58bb20349a2dc186c635512e390213bfd1',
    abi: ParityABI,
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
    parityContract: ParityContract,
    waitingForTransaction,
    error,
  };
}