
import React from 'react'
import { unstakeNFT } from '../functions/unstakeNFT';
import styles from "../styles/staking.module.css";
import { motion, AnimatePresence } from "framer-motion"
import StakingButton from './StakingButton';
import { generalVariant } from '../variants/generalVariant';
export default function StakedImage({ setNFTStaked, account, setIsLoading, isLoading }) {
	return (
		<>
			<StakingButton callback={unstakeNFT} setIsLoading={setIsLoading} textButton={"Анстейкнуть этот NFT"} className={styles.staking__button} hook={setNFTStaked} account={account} isLoading={isLoading} />
		</>
	)
}
