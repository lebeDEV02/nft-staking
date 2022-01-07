import { stakingContract } from "../contracts/stakingContract";


export async function withdrawReward(setRewardForStaking, account){
	const currentReward = await stakingContract.methods.getReward().send({from: account, gas: 180000});
	setRewardForStaking(0);
}