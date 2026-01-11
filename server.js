// const { ethers } = require("ethers");
// const { FlashbotsBundleProvider } = require("@flashbots/ethers-provider-bundle");
// require("dotenv").config();

// const RPC = process.env.RPC_URL;
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
// const fbSigner = new ethers.Wallet(process.env.FLASHBOTS_KEY);

// const provider = new ethers.JsonRpcProvider(RPC);

// const FLUSH_REWARDER = "0x7C9a7130379F1B5dd6e7A53AF84fC0fE32267B65";
// const ABI = [
//   "function flushEntryQueue() external",
//   "function rewardsAvailable() view returns (uint256)"
// ];

// const flusherContract = new ethers.Contract(
//   FLUSH_REWARDER,
//   ABI,
//   wallet.connect(provider)
// );

// async function flushMEVLoop() {
//   const flashbots = await FlashbotsBundleProvider.create(provider, fbSigner);

//   while (true) {
//     try {
//       const rewardsLeft = await flusherContract.rewardsAvailable();
//       console.log("Rewards in pool:", ethers.formatUnits(rewardsLeft, 18));

//       if (rewardsLeft == 0n) {
//         console.log("Reward pool empty, sleeping...");
//         await new Promise(r => setTimeout(r, 15000));
//         continue;
//       }

//       const block = await provider.getBlockNumber();

//       const tx = await flusherContract
//         .getFunction("flushEntryQueue")
//         .populateTransaction();

//       const bundle = [{
//         signer: wallet,
//         transaction: {
//           ...tx,
//           chainId: 1,
//           gasLimit: 250000,
//           maxFeePerGas: ethers.parseUnits("50","gwei"),
//           maxPriorityFeePerGas: ethers.parseUnits("3","gwei")
//         }
//       }];

//       console.log("🚀 Sending MEV bundle for block", block + 1);

//       const res = await flashbots.sendBundle(bundle, block + 1);
//       const result = await res.wait();

//       if (result === 0) {
//         console.log("✅ Flush mined via MEV");
//         break; // stop after success
//       } else {
//         console.log("❌ Bundle not mined, retrying next block...");
//       }

//     } catch (err) {
//       console.log("Error:", err.message);
//     }

//     await new Promise(r => setTimeout(r, 12000)); // wait for next block
//   }
// }

// flushMEVLoop();


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

