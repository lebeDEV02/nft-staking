import { stakeNFTcontract } from "../contracts/stakingContract";


export async function withdrawReward(setRewardForStaking, account){
	const currentReward = await stakeNFTcontract.methods.getReward().send({from: account, gas: 180000});
	setRewardForStaking(0);
}