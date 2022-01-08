
import React from 'react'
import { unstakeNFT } from '../functions/unstakeNFT';
import styles from "../styles/staking.module.css";
import { motion } from "framer-motion"
import StakingButton from './StakingButton';
export default function StakedImage({ NFTImage, setNFTStaked, account, setIsLoading }) {
	const list = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}
	return (
		<div>
			<div className={styles.staking}>

				<motion.img initial="hidden"
					animate="visible"
					variants={list}
					transition={{ duration: 0.5, type: 'spring' }} className={styles.staking__image_staked} src={NFTImage}></motion.img>

				<StakingButton callback={unstakeNFT} setIsLoading={setIsLoading} textButton={"Анстейкнуть этот NFT"} className={styles.staking__button_staked} hook={setNFTStaked} account={account} />
			</div >
		</div >
	)
}
