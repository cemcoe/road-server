import { alchemy } from "../alchemy/index.js";
import { SBTaddresses } from "../alchemy/SBTaddresses.js";

const ownerAddr = "0x2cEE06a96eB2f6fFEc80ad27Df274E0D196BFAB2";

async function getSBTlist(ctx) {
  // Print total NFT count returned in the response:
  const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddr, {
    contractAddresses: SBTaddresses,
  });

  ctx.body = {
    status: 200,
    data: {
      ownedNfts: nftsForOwner.ownedNfts,
    },
  };
}

export { getSBTlist };

// // Print contract address and tokenId for each NFT:
// for (const nft of nftsForOwner.ownedNfts) {
//   console.log("===");
//   console.log("contract address:", nft.contract.address);
//   console.log("token ID:", nft.tokenId);
// }
// console.log("===");

// // Fetch metadata for a particular NFT:
// console.log("fetching metadata for a Crypto Coven NFT...");
// const response = await alchemy.nft.getNftMetadata(
//   "0x10d5e4da056ae64d0ed702698b6d8544a050b4eb",
//   "9141"
// );

// // Uncomment this line to see the full api response:
// console.log(response);

// // Print some commonly used fields:
// console.log("NFT name: ", response.title);
// console.log("token type: ", response.tokenType);
// console.log("tokenUri: ", response.tokenUri.gateway);
// console.log("image url: ", response.rawMetadata.image);
// console.log("time last updated: ", response.timeLastUpdated);
// console.log("===");
