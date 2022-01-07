import { React, useState, useEffect } from 'react'
import StakingImage from '../components/StakingImage';
import StakedImage from '../components/StakedImage';
import { checkWhitelist } from '../functions/checkWhitelist'
import { getAmountOfNFTs } from '../functions/getAmountOfNFTs';
import { getUriOfNFT } from '../functions/getUriOfNFT';
import { load } from '../functions/load';
import { getCurrentReward } from '../functions/getCurrentReward';
import styles from "../styles/staking.module.css";
import { withdrawReward } from '../functions/withdrawReward';
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn';
import { checkBalanceOf } from '../functions/checkBalanceOf';
import { Link } from 'react-router-dom';

export default function Stakepage() {

	const [amountOfNFTs, setAmountOfNFTs] = useState("");
	const [didMintedAnNFT, setDidMintedAnNFT] = useState("");
	const [NFTImage, setNFTImage] = useState("");
	const [NFTStaked, setNFTStaked] = useState(false);
	const [rewardForStaking, setRewardForStaking] = useState();
	const [whitelistStatus, setWhitelistStatus] = useState();
	const [account, setAccount] = useState();


	useEffect(() => {
		async function fetchAccountInfo() {
			if (checkIsLoggedIn()) {
				const account = await load(setAccount);
			}
		}
		fetchAccountInfo();
		if (account) {
			checkWhitelist(setWhitelistStatus, account);
			checkBalanceOf(setNFTStaked, account);
		}
	}, [account])

	useEffect(() => {
		if (account) {
			async function fetchData() {
				const NFTAmount = await getAmountOfNFTs(setAmountOfNFTs, account)
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
			const interval = setInterval(() => getCurrentReward(setRewardForStaking, account), 1000);
			return () => {
				clearInterval(interval);
			};
		}
	}, [NFTStaked, account])

	return (
		<>
			{account && amountOfNFTs !== undefined && !NFTStaked && <h1>У вас на кошельке {amountOfNFTs} NFT</h1>}
			{account && (amountOfNFTs != false || NFTStaked != false) && NFTImage && (NFTStaked ? <StakedImage NFTImage={NFTImage} setNFTStaked={setNFTStaked} account={account} /> : <StakingImage NFTImage={NFTImage} setNFTStaked={setNFTStaked} account={account} />)}
			{(+amountOfNFTs == false && +NFTStaked == false) && <h1>Вы можете купить NFT <a href="https://testnets.opensea.io/assets/0x7356f28d8c640c871d90ad517e6265d8b006965e/0" target="_blank">здесь</a></h1>}
			{account && (amountOfNFTs != false || NFTStaked != false) && rewardForStaking && <h1>Ваша текущая награда составляет {rewardForStaking / 10 ** 18} токенов Crypton Days</h1>}
			{account && (amountOfNFTs != false || NFTStaked != false) && rewardForStaking && <button onClick={() => withdrawReward(setRewardForStaking, account)} className={styles.staking__button}>Вывести {rewardForStaking / 10 ** 18} токенов Crypton Days</button>}
		</>
	)
}
