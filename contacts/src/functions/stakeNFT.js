import { stakingContract } from "../contracts/stakingContract";
import { web3 } from "../imports/web3";
import { waitTransactionStatus } from "./waitTransactionStatus";
import { trackPromise} from 'react-promise-tracker';
import Alert from '@mui/material/Alert';
import { successNotify } from "./successNotify";
import { errorNotify } from "./errorNotify";

export async function stakeNFT(setNFTStaked, account, setIsLoading, notify){
	setIsLoading(true);
	const stakeNFT = await stakingContract.methods.stake("1", "0", "0x00").send({from: account, gas: 180000}).then (function (result) {
		successNotify(`Ваша транзакция совершена!
		 Hash: ${result.transactionHash}`)
			setNFTStaked(true);
  }).catch(function(err) {
     errorNotify(err.message)
}).finally (function (){
    setIsLoading(false);
  });
}