
const { ethers } = require("ethers");
require("dotenv").config();

const RPC = process.env.RPC_URL;
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const provider = new ethers.JsonRpcProvider(RPC);

const FLUSH_REWARDER = "0x7C9a7130379F1B5dd6e7A53AF84fC0fE32267B65";
const ABI = [
  "function flushEntryQueue() external",
  "function claimRewards() external",
  "function rewardsOf(address) view returns (uint256)",
  "function rewardsAvailable() view returns (uint256)"
];

const flusherContract = new ethers.Contract(FLUSH_REWARDER, ABI, wallet.connect(provider));

async function flush() {
  try {
    const rewardsLeft = await flusherContract.rewardsAvailable();
    console.log("Rewards in pool:", ethers.formatUnits(rewardsLeft, 18));

    if (rewardsLeft > 0n) {
      const tx = await flusherContract.flushEntryQueue({ gasLimit: 250000 });
      console.log("Flush TX:", tx.hash);
      await tx.wait();
      console.log("Flush confirmed!");
    } else {
      console.log("Reward pool empty, skipping flush");
    }
  } catch (err) {
    console.log("Error flushing:", err.message);
  }
}

flush();

