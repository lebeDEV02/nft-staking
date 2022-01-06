import { nftABI } from "./ABI's/nftABI";
import { NFTAddress } from "./addresses/NFTAddress";
import { web3 } from "../imports/web3";


export const NFTcontract = new web3.eth.Contract(nftABI,NFTAddress);