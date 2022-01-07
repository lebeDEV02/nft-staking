import { NFTcontract } from "../contracts/NFTContract";
import { stakingAddress } from "../contracts/addresses/stakingAddress";

export async function checkIsApprovedForAll(setApproval, account){
	const approve = await NFTcontract.methods.isApprovedForAll(account, stakingAddress).call({from:account});
	console.log(`approve is ${approve}`);
	setApproval(Boolean(approve));
}