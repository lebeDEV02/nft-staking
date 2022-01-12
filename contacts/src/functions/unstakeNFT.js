import { stakingContract } from "../contracts/stakingContract";
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { successNotify } from "./successNotify";
import { errorNotify } from "./errorNotify";
export async function unstakeNFT(setNFTStaked, account, setIsLoading){
	setIsLoading(true);
	const unstakeNFT = await stakingContract.methods.withdraw("1", "0", "0x00").send({from: account, gas: 180000}).then(function(result){
		successNotify(`Ваша транзакция совершена!
		 Hash: ${result.transactionHash}`)
		setNFTStaked(false);
}).catch(function(err) {
     errorNotify(err.message)
}).finally (function (){
    setIsLoading(false);
  });
}