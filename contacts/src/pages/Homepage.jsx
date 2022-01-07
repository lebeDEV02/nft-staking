import { React, useState, useEffect } from 'react'
import { load } from "../functions/load"
import { logOut } from "../functions/logout"
import { web3 } from '../imports/web3'
import styles from "../styles/homepage.module.css"
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn'
import { motion } from "framer-motion"
export default function Homepage({ account, setAccount }) {

	useEffect(() => {

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

	const list = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}

	return (
		<div>
			{account != undefined ? (<motion.h1
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}
			>Your account is: {account}</motion.h1>) : (<motion.h1
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3 }}>You need to authorize to continue ;)</motion.h1>)}
			<motion.button
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}
				className={styles.button} onClick={() => load(setAccount)}>Enter via metamask</motion.button>
			<motion.button
				initial="hidden"
				animate="visible"
				variants={list}
				transition={{ duration: 0.3, type: 'spring' }}
				className={styles.button} onClick={() => logOut(setAccount)}>Log out</motion.button>
		</div>
	)
}
