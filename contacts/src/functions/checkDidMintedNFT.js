import { NFTcontract } from "../contracts/NFTContract";


export async function checkDidMintedAnNFT(setDidMintedAnNFT, account){
	console.log(account);
	const didMinted = await NFTcontract.methods.didMintedAnNFT(account).call();
	setDidMintedAnNFT(didMinted);
}