import { React, useState, useEffect } from 'react'
import { load } from "../functions/load"
import { logOut } from "../functions/logout"
import { web3 } from '../imports/web3'
import styles from "../styles/homepage.module.css"
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn'

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



	return (
		<div>
			{account ? <h1>Your account is: {account}</h1> : <h1>You need to authorize to continue ;)</h1>}
			<button className={styles.button} onClick={() => load(setAccount)}>Enter via metamask</button>
			<button className={styles.button} onClick={() => logOut(setAccount)}>Log out</button>
		</div>
	)
}
