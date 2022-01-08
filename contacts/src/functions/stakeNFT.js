import { stakingContract } from "../contracts/stakingContract";
import { web3 } from "../imports/web3";
import { waitTransactionStatus } from "./waitTransactionStatus";
import { trackPromise} from 'react-promise-tracker';

export async function stakeNFT(setNFTStaked, account, setIsLoading){
	setIsLoading(true);
	const stakeNFT = await stakingContract.methods.stake("1", "0", "0x00").send({from: account, gas: 180000}).then (function (result) {
  }).finally (function (error){
    setIsLoading(false);
  });
	setNFTStaked(true);
}