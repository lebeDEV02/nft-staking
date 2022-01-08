import React from 'react'
import styles from "../styles/staking.module.css";
import { stakeNFT } from '../functions/stakeNFT';
import { setApproveForStaking } from '../functions/setApproveForStaking';
import StakingButton from './StakingButton';
import { generalVariant } from '../variants/generalVariant';
import { motion } from "framer-motion"
export default function StakingImage({ NFTImage, setNFTStaked, account, setApproval, approval, setIsLoading }) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={generalVariant}
			className={styles.staking}>
			<motion.img
				initial="hidden"
				animate="visible"
				variants={generalVariant}
				className={styles.staking__image} src={NFTImage}></motion.img>
			{approval ?
				<StakingButton callback={stakeNFT} setIsLoading={setIsLoading} textButton={"Застейкать этот NFT"} className={styles.staking__button} hook={setNFTStaked} account={account} />
				:
				<StakingButton callback={setApproveForStaking} setIsLoading={setIsLoading} textButton={"Заапрувить NFT"} className={styles.staking__button_approve} hook={setApproval} account={account} />}
		</motion.div>
	)
}
