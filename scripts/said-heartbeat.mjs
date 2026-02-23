#!/usr/bin/env node
import { loadWallet, parseArgs } from './said-common.mjs';

const SAID_API = 'https://api.saidprotocol.com';

async function sendHeartbeat(wallet) {
  const walletAddress = wallet.publicKey.toString();
  
  try {
    const res = await fetch(`${SAID_API}/api/verify/layer2/activity/${walletAddress}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${await res.text()}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Heartbeat failed: ${error.message}`);
  }
}

async function main() {
  const args = parseArgs();
  const walletPath = args.wallet;
  const daemon = args.daemon || false;
  const interval = parseInt(args.interval || '30'); // default 30 minutes
  
  console.log('🤖 SAID Activity Heartbeat');
  console.log('─'.repeat(50));
  
  // Load wallet
  let wallet;
  try {
    wallet = loadWallet(walletPath);
    console.log(`Wallet: ${wallet.publicKey.toString()}`);
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }
  
  if (daemon) {
    console.log(`\n🔄 Running in daemon mode (heartbeat every ${interval} minutes)`);
    console.log('Press Ctrl+C to stop\n');
    
    // Send initial heartbeat
    try {
      const data = await sendHeartbeat(wallet);
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ✅ Heartbeat sent`);
      console.log(`   Activity count: ${data.activityCount}`);
      console.log(`   Last active: ${new Date(data.lastActiveAt).toLocaleString()}`);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ❌ ${error.message}`);
    }
    
    // Schedule recurring heartbeats
    setInterval(async () => {
      try {
        const data = await sendHeartbeat(wallet);
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ✅ Heartbeat sent`);
        console.log(`   Activity count: ${data.activityCount}`);
        console.log(`   Last active: ${new Date(data.lastActiveAt).toLocaleString()}`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] ❌ ${error.message}`);
      }
    }, interval * 60 * 1000); // convert minutes to milliseconds
    
  } else {
    // One-time heartbeat
    console.log('\n📡 Sending heartbeat...');
    
    try {
      const data = await sendHeartbeat(wallet);
      console.log('✅ Heartbeat sent successfully!');
      console.log(`\nActivity count: ${data.activityCount}`);
      console.log(`Last active: ${new Date(data.lastActiveAt).toLocaleString()}`);
      console.log(`\nProfile: https://saidprotocol.com/agents/${wallet.publicKey.toString()}`);
    } catch (error) {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    }
  }
}

main().catch(console.error);
