import { React, useState, useEffect } from 'react'
import { load } from "../functions/load"
import { logOut } from "../functions/logout"
import { web3 } from '../imports/web3'
import styles from "../styles/homepage.module.css"
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn'
import { motion } from "framer-motion"
import { generalVariant } from '../variants/generalVariant'
import { checkNetworkId } from '../functions/checkNetworkId'
export default function Homepage({ account, setAccount }) {
	const [networkId, setNetworkId] = useState();
	useEffect(() => {
		checkNetworkId(setNetworkId);
		if (checkIsLoggedIn()) {
			load(setAccount)
		}
		async function listenMMAccount() {
			window.ethereum.on("accountsChanged", async function () {
				const accounts = await web3.eth.requestAccounts();
				load(setAccount)
			});
		}
		listenMMAccount();
	}, [])
	useEffect(() => {
		if (networkId !== undefined && networkId !== 4) {
			alert("Change your wallet network to Rinkeby")
		}
	}, [account])



	return (

		<motion.div initial="hidden"
			animate="visible"
			variants={generalVariant}
			exit={{ opacity: 0, transtion: { ease: "easeInOut" } }}>
			{account != undefined ? (<motion.h1
				initial="hidden"
				animate="visible"
				variants={generalVariant}
			>Your account is: {account}</motion.h1>) : (<motion.h1
				initial="hidden"
				animate="visible"
				variants={generalVariant}>You need to authorize to continue ;)</motion.h1>)}
			<motion.button
				initial="hidden"
				animate="visible"
				variants={generalVariant}
				whileHover={{ scale: 1.03 }}
				className={styles.button} onClick={() => load(setAccount)}>Enter via metamask</motion.button>
			<motion.button
				initial="hidden"
				animate="visible"
				variants={generalVariant}
				whileHover={{ scale: 1.03 }}
				className={styles.button} onClick={() => logOut(setAccount)}>Log out</motion.button>
		</motion.div>
	)
}
