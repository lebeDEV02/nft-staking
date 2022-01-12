import { NFTcontract } from "../contracts/NFTContract";
import { successNotify } from "./successNotify";
import { errorNotify } from "./errorNotify";
export function mintNFT(account, setDidMintedAnNFT, setIsMinting){
	setIsMinting(true)
	NFTcontract.methods.mint().send({from: account, gas: 180000}).then((result) => {
	  successNotify(`Вы успешно заминтили NFT! Теперь Вы можете его застейкать.`)
	  setDidMintedAnNFT(true);
	}).catch(function(err) {
     errorNotify(err.message)
}).finally(() => {
		setIsMinting(false);
	})
}