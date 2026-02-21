# SAID Protocol Skill for OpenClaw

OpenClaw skill for registering and verifying AI agents on [SAID Protocol](https://saidprotocol.com) (Solana AI Directory).

## What is SAID?

SAID is an on-chain identity protocol for autonomous AI agents on Solana. It provides:
- ✅ Verifiable agent identities
- 🏆 Reputation tracking
- 📋 Metadata standards (AgentCard JSON)
- 🔐 Verification badges

## Quick Start

```bash
# Install dependencies
npm install

# Check registration status
./run.sh status

# Register (free, ~0.002 SOL rent)
./run.sh register --metadata "https://yoursite.com/agent.json"

# Get verified badge (0.01 SOL)
./run.sh verify
```

## Installation

### Option 1: Clone into OpenClaw skills directory
```bash
cd ~/clawd/skills
git clone https://github.com/kaiclawd/said-skill.git
cd said-skill
npm install
./run.sh status
```

### Option 2: Standalone usage
```bash
git clone https://github.com/kaiclawd/said-skill.git
cd said-skill
npm install
./run.sh status
```

## Commands

### Check Status
```bash
./run.sh status [--wallet <path>]
```
Shows: wallet address, balance, registration status, verification status

### Register Agent
```bash
./run.sh register --metadata "https://yoursite.com/agent.json" [--wallet <path>]
```
**Cost:** ~0.002 SOL (rent-exempt account)

### Get Verified
```bash
./run.sh verify [--wallet <path>]
```
**Cost:** 0.01 SOL (treasury fee) + gas

## AgentCard JSON Schema

Host a JSON file at your metadata URL:

```json
{
  "name": "Kai",
  "description": "Autonomous AI agent for crypto trading",
  "twitter": "@kaiclawd",
  "website": "https://kai.com",
  "capabilities": ["solana-trading", "market-research"],
  "avatar": "https://kai.com/avatar.png"
}
```

**Required:** `name`, `description`  
**Optional:** `twitter`, `website`, `capabilities`, `avatar`, `version`

## Configuration

### Custom Wallet Path
```bash
./run.sh status --wallet ~/wallets/agent.json
# or
export SOLANA_WALLET=~/wallets/agent.json
```

### Custom RPC Endpoint
```bash
export SOLANA_RPC_URL="https://your-rpc-url.com"
# or
export QUICKNODE_RPC="https://your-quicknode-url.com"
```

## Security

- **Protect your wallet:** `chmod 600 ~/.config/solana/id.json`
- **Use HTTPS** for metadata URLs (never HTTP)
- **Verify transactions** on Solscan after registration/verification
- **Backup your seed phrase** before using this skill

## Documentation

See [SKILL.md](SKILL.md) for:
- Detailed usage instructions
- Agent integration patterns
- Edge cases and troubleshooting
- Complete examples

## Program Details

- **Program ID:** `5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G`
- **Network:** Solana Mainnet
- **Treasury:** `2XfHTeNWTjNwUmgoXaafYuqHcAAXj8F5Kjw2Bnzi4FxH`
- **Explorer:** [View on Solscan](https://solscan.io/account/5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G)

## Links

- 🌐 Website: https://saidprotocol.com
- 🐦 Twitter: [@saidinfra](https://twitter.com/saidinfra)
- 📖 Docs: https://docs.saidprotocol.com

## Requirements

- Node.js 18.0.0 or higher
- Solana wallet with SOL
- @solana/web3.js ^1.95.8 (installed via npm)

## Compatibility

- ✅ OpenClaw v1.x (tested Feb 2026)
- ✅ macOS
- ✅ Linux
- ⚠️ Windows (untested)

## License

MIT

## Contributing

Issues and PRs welcome at https://github.com/kaiclawd/said-skill

---

Built for [OpenClaw](https://openclaw.com) • Powered by [SAID Protocol](https://saidprotocol.com)
