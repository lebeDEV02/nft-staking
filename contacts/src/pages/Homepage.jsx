import { React, useState, useEffect, useContext } from 'react'
import { load } from "../functions/load"
import { logOut } from "../functions/logout"
import { web3 } from '../imports/web3'
import styles from "../styles/homepage.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { generalVariant } from '../variants/generalVariant'
import { checkNetworkId } from '../functions/checkNetworkId'
import { AccountContext } from '../Contexts/accountContext'
import { web3Modal } from '../imports/web3Modal'


export default function Homepage() {
	const [chainId, setChainId] = useState();
	const { account, setAccount } = useContext(AccountContext)



	useEffect(() => {
		if (web3Modal.cachedProvider) {
			load(setAccount)
		}
		async function listenMMAccount() {
			window.ethereum.on("accountsChanged", async function () {
				const accounts = await web3.eth.requestAccounts();
				load(setAccount)
			});
			window.ethereum.on('chainChanged', (_chainId) => {
				setChainId(_chainId);
				window.location.reload()
			});
		}
		listenMMAccount();
	}, [])

	useEffect(() => {
		if (account) {
			async function checkChainId() {
				const chainId = await web3.eth.getChainId()
				setChainId(chainId)
			}
			checkChainId();
			load(setAccount)
		}
	}, [account])



	return (
		<>
			<motion.div initial="hidden"
				animate="visible"
				variants={generalVariant}
				className={styles.login}
				exit={{ opacity: 0, transtion: { ease: "easeInOut" } }}>
				{account && (<motion.h5
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={generalVariant}
					className={styles.account}
				>{account}</motion.h5>)}
				{!account && <motion.button
					initial="hidden"
					animate="visible"
					variants={generalVariant}
					whileHover={{ scale: 1.03 }}
					className={styles.button} onClick={() => load(setAccount)}>Enter via metamask</motion.button>}
				{account && <motion.button
					initial="hidden"
					animate="visible"
					variants={generalVariant}
					whileHover={{ scale: 1.03 }}
					className={styles.button} onClick={() => logOut(setAccount)}>Log out</motion.button>}
			</motion.div>
			{chainId !== undefined && chainId !== 4 && alert("Смените сеть на Rinkeby, чтобы продолжить")}
		</>
	)
}
