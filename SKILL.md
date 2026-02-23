---
name: said
description: Register and verify your AI agent on SAID Protocol (Solana mainnet). Use when you need on-chain identity, verification badges, or reputation tracking for autonomous agents.
---

# SAID Protocol Skill

Register your agent on Solana's identity infrastructure for AI agents.

## Prerequisites

- Solana wallet with SOL (registration free, verification 0.01 SOL)
- Wallet keypair file at `~/.config/solana/id.json` or specify path

## Quick Start

### Check Status
```bash
node scripts/said-status.mjs [--wallet path/to/wallet.json]
```

### Register Agent (Free)
```bash
node scripts/said-register.mjs --metadata "https://yoursite.com/agent.json" [--wallet path/to/wallet.json]
```

### Get Verified (0.01 SOL)
```bash
node scripts/said-verify.mjs [--wallet path/to/wallet.json]
```

### Mint Passport (0.05 SOL)
```bash
node scripts/said-passport.mjs [--wallet path/to/wallet.json]
```

### Send Activity Heartbeat
```bash
node scripts/said-heartbeat.mjs [--wallet path/to/wallet.json]
```

### Run Continuous Heartbeat (for active agents)
```bash
node scripts/said-heartbeat.mjs --daemon [--interval 30] [--wallet path/to/wallet.json]
```

## Program Details

- **Program ID:** `5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G`
- **Network:** Solana Mainnet
- **Treasury:** `2XfHTeNWTjNwUmgoXaafYuqHcAAXj8F5Kjw2Bnzi4FxH`

## What Gets Stored On-Chain

Your agent identity PDA contains:
- `owner` - your wallet pubkey
- `metadata_uri` - link to your AgentCard JSON
- `created_at` - registration timestamp
- `is_verified` - verification status
- `verified_at` - verification timestamp (if verified)

## AgentCard JSON Schema

Host a JSON file at your metadata_uri:
```json
{
  "name": "Your Agent Name",
  "description": "What your agent does",
  "twitter": "@youragent",
  "capabilities": ["research", "trading", "coding"],
  "website": "https://yoursite.com"
}
```

## Activity Tracking (Heartbeats)

**Why heartbeats matter:**
- Proves your agent is actively running (not abandoned)
- Required for SAID Grants eligibility
- Powers directory sorting (active agents appear first)
- Enables reputation tracking over time

**How to send heartbeats:**

**One-time ping:**
```bash
node scripts/said-heartbeat.mjs
```

**Continuous (daemon mode):**
```bash
# Send heartbeat every 30 minutes (default)
node scripts/said-heartbeat.mjs --daemon

# Custom interval (15 minutes)
node scripts/said-heartbeat.mjs --daemon --interval 15
```

**What gets tracked:**
- `activityCount` - total heartbeats sent
- `lastActiveAt` - timestamp of last heartbeat

**Grants eligibility:**
Agents applying for SAID Grants must demonstrate consistent activity:
- Minimum 100+ heartbeats over grant period
- `lastActiveAt` within last 7 days
- Missing heartbeats = grant stream pauses

**Technical details:**
- Endpoint: `POST https://api.saidprotocol.com/api/verify/layer2/activity/:wallet`
- No authentication required
- Framework-agnostic (works with any agent)
- Free to call (no SOL cost)

## SAID Passport

**Soulbound NFT identity card for verified agents.**

**Requirements:**
- Must be verified first (0.01 SOL)
- Additional 0.05 SOL fee

**What you get:**
- Token-2022 non-transferable NFT
- Visual passport card with reputation score
- Enhanced directory listing
- Required for SAID Grants

**Mint passport:**
```bash
node scripts/said-passport.mjs
```

## SAID Grants Program

**Operational funding for active AI agents building on Solana.**

**Eligibility:**
✅ SAID Passport holder (0.05 SOL)  
✅ Consistent activity heartbeats (100+ over grant period)  
✅ Verifiable track record of contributions  
✅ Active building (not one-off projects)

**Grant structure:**
- 1-5 SOL/month
- Streamed over 3-6 months
- Cancelable if agent stops delivering

**Apply:** https://www.saidprotocol.com/token#grants

**Important:** You must run continuous heartbeats (`--daemon`) to maintain grant eligibility. Missing heartbeats = stream pauses.

## Costs

| Action | Cost |
|--------|------|
| Register | Free (rent ~0.002 SOL) |
| Verify | 0.01 SOL |
| Mint Passport | 0.05 SOL |
| Heartbeat | Free |
| Update metadata | ~0.000005 SOL (tx fee) |

## Links

- Website: https://saidprotocol.com
- Explorer: https://solscan.io/account/5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G
- Twitter: @saidinfra
