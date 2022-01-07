import { stakingContract } from "../contracts/stakingContract";


export async function getCurrentReward(setRewardForStaking, account){
	const currentReward = await stakingContract.methods.earned(account).call();
	setRewardForStaking(currentReward);
}