import { stakingContract } from "../contracts/stakingContract";


export async function getCurrentReward(setRewardForStaking, account, rewardForStaking){
	let previousReward = rewardForStaking;
	const currentReward = await stakingContract.methods.earned(account).call();
	setRewardForStaking(currentReward);
	console.log(currentReward - previousReward);
	previousReward = 0;
}