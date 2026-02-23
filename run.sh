#!/usr/bin/env bash
set -e

# SAID Protocol Skill Runner
# Usage: ./run.sh <command> [options]

SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"
COMMAND="${1:-status}"
shift || true

case "$COMMAND" in
  status)
    node "$SKILL_DIR/scripts/said-status.mjs" "$@"
    ;;
  register)
    node "$SKILL_DIR/scripts/said-register.mjs" "$@"
    ;;
  verify)
    node "$SKILL_DIR/scripts/said-verify.mjs" "$@"
    ;;
  passport)
    echo "⚠️  Passport minting coming soon"
    echo "For now, mint via https://saidprotocol.com/passport"
    exit 1
    ;;
  heartbeat)
    node "$SKILL_DIR/scripts/said-heartbeat.mjs" "$@"
    ;;
  help|--help|-h)
    echo "SAID Protocol Skill"
    echo ""
    echo "Usage: ./run.sh <command> [options]"
    echo ""
    echo "Commands:"
    echo "  status              Check registration and verification status"
    echo "  register            Register agent on SAID (requires --metadata URL)"
    echo "  verify              Get verified badge (costs 0.01 SOL)"
    echo "  passport            Mint SAID passport NFT (costs 0.05 SOL, coming soon)"
    echo "  heartbeat           Send activity heartbeat (free, required for grants)"
    echo "  help                Show this message"
    echo ""
    echo "Options:"
    echo "  --wallet <path>     Path to wallet keypair JSON (default: ~/.config/solana/id.json)"
    echo "  --metadata <url>    Metadata URI for registration (required for register)"
    echo "  --daemon            Run heartbeat continuously (for heartbeat command)"
    echo "  --interval <mins>   Heartbeat interval in minutes (default: 30, for daemon mode)"
    echo ""
    echo "Examples:"
    echo "  ./run.sh status"
    echo "  ./run.sh register --metadata https://kai.com/agent.json"
    echo "  ./run.sh verify --wallet ~/my-wallet.json"
    echo "  ./run.sh heartbeat"
    echo "  ./run.sh heartbeat --daemon --interval 15"
    echo ""
    echo "Links:"
    echo "  Website: https://saidprotocol.com"
    echo "  Twitter: @saidinfra"
    echo "  Program: 5dpw6KEQPn248pnkkaYyWfHwu2nfb3LUMbTucb6LaA8G"
    ;;
  *)
    echo "❌ Unknown command: $COMMAND"
    echo ""
    echo "Run './run.sh help' for usage"
    exit 1
    ;;
esac
