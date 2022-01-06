import { NFTcontract } from "../contracts/NFTContract";


export async function checkWhitelist(setWhitelistStatus, account){
	const hasWhitelist = await NFTcontract.methods.verifyUser(account).call();
	setWhitelistStatus(hasWhitelist);
}