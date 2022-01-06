import { NFTcontract } from "../contracts/NFTContract";


export async function getAmountOfNFTs(setAmountOfNFTs, account){
	const amountOfNFTs = await NFTcontract.methods.balanceOf(account, "0").call();
	setAmountOfNFTs(amountOfNFTs);
}