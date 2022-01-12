import { stakingContract } from "../contracts/stakingContract";
import { successNotify } from "./successNotify";
import { errorNotify } from "./errorNotify";

export async function withdrawReward(setRewardForStaking, account, setIsWithdrawing){
	setIsWithdrawing(true);
	const currentReward = await stakingContract.methods.getReward().send({from: account, gas: 180000}).then (function (result) {
		console.log(result);
		successNotify(`Вы успешно вывели токены Crypton Days!`)
			setRewardForStaking(0);
  }).catch(function(err) {
     errorNotify(err.message)
}).finally (function (){
       setIsWithdrawing(false);
})
}