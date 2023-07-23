import './App.css'
import React from 'react' 
import EmploymentProof from './component/EmploymentProof'

function App() {
  return (
    <div>
      <EmploymentProof/>
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
