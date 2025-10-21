import { useState } from 'react'
import { ethers } from 'ethers'
import EthereumProvider from '@walletconnect/ethereum-provider'

export default function Auth() {
  const [address, setAddress] = useState(null)
  const [provider, setProvider] = useState(null)

  const connectWallet = async ()=>{
      try{
        const wcProvider = await EthereumProvider.init({
        projectId: '2c5dfc1dcf07e110a8fef3a65835ea88',
        optionalChains: [1],
        showQrModal: true,
        relayUrl: 'wss://relay.walletconnect.com',
      })

      await wcProvider.connect()

      const ethersProvider = new ethers.BrowserProvider(wcProvider)
      const signer = await ethersProvider.getSigner();
      const userAddress = await signer.getAddress()

      setProvider(ethersProvider);
      setAddress(userAddress)
    }
    catch(err){
      console.error(err)
    }
  }

  const disconnectWallet = async () => {
    if (provider?.provider?.disconnect) {
      await provider.provider.disconnect();
    }
    setAddress(null);
    setProvider(null);
  };

  return (
     <div className='text-center bg-black h-screen pt-40 bg-[url(BattlefieldBackground.jpeg)] bg-bottom  bg-no-repeat bg-auto'>
      <h1 className='text-5xl font-bold text-white mb-30'>Neura Chain Battle City</h1>

      <div>
        <div>Play</div>
        <div>Leaderboard</div>
        <div>Settings</div>
        <div>Tutorial</div>
      </div>

      <div className='fixed top-0 right-1/6'>
        {address ? (
          <>
            <p>Connected: {address}</p>
            <button onClick={disconnectWallet} className='p-1 my-4 bg-gray-300 cursor-pointer'>Disconnect</button>
          </>
        ) : (
          <button onClick={connectWallet} className='p-2 px-6 my-4 bg-amber-600 cursor-pointer rounded-2xl text-2xl text-white animate-pulse'>Connect Wallet to Play</button>
        )}
      </div>
    </div>
  )
}
