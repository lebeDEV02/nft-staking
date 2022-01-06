import { React, useState, useEffect } from 'react'
import StakingImage from '../components/StakingImage';
import StakedImage from '../components/StakedImage';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT'
import { checkWhitelist } from '../functions/checkWhitelist'
import { getAmountOfNFTs } from '../functions/getAmountOfNFTs';
import { getUriOfNFT } from '../functions/getUriOfNFT';
import { load } from '../functions/load';
import { getCurrentReward } from '../functions/getCurrentReward';
import { useDebouncedEffect } from '../hooks/useDebouncedEffect';
import styles from "../styles/staking.module.css";
import Button from '../components/Button';
import { withdrawReward } from '../functions/withdrawReward';

export default function Stakepage(account, setAccount) {
	const [amountOfNFTs, setAmountOfNFTs] = useState("");
	const [didMintedAnNFT, setDidMintedAnNFT] = useState("");
	const [NFTImage, setNFTImage] = useState("");
	const [NFTStaked, setNFTStaked] = useState(false);
	const [rewardForStaking, setRewardForStaking] = useState();

	useEffect(() => {
		async function fetchData() {
			const NFTAmount = await getAmountOfNFTs(setAmountOfNFTs, account.account)
		}
		fetchData()
		getUriOfNFT("0")
			.then(nft => fetch(nft))
			.then(async response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const json = await response.json();
				setNFTImage(json.image);
			})
		const interval = setInterval(() => getCurrentReward(setRewardForStaking, account.account), 1000);
		return () => {
			clearInterval(interval);
		};
	}, [NFTStaked])

	return (
		<>
			{amountOfNFTs !== undefined && !NFTStaked && <h1>У вас на кошельке {amountOfNFTs} NFT</h1>}
			{NFTImage && NFTStaked ? <StakedImage NFTImage={NFTImage} setNFTStaked={setNFTStaked} account={account} /> : <StakingImage NFTImage={NFTImage} setNFTStaked={setNFTStaked} account={account} />}
			{rewardForStaking && <h1>Ваша текущая награда составляет {rewardForStaking / 10 ** 18} токенов Crypton Days</h1>}
			{rewardForStaking && <button onClick={() => withdrawReward(setRewardForStaking, account.account)} className={styles.staking__button}>Вывести {rewardForStaking / 10 ** 18} токенов Crypton Days</button>}
		</>
	)
}
