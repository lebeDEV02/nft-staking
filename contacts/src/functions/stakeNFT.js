import { stakeNFTcontract } from "../contracts/stakingContract";


export async function stakeNFT(setNFTStaked, account){
	const stakeNFT = await stakeNFTcontract.methods.stake("1", "0", "0x00").send({from: account, gas: 180000});
	setNFTStaked(true);
}