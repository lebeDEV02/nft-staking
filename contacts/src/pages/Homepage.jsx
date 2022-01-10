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
				exit={{ opacity: 0, transtion: { ease: "easeInOut" } }}>
				{account ? (<motion.h1
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
			<AnimatePresence>
				{chainId !== undefined && chainId !== 4 && <motion.h1 initial="hidden"
					animate="visible"
					variants={generalVariant}
					exit="exit"
				>Смените сеть на Rinkeby, чтобы продолжить</motion.h1>}
			</AnimatePresence>
		</>
	)
}
