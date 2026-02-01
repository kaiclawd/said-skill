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

## Costs

| Action | Cost |
|--------|------|
| Register | Free (rent ~0.002 SOL) |
| Verify | 0.01 SOL |
| Update metadata | ~0.000005 SOL (tx fee) |

## Links

- Website: https://saidprotocol.com
- Explorer: https://solscan.io/account/5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G
- Twitter: @saidinfra
