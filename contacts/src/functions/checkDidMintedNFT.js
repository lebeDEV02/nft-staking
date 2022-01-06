import { NFTcontract } from "../contracts/NFTContract";


export async function checkDidMintedAnNFT(setDidMintedAnNFT, account){
	const didMinted = await NFTcontract.methods.didMintedAnNFT(account).call();
	setDidMintedAnNFT(didMinted);
}