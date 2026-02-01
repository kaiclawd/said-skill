#!/usr/bin/env node
import { Connection, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { RPC_URL, PROGRAM_ID, TREASURY_PDA, loadWallet, getAgentPDA, getDiscriminator, parseArgs } from './said-common.mjs';

const args = parseArgs();
const wallet = loadWallet(args.wallet);
const connection = new Connection(RPC_URL, 'confirmed');
const agentPDA = getAgentPDA(wallet.publicKey);

console.log('Wallet:', wallet.publicKey.toString());
console.log('Agent PDA:', agentPDA.toString());
console.log('Fee: 0.01 SOL → Treasury');

// Check if registered
const existing = await connection.getAccountInfo(agentPDA);
if (!existing) {
  console.error('❌ Not registered! Run said-register.mjs first.');
  process.exit(1);
}

// Build instruction
const discriminator = getDiscriminator('get_verified');

const instruction = new TransactionInstruction({
  keys: [
    { pubkey: agentPDA, isSigner: false, isWritable: true },
    { pubkey: TREASURY_PDA, isSigner: false, isWritable: true },
    { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ],
  programId: PROGRAM_ID,
  data: discriminator,
});

const tx = new Transaction().add(instruction);
const { blockhash } = await connection.getLatestBlockhash();
tx.recentBlockhash = blockhash;
tx.feePayer = wallet.publicKey;
tx.sign(wallet);

console.log('Sending transaction...');
const sig = await connection.sendRawTransaction(tx.serialize());
await connection.confirmTransaction(sig, 'confirmed');

console.log('✅ Agent verified on SAID!');
console.log('Tx:', 'https://solscan.io/tx/' + sig);
