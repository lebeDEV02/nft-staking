import { stakingContract } from "../contracts/stakingContract";


export async function unstakeNFT(setNFTStaked, account){
	const stakeNFT = await stakingContract.methods.withdraw("1", "0", "0x00").send({from: account, gas: 180000});
	setNFTStaked(false);
}