import React from 'react'
import styles from "../styles/staking.module.css";
import { stakeNFT } from '../functions/stakeNFT';
import { setApproveForStaking } from '../functions/setApproveForStaking';
import StakingButton from './StakingButton';
export default function StakingImage({ NFTImage, setNFTStaked, account, setApproval, approval }) {
	return (
		<div className={styles.staking}>

			<img className={styles.staking__image} src={NFTImage}></img>
			{approval ?
				<StakingButton callback={stakeNFT} textButton={"Застейкать этот NFT"} className={styles.staking__button} hook={setNFTStaked} account={account} />
				:
				<StakingButton callback={setApproveForStaking} textButton={"Заапрувить NFT"} className={styles.staking__button_approve} hook={setApproval} account={account} />}
		</div>
	)
}
