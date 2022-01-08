import { NFTcontract } from "../contracts/NFTContract";


export async function checkDidMintedAnNFT(setDidMintedAnNFT, account){
	try {
		const didMinted = await NFTcontract.methods.didMintedAnNFT(account).call()
		setDidMintedAnNFT(Boolean(didMinted));
	} catch (error) {
		setDidMintedAnNFT(false);
	}
}