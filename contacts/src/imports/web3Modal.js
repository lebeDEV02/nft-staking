import Web3Modal from "web3modal";
const providerOptions = {};
export const web3Modal = new Web3Modal({
		network: "mainnet",
		cacheProvider: true,
		providerOptions
});