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
import { motion } from "framer-motion"
import { setApproveForStaking } from '../functions/setApproveForStaking';
import { checkIsApprovedForAll } from '../functions/checkIsApprovedForAll';

export default function Stakepage() {

	const [amountOfNFTs, setAmountOfNFTs] = useState();
	const [didMintedAnNFT, setDidMintedAnNFT] = useState();
	const [NFTImage, setNFTImage] = useState();
	const [NFTStaked, setNFTStaked] = useState(false);
	const [rewardForStaking, setRewardForStaking] = useState();
	const [whitelistStatus, setWhitelistStatus] = useState();
	const [approval, setApproval] = useState(false);
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
			checkIsApprovedForAll(setApproval, account);
			console.log(approval)
		}
	}, [account])
	useEffect(() => {
		console.log("reward has changed!")
	}, [rewardForStaking])
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
	const list = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}
	return (
		<>

			{account && amountOfNFTs !== undefined && !NFTStaked && <motion.h1
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}>У вас на кошельке {amountOfNFTs} NFT</motion.h1>}
			{account && (amountOfNFTs != false || NFTStaked != false) && NFTImage && (NFTStaked ? <StakedImage NFTImage={NFTImage} setNFTStaked={setNFTStaked} account={account} /> : <StakingImage setNFTStaked={setNFTStaked} NFTImage={NFTImage} account={account} setApproval={setApproval} approval={approval} />)}
			{(+amountOfNFTs == false && +NFTStaked == false) && <h1>Вы можете купить NFT <a href="https://testnets.opensea.io/assets/0x7356f28d8c640c871d90ad517e6265d8b006965e/0" target="_blank">здесь</a></h1>}
			{account && (amountOfNFTs != false || NFTStaked != false) && rewardForStaking && <motion.h1
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}>Ваша текущая награда составляет<motion.span> {rewardForStaking / 10 ** 18}</motion.span> токенов Crypton Days
			</motion.h1>}
			{
				account && (amountOfNFTs != false || NFTStaked != false) && rewardForStaking && <motion.button
					initial="hidden"
					animate="visible"
					variants={list}
					transition={{ duration: 0.6, type: 'spring' }} onClick={() => withdrawReward(setRewardForStaking, account)} className={styles.staking__button}>Вывести {rewardForStaking / 10 ** 18} токенов Crypton Days</motion.button>
			}
		</>
	)
}
