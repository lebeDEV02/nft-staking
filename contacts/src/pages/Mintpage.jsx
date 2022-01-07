import { React, useState, useEffect } from 'react'
import { checkWhitelist } from '../functions/checkWhitelist';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT';
import { mintNFT } from '../functions/mintNFT';
import { Link } from 'react-router-dom';
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn';
import { load } from '../functions/load';
import { motion } from "framer-motion"
import styles from "../styles/homepage.module.css"


export default function Mintpage() {

	const [whitelistStatus, setWhitelistStatus] = useState();
	const [didMintedAnNFT, setDidMintedAnNFT] = useState();
	const [account, setAccount] = useState();

	useEffect(() => {
		async function fetchAccountInfo() {
			if (checkIsLoggedIn()) {
				const account = await load(setAccount);
			}
		}
		fetchAccountInfo();
		if (account) {
			checkDidMintedAnNFT(setDidMintedAnNFT, account);
		}
	}, [account])

	const list = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}
	return (
		<>
			{!didMintedAnNFT != false && account && <motion.button
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }} className={styles.button} onClick={() => checkWhitelist(setWhitelistStatus, account)}>Check Whitelist</motion.button>}
			{account && !didMintedAnNFT && whitelistStatus !== undefined && <motion.h1
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}>{whitelistStatus ? `Вы в вайтлисте и можете сминтить NFT!!!` : `К сожалению, Вы не в вайтлисте`}</motion.h1>}
			{account && !didMintedAnNFT && whitelistStatus && <button className={styles.button} onClick={() => mintNFT(account)}>Mint an NFT</button>}
			{account && didMintedAnNFT && <motion.h1
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}>Вы уже заминтили NFT, застейкать её можно <Link to="/stake">здесь</Link></motion.h1>}
		</>
	)
}
