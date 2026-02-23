# SAID Skill - Quick Fix Guide

**Full audit:** `/Users/callum/clawd/memory/said-skill-audit-2026-02-20.md`

## 🔴 Critical Issues Found (3)

1. **No package.json** → Scripts will fail on clean installs
2. **No run.sh** → Can't be invoked using OpenClaw standard pattern
3. **Incomplete SKILL.md** → Agents can't determine when/how to use this

## ⚡ Quick Fix (15 minutes)

Run these commands to fix critical issues:

```bash
cd /Users/callum/clawd/said-skill

# 1. Create package.json
cat > package.json << 'EOF'
{
  "name": "@kaiclawd/said-skill",
  "version": "1.0.0",
  "description": "OpenClaw skill for SAID Protocol (Solana AI agent identity)",
  "type": "module",
  "main": "scripts/said-status.mjs",
  "scripts": {
    "status": "node scripts/said-status.mjs",
    "register": "node scripts/said-register.mjs",
    "verify": "node scripts/said-verify.mjs"
  },
  "dependencies": {
    "@solana/web3.js": "^1.95.8"
  },
  "bin": {
    "said-status": "./scripts/said-status.mjs",
    "said-register": "./scripts/said-register.mjs",
    "said-verify": "./scripts/said-verify.mjs"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/kaiclawd/said-skill.git"
  },
  "keywords": ["openclaw", "skill", "solana", "said", "ai-agent", "identity"],
  "author": "kaiclawd",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# 2. Install dependencies
npm install

# 3. Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
*.log
.DS_Store
.env
*.json.bak
package-lock.json
EOF

# 4. Test that it still works
node scripts/said-status.mjs

# 5. Commit fixes
git add package.json .gitignore
git commit -m "Add package.json and gitignore (audit fix)"
```

## Next: Create run.sh

See full audit for complete run.sh code. Ready-to-use version below:

```bash
cat > run.sh << 'RUNSH'
#!/usr/bin/env bash
set -e

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
  help|--help|-h)
    echo "SAID Protocol Skill"
    echo ""
    echo "Usage: ./run.sh <command> [options]"
    echo ""
    echo "Commands:"
    echo "  status              Check registration and verification status"
    echo "  register            Register agent on SAID (requires --metadata URL)"
    echo "  verify              Get verified badge (costs 0.01 SOL)"
    echo "  help                Show this message"
    echo ""
    echo "Options:"
    echo "  --wallet <path>     Path to wallet keypair JSON"
    echo "  --metadata <url>    Metadata URI for registration"
    echo ""
    echo "Examples:"
    echo "  ./run.sh status"
    echo "  ./run.sh register --metadata https://kai.com/agent.json"
    echo "  ./run.sh verify --wallet ~/my-wallet.json"
    ;;
  *)
    echo "Unknown command: $COMMAND"
    echo "Run './run.sh help' for usage"
    exit 1
    ;;
esac
RUNSH

chmod +x run.sh
./run.sh help
```

## Then: Update SKILL.md

Add this frontmatter to SKILL.md (replace existing):

```yaml
---
name: said
description: |
  Register and verify your AI agent on SAID Protocol (Solana AI agent identity).
  
  USE WHEN:
  - Setting up on-chain identity for the first time
  - Checking if agent is registered/verified on SAID
  - Getting verified badge (costs 0.01 SOL)
  - User asks "am I on SAID?" or "register on SAID"
  
  DON'T USE WHEN:
  - Just checking Solana wallet balance (use wallet tool)
  - Looking up OTHER agents (this is for YOUR identity only)
  - Deploying smart contracts (different workflow)
  
  OUTPUTS:
  - Console output with status/transaction results
  - Solscan explorer links for verification
---
```

## Final Test

```bash
# Test the new entry point
./run.sh status

# Should work identically to:
node scripts/said-status.mjs
```

## High Priority (next session)

- Add error handling (try/catch around RPC calls)
- Make RPC URL configurable (`SOLANA_RPC_URL` env var)
- Add README.md for GitHub

**Full details in:** `/Users/callum/clawd/memory/said-skill-audit-2026-02-20.md`
