import { nftStakingABI } from "./ABI's/nftStakingABI";
import { stakingAddress } from "./addresses/stakingAddress";
import { web3 } from "../imports/web3";


export const stakingContract = new web3.eth.Contract(nftStakingABI,stakingAddress);