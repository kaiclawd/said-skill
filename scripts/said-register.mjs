#!/usr/bin/env node
import { Connection, Transaction, TransactionInstruction, SystemProgram } from '@solana/web3.js';
import { RPC_URL, PROGRAM_ID, loadWallet, getAgentPDA, getDiscriminator, parseArgs } from './said-common.mjs';

const args = parseArgs();
if (!args.metadata) {
  console.error('Usage: node said-register.mjs --metadata "https://yoursite.com/agent.json" [--wallet path]');
  process.exit(1);
}

const wallet = loadWallet(args.wallet);
const connection = new Connection(RPC_URL, 'confirmed');
const agentPDA = getAgentPDA(wallet.publicKey);

console.log('Wallet:', wallet.publicKey.toString());
console.log('Agent PDA:', agentPDA.toString());
console.log('Metadata URI:', args.metadata);

// Check if already registered
const existing = await connection.getAccountInfo(agentPDA);
if (existing) {
  console.log('⚠️ Already registered! Use update instead.');
  process.exit(0);
}

// Build instruction
const discriminator = getDiscriminator('register_agent');
const metadataBuffer = Buffer.from(args.metadata, 'utf-8');
const lengthBuffer = Buffer.alloc(4);
lengthBuffer.writeUInt32LE(metadataBuffer.length);
const data = Buffer.concat([discriminator, lengthBuffer, metadataBuffer]);

const instruction = new TransactionInstruction({
  keys: [
    { pubkey: agentPDA, isSigner: false, isWritable: true },
    { pubkey: wallet.publicKey, isSigner: true, isWritable: true },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
  ],
  programId: PROGRAM_ID,
  data,
});

const tx = new Transaction().add(instruction);
const { blockhash } = await connection.getLatestBlockhash();
tx.recentBlockhash = blockhash;
tx.feePayer = wallet.publicKey;
tx.sign(wallet);

console.log('Sending transaction...');
const sig = await connection.sendRawTransaction(tx.serialize());
await connection.confirmTransaction(sig, 'confirmed');

console.log('✅ Agent registered on SAID!');
console.log('Tx:', 'https://solscan.io/tx/' + sig);
