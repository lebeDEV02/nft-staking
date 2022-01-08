import { NFTcontract } from "../contracts/NFTContract";

export function mintNFT(account, setDidMintedAnNFT, setIsMinting){
	setIsMinting(true)
	NFTcontract.methods.mint().send({from: account, gas: 180000}).then((result) => {
	  alert("You have minted an NFT! Contrats!")
	  setDidMintedAnNFT(true);
	}).catch((err) => {
	  alert(`Minting failed: ${err}`)
	}).finally(() => {
		setIsMinting(false);
	})
}