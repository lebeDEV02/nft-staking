import {stakingContract} from "../contracts/stakingContract";


export async function checkBalanceOf(setNFTStaked, account){
	const amountOfNFTs = await stakingContract.methods.balanceOf(account).call();
	if(amountOfNFTs != false){
		setNFTStaked(true);
	} else{
		setNFTStaked(false);
	}
}