import { NFTcontract } from "../contracts/NFTContract";

export function mintNFT(account){
	NFTcontract.methods.mint().send({from: account, gas: 180000}).then((result) => {
	  alert("You have minted an NFT! Contrats!")
	  localStorage.setItem("didMintedAnNFT", true);
	}).catch((err) => {
	  alert(`Minting failed: ${err}`)
	});
}