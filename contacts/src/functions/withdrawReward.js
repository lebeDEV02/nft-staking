import { stakingContract } from "../contracts/stakingContract";


export async function withdrawReward(setRewardForStaking, account, setIsWithdrawing){
	setIsWithdrawing(true);
	const currentReward = await stakingContract.methods.getReward().send({from: account, gas: 180000}).then (function (result) {
  }).finally (function (){
    setIsWithdrawing(false);
  });
	setRewardForStaking(0);
}