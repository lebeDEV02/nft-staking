
import React from 'react'
import { unstakeNFT } from '../functions/unstakeNFT';
import styles from "../styles/staking.module.css";
import { motion, AnimatePresence } from "framer-motion"
import StakingButton from './StakingButton';
import { generalVariant } from '../variants/generalVariant';
export default function StakedImage({ setNFTStaked, account, setIsLoading, isLoading }) {
	const list = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}
	return (
		<div>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				variants={generalVariant} className={styles.staking}>

				<StakingButton callback={unstakeNFT} setIsLoading={setIsLoading} textButton={"Анстейкнуть этот NFT"} className={styles.staking__button_staked} hook={setNFTStaked} account={account} isLoading={isLoading} />
			</motion.div >
		</div >
	)
}
