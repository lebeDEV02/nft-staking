import React from 'react'
import styles from "../styles/staking.module.css";
import { stakeNFT } from '../functions/stakeNFT';

export default function StakingImage({ NFTImage, setNFTStaked, account }) {
	return (
		<div className={styles.staking}>

			<img className={styles.staking__image} src={NFTImage}></img>

			<button onClick={() => stakeNFT(setNFTStaked, account)} className={styles.staking__button}>Застейкать этот NFT</button>

		</div>
	)
}
