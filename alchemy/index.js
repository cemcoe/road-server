// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";
import { SBTaddresses } from "./SBTaddresses.js";

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "94SDcrXwlfBVAApHgOkc1yABrzkQxcKi", // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export { alchemy };
