import './App.css'
import { useState, useEffect, useRef } from 'react'
import SocialLogin from "@biconomy/web3-auth"
import { ChainId } from "@biconomy/core-types";
import { ethers } from 'ethers'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccount,BiconomySmartAccountConfig, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { IPaymaster, BiconomyPaymaster,} from '@biconomy/paymaster'
import './App.css'

function App() {
  const bundler = new Bundler({
    bundlerUrl: 'https://bundler.biconomy.io/api/v2/80001/abc', // you can get this value from biconomy dashboard.     
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })

  const paymaster = new BiconomyPaymaster({
    paymasterUrl: 'https://paymaster.biconomy.io/api/v1/5/PYwoNvk0U.e05739f6-b8e9-455c-85fb-b80d2c5f85cb' 
  })

  const [smartAccount, setSmartAccount] = useState(null)
  const [interval, enableInterval] = useState(false)
  const sdkRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState(null);

  const [count, setCount] = useState(0);

  async function login() {
    if (!sdkRef.current) {
      const socialLoginSDK = new SocialLogin();
      const signature1 = await socialLoginSDK.whitelistUrl(
        "http://127.0.0.1:5173/"
      );
      await socialLoginSDK.init({
        chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
        network: "testnet",
        whitelistUrls: {
          "http://127.0.0.1:5173/": signature1,
        },
      });
      sdkRef.current = socialLoginSDK;
    }
    if (!sdkRef.current.provider) {
      sdkRef.current.showWallet();
      enableInterval(true);
    } else {
      setupSmartAccount();
    }
  }

  async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return
    sdkRef.current.hideWallet()
    setLoading(true)
    const web3Provider = new ethers.providers.Web3Provider(
      sdkRef.current.provider
    )
    setProvider(web3Provider)
    
    try {
      const biconomySmartAccountConfig = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster
      }
      let biconomySmartAccount = new BiconomySmartAccount(biconomySmartAccountConfig)
      biconomySmartAccount =  await biconomySmartAccount.init()
      console.log("owner: ", biconomySmartAccount.owner)
      console.log("address: ", await biconomySmartAccount.getSmartAccountAddress())
      console.log("deployed: ", await biconomySmartAccount.isAccountDeployed( await biconomySmartAccount.getSmartAccountAddress()))

      setSmartAccount(biconomySmartAccount)
      setLoading(false)
    } catch (err) {
      console.log('error setting up smart account... ', err)
    }
  }

  const logout = async () => {
    if (!sdkRef.current) {
      console.error('Web3Modal not initialized.')
      return
    }
    await sdkRef.current.logout()
    sdkRef.current.hideWallet()
    setSmartAccount(null)
    enableInterval(false)
  }

  return (
    <div>
    <h1> Biconomy Smart Accounts using social login + Gasless Transactions</h1>

    {
      !smartAccount && !loading && <button onClick={login}>Login</button>
    }
    {
      loading && <p>Loading account details...</p>
    }
    {
      !!smartAccount && (
        <div className="buttonWrapper">
          <h3>Smart account address:</h3>
          <p>{smartAccount.address}</p>
          <Counter smartAccount={smartAccount} provider={provider} />
          <button onClick={logout}>Logout</button>
        </div>
      )
    }
    <p>
    Edit <code>src/App.tsx</code> and save to test
    </p>
    <a href="https://docs.biconomy.io/docs/overview" target="_blank" className="read-the-docs">
Click here to check out the docs
  </a>
  </div>
  )
}

export default App
