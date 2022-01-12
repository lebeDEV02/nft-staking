import { NFTcontract } from "../contracts/NFTContract";
import { stakingAddress } from "../contracts/addresses/stakingAddress";
import { successNotify } from "./successNotify";
export async function setApproveForStaking(setApproveForStaking, account, setIsLoading){
	setIsLoading(true);
	const approve = await NFTcontract.methods.setApprovalForAll(stakingAddress, true).send({from: account, gas: 180000}).then (function (result) {
		successNotify("Апрув прошёл успешно!")
	setApproveForStaking(true);
  }).finally (function (){
    setIsLoading(false);
  });
}