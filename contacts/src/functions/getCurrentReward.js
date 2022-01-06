import { stakeNFTcontract } from "../contracts/stakingContract";


export async function getCurrentReward(setRewardForStaking, account){
	const currentReward = await stakeNFTcontract.methods.earned(account).call();
	setRewardForStaking(currentReward);
}