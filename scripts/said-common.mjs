import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';

export const RPC_URL = 'https://api.mainnet-beta.solana.com';
export const PROGRAM_ID = new PublicKey('5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G');
export const TREASURY_PDA = new PublicKey('2XfHTeNWTjNwUmgoXaafYuqHcAAXj8F5Kjw2Bnzi4FxH');

export function loadWallet(walletPath) {
  const resolvedPath = walletPath || 
    process.env.SOLANA_WALLET ||
    path.join(os.homedir(), '.config/solana/id.json');
  
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Wallet not found at ${resolvedPath}. Specify --wallet or set SOLANA_WALLET env.`);
  }
  
  const data = JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'));
  return Keypair.fromSecretKey(new Uint8Array(data));
}

export function getAgentPDA(owner) {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from('agent'), owner.toBuffer()],
    PROGRAM_ID
  );
  return pda;
}

export function getDiscriminator(name) {
  return crypto.createHash('sha256').update(`global:${name}`).digest().slice(0, 8);
}

export function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      result[key] = args[i + 1] || true;
      i++;
    }
  }
  return result;
}
