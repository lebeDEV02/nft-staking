import { NFTcontract } from "../contracts/NFTContract"

export async function getUriOfNFT(URI){
	const nft = await NFTcontract.methods.uri(URI).call();
	return nft;
}