
import React from 'react'
import { unstakeNFT } from '../functions/unstakeNFT';
import styles from "../styles/staking.module.css";


export default function StakedImage({ NFTImage, setNFTStaked, account }) {
	return (
		<div>
			<div className={styles.staking}>

				<img className={styles.staking__image_staked} src={NFTImage}></img>

				<button onClick={() => unstakeNFT(setNFTStaked, account)} className={styles.staking__button_staked}>Анстейкнуть этот NFT</button>

			</div >
		</div >
	)
}
