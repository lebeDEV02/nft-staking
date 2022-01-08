import React from 'react'
import styles from "../styles/staking.module.css";
import { stakeNFT } from '../functions/stakeNFT';
import { setApproveForStaking } from '../functions/setApproveForStaking';
import StakingButton from './StakingButton';
import { generalVariant } from '../variants/generalVariant';
import { motion, AnimatePresence } from "framer-motion"
export default function StakingImage({ setNFTStaked, account, setApproval, approval, setIsLoading, isLoading }) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={generalVariant}
			exit="exit"
			className={styles.staking}>
			{approval ?
				<StakingButton callback={stakeNFT} setIsLoading={setIsLoading} textButton={"Застейкать этот NFT"} className={styles.staking__button} hook={setNFTStaked} account={account} isLoading={isLoading} />
				:
				<StakingButton callback={setApproveForStaking} setIsLoading={setIsLoading} textButton={"Заапрувить NFT"} className={styles.staking__button_approve} hook={setApproval} account={account} isLoading={isLoading} />}
		</motion.div>
	)
}
