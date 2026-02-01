#!/usr/bin/env node
import { Connection } from '@solana/web3.js';
import { RPC_URL, PROGRAM_ID, loadWallet, getAgentPDA, parseArgs } from './said-common.mjs';

const args = parseArgs();
const wallet = loadWallet(args.wallet);
const connection = new Connection(RPC_URL, 'confirmed');

console.log('Wallet:', wallet.publicKey.toString());

const agentPDA = getAgentPDA(wallet.publicKey);
console.log('Agent PDA:', agentPDA.toString());

const balance = await connection.getBalance(wallet.publicKey);
console.log('Balance:', (balance / 1e9).toFixed(4), 'SOL');

const agentAccount = await connection.getAccountInfo(agentPDA);

if (!agentAccount) {
  console.log('\n❌ Not registered on SAID');
  console.log('Run: node scripts/said-register.mjs --metadata "https://yoursite.com/agent.json"');
} else {
  console.log('\n✅ Registered on SAID');
  // Parse account data (skip 8-byte discriminator)
  const data = agentAccount.data;
  const isVerified = data[32 + 4 + 200 + 8] === 1; // owner(32) + metadata_uri length prefix(4) + max string(200) + created_at(8) + is_verified(1)
  console.log('Verified:', isVerified ? '✅ Yes' : '❌ No');
  if (!isVerified) {
    console.log('Get verified: node scripts/said-verify.mjs (costs 0.01 SOL)');
  }
}

console.log('\nExplorer: https://solscan.io/account/' + agentPDA.toString());
