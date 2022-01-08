import { React, useState, useEffect } from 'react'
import { checkWhitelist } from '../functions/checkWhitelist';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT';
import { mintNFT } from '../functions/mintNFT';
import { Link } from 'react-router-dom';
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn';
import { load } from '../functions/load';
import { motion } from "framer-motion"
import styles from "../styles/homepage.module.css"
import { generalVariant } from '../variants/generalVariant';

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

	return (
		<motion.div initial="hidden"
			animate="visible"
			variants={generalVariant}
			exit={{ opacity: 0, transtion: { ease: "easeInOut" } }}>
			{!didMintedAnNFT != false && account && <motion.button
				initial="hidden"
				animate="visible"
				variants={generalVariant}
				whileHover={{ scale: 1.03 }}
				className={styles.button} onClick={() => checkWhitelist(setWhitelistStatus, account)}>Check Whitelist</motion.button>}
			{account && !didMintedAnNFT && whitelistStatus !== undefined &&
				<motion.h1
					initial="hidden"
					animate="visible"
					variants={generalVariant}
				>{whitelistStatus ? `Вы в вайтлисте и можете сминтить NFT!!!` : `К сожалению, Вы не в вайтлисте`}
				</motion.h1>}
			{account && !didMintedAnNFT && whitelistStatus && <motion.button
				initial="hidden"
				animate="visible"
				variants={generalVariant}
				whileHover={{ scale: 1.03 }}
				className={styles.button} onClick={() => mintNFT(account)}>Mint an NFT
			</motion.button>}
			{account && didMintedAnNFT && <motion.h1
				initial="hidden"
				animate="visible"
				variants={generalVariant}
			>Вы уже заминтили NFT, застейкать её можно <Link to="/stake">здесь</Link></motion.h1>}
		</motion.div>
	)
}
