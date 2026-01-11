# Aztec Flush Bot

A simple Node.js bot for flushing the Aztec reward queue using Ethers.js.
This bot checks available rewards and automatically sends a flushEntryQueue() transaction when rewards are present.

## ⚡ Designed for speed, simplicity, and reliability.

**✨ Features**

- Reads reward pool from Aztec contract

- Automatically flushes when rewards exist

- Uses Ethers v6

- Simple .env configuration

- Works on any Ethereum RPC

- Easy to extend with loops, MEV, or gas logic

## 📦 Requirements

-Node.js v18+

NPM

Ethereum wallet with ETH for gas

RPC provider (Alchemy, Infura, QuickNode, etc.)

## 📥 Installation
git clone [https://github.com/jaytechent/aztecflush-bot.git](https://github.com/Jaytechent/Aztecflush-bot)

`cd aztecflushbot`

`npm install`

## 🔐 Environment Setup

**Create a .env file in the project root:**

`RPC_URL=https://your-rpc-url`


`PRIVATE_KEY=0xyourprivatekey`


- ⚠️ Never share your private key.

- ⚠️ Never commit .env to GitHub.

## ▶️ Run the Bot
`node server.js`

## 🧠 What It Does

**Reads reward pool from Aztec contract**

- If rewards > 0 → sends flush transaction

- Waits for confirmation

- Logs transaction hash and status

**Example output:**

Rewards in pool: 846200.0
Flush TX: 0xe4f09245...
Flush confirmed!



⚠️ Disclaimer

This bot interacts with on-chain smart contracts.
Use at your own risk. Always test with small funds first.

🔧 Future Improvements

Auto loop per block

Gas escalation strategy

Epoch detection

Flashbots MEV mode



🧑‍💻 Author

Built for Aztec flushing automation using Ethers.js by HallenjayArt
