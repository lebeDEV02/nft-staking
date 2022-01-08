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
import { AnimatePresence, motion } from "framer-motion"
import { setApproveForStaking } from '../functions/setApproveForStaking';
import { checkIsApprovedForAll } from '../functions/checkIsApprovedForAll';
import { generalVariant } from '../variants/generalVariant';
import { componentsVariant } from '../variants/componentsVariant';
import MoonLoader from "react-spinners/MoonLoader";
import { web3 } from '../imports/web3';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT';
import { Link } from 'react-router-dom';
export default function Stakepage() {

	const [amountOfNFTs, setAmountOfNFTs] = useState();
	const [NFTImage, setNFTImage] = useState();
	const [NFTStaked, setNFTStaked] = useState(false);
	const [rewardForStaking, setRewardForStaking] = useState();
	const [whitelistStatus, setWhitelistStatus] = useState();
	const [approval, setApproval] = useState(false);
	const [account, setAccount] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isWithdrawing, setIsWithdrawing] = useState(false);
	const [didMintedAnNFT, setDidMintedAnNFT] = useState();


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
			getCurrentReward(setRewardForStaking, account, rewardForStaking)
			checkDidMintedAnNFT(setDidMintedAnNFT, account);
		}
	}, [account])

	useEffect(() => {
		async function listenMMAccount() {
			window.ethereum.on("accountsChanged", async function () {
				const accounts = await web3.eth.requestAccounts();
				load(setAccount)
			});
		}
		listenMMAccount();
	}, [])


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
			if (NFTStaked) {
				const interval = setInterval(() => getCurrentReward(setRewardForStaking, account, rewardForStaking), 2000);
				return () => {
					clearInterval(interval);
				};
			}
			// if (NFTStaked !== undefined && account) {
			// 	getCurrentReward(setRewardForStaking, account, rewardForStaking)
			// }
		}
	}, [NFTStaked, account])



	return (

		<motion.div initial="hidden"
			animate="visible"
			exit="exit"
			variants={componentsVariant}
		>
			{/* {account && amountOfNFTs !== undefined && !NFTStaked && <motion.h1
				initial="hidden"
				animate="visible"
				variants={generalVariant}
			>У вас на кошельке {amountOfNFTs} NFT</motion.h1>} */}
			<div>
				<motion.img
					initial="hidden"
					animate="visible"
					variants={generalVariant}
					className={styles.staking__image} src={NFTImage}></motion.img>
				{account && (amountOfNFTs != false || NFTStaked != false) && NFTImage && (NFTStaked ? <StakedImage NFTImage={NFTImage} setIsLoading={setIsLoading} setNFTStaked={setNFTStaked} account={account} isLoading={isLoading} />
					:
					<StakingImage setNFTStaked={setNFTStaked} setIsLoading={setIsLoading} NFTImage={NFTImage} account={account} setApproval={setApproval} approval={approval} isLoading={isLoading} />)}
			</div>
			{whitelistStatus && account && !didMintedAnNFT && <motion.h1
				initial="hidden"
				animate="visible"
				variants={generalVariant}
			>Вы в вайтлисте и <Link to="/mint">можете заминтить</Link> NFT</motion.h1>}
			{!whitelistStatus && amountOfNFTs !== undefined && amountOfNFTs == false && NFTStaked == false && account && <h1>Вы можете купить NFT <a href="https://testnets.opensea.io/assets/0x7356f28d8c640c871d90ad517e6265d8b006965e/0" target="_blank">здесь</a></h1>}
			<AnimatePresence>
				{whitelistStatus && account && <motion.h1
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={generalVariant}
				>Ваша текущая награда составляет<motion.span> {rewardForStaking / 10 ** 18}</motion.span> токенов Crypton Days
				</motion.h1>}
			</AnimatePresence>
			<AnimatePresence>
				{
					whitelistStatus && account && rewardForStaking != 0 &&
					<motion.button
						initial="hidden"
						animate="visible"
						exit="exit"
						variants={generalVariant}
						whileHover={{ scale: 1.03 }}
						onClick={() => withdrawReward(setRewardForStaking, account, setIsWithdrawing)} className={isWithdrawing ? styles.staking__button_processing : styles.staking__button}>
						Вывести {rewardForStaking / 10 ** 18} токенов Crypton Days
						<AnimatePresence>
							{isWithdrawing && <motion.div
								initial="hidden"
								animate="visible"
								variants={generalVariant}
								exit="exit"
								className={styles.loader}>< MoonLoader size={20} loading={true} /></motion.div>}
						</AnimatePresence>
					</motion.button>
				}
			</AnimatePresence>
		</motion.div >
	)
}
