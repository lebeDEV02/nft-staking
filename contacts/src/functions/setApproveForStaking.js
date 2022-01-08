import { NFTcontract } from "../contracts/NFTContract";
import { stakingAddress } from "../contracts/addresses/stakingAddress";
export async function setApproveForStaking(setApproveForStaking, account, setIsLoading){
	setIsLoading(true);
	const approve = await NFTcontract.methods.setApprovalForAll(stakingAddress, true).send({from: account, gas: 180000}).then (function (result) {
  }).finally (function (){
    setIsLoading(false);
  });
	setApproveForStaking(true);
}