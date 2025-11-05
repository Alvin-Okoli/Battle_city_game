import { useContext, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ScoreContext } from '../providers/AuthProvider'

// WalletConnect and ethers imports
import { ethers } from 'ethers'
import { createAppKit, useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import {  sepolia } from "@reown/appkit/networks";

// Neura Testnet network configuration
const neuraTestnet = {
  id: 267,
  name: 'Neura Testnet',
  network: 'neura-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ANKR',
    symbol: 'ANKR',
  },
  rpcUrls: {
    default: { http: ['https://testnet.rpc.neuraprotocol.io'] },
    public: { http: ['https://testnet.rpc.neuraprotocol.io'] },
  },
  blockExplorers: {
    default: { 
      name: 'Neura Explorer', 
      url: 'https://testnet-blockscout.infra.neuraprotocol.io' 
    },
  },
  testnet: true,
};

// AppKit setup
const projectId = import.meta.env.VITE_PROJECT_ID;

const metadata = {
  name: "Battle City Game",
  description: "Neura Chain Battle City Game",
  url: "//https://battle-city-game.vercel.app",
  icons: [],
};

//  Create the modal once
createAppKit({
  adapters: [new EthersAdapter()],
  networks: [ neuraTestnet, sepolia],
  metadata,
  projectId,
  features: {
  analytics: true,
  },
}); 

export default function Auth() {
  const {score} = useContext(ScoreContext);
  const { open } = useAppKit();
  const {disconnect} = useDisconnect();
  const { address, isConnected } = useAppKitAccount();

  return (
     <div className='text-center bg-black h-screen pt-40 md:pt-50 bg-[url(/BattlefieldBackground.jpeg)] bg-bottom lg:bg-center bg-no-repeat bg-cover'>
      <h1 className='text-5xl font-bold text-white mb-30'>Neura Chain Battle City</h1>

      <div>
        <NavLink to='/game'><div className='p-2 my-4 w-60 mx-auto bg-amber-600 cursor-pointer rounded-2xl text-2xl text-white hover:'>Play</div></NavLink>
        <div className='p-2 w-60 mx-auto my-4 bg-amber-600 cursor-pointer rounded-2xl text-2xl text-white'>Leaderboard</div>
        <div className='p-2 w-60 mx-auto my-4 bg-amber-600 cursor-pointer rounded-2xl text-2xl text-white'>Stats</div>
        <div className='p-2 w-60 mx-auto my-4 bg-amber-600 cursor-pointer rounded-2xl text-2xl text-white'>Tutorial</div>
        {isConnected && address && <div  onClick={() => disconnect()} className='p-2 w-60 mx-auto my-4 bg-gray-600 cursor-pointer rounded-2xl text-2xl text-white'>Disconnect</div>}
      </div>

      <div className='fixed top-0 left-1/12'>
        {isConnected && address ? (
          <>
            <p className='p-2 px-6 my-4 cursor-pointer rounded-2xl border-4 text-lg md:text-2xl text-white animate-pulse'> {address.slice(0, 6)}...{address.slice(-4)}</p>
            <button className='p-2 px-6 my-4 cursor-pointer rounded-2xl text-2xl text-white animate-pulse'></button>
          </>
        ) : (
          <button onClick={() => open()} className='p-2 px-6 my-4 cursor-pointer rounded-2xl border-4 text-lg md:text-2xl text-white animate-pulse'>Log in</button>
        )}
      </div>

      <div className='fixed top-0 right-1/12'>
        <div className='p-2 px-6 my-4 cursor-pointer rounded-2xl text-lg md:text-2xl text-white '>Score: {score}</div>
      </div>
      <Outlet/>
    </div>
  )
}
