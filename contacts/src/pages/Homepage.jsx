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
	const [error, setError] = useState();


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


	const handleNetworkSwitch = async (networkName) => {
		setError();
		await changeNetwork({ networkName, setError });
	};
	const changeNetwork = async ({ networkName, setError }) => {
		try {
			if (!window.ethereum) throw new Error("No crypto wallet found");
			await window.ethereum.request({
				method: "wallet_addEthereumChain",
				params: [
					{
						...networks[networkName]
					}
				]
			});
		} catch (err) {
			setError(err.message);
		}
	};
	const networks = {
		bsc: {
			chainId: `0x${Number(56).toString(16)}`,
			chainName: "Binance Smart Chain Mainnet",
			nativeCurrency: {
				name: "Binance Chain Native Token",
				symbol: "BNB",
				decimals: 18
			},
			rpcUrls: [
				"https://bsc-dataseed1.binance.org",
				"https://bsc-dataseed2.binance.org",
				"https://bsc-dataseed3.binance.org",
				"https://bsc-dataseed4.binance.org",
				"https://bsc-dataseed1.defibit.io",
				"https://bsc-dataseed2.defibit.io",
				"https://bsc-dataseed3.defibit.io",
				"https://bsc-dataseed4.defibit.io",
				"https://bsc-dataseed1.ninicoin.io",
				"https://bsc-dataseed2.ninicoin.io",
				"https://bsc-dataseed3.ninicoin.io",
				"https://bsc-dataseed4.ninicoin.io",
				"wss://bsc-ws-node.nariox.org"
			],
			blockExplorerUrls: ["https://bscscan.com"]
		},
		rinkeby: {
			chainId: `0x${Number(4).toString(16)}`,
			chainName: "Rinkeby",
			nativeCurrency: {
				name: "Rinkeby Ether",
				symbol: "RIN",
				decimals: 18
			},
			rpcUrls: [
				"https://rinkeby.infura.io/v3/3de517be87e74aa6acdd7438d1802d82",
				"wss://rinkeby.infura.io/ws/v3/3de517be87e74aa6acdd7438d1802d82"
			],
			blockExplorerUrls: ["https://rinkeby.etherscan.io"]
		}
	};

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
				{chainId != undefined && chainId !== 97 ? <button onClick={() => handleNetworkSwitch("bsc")}>Change Network to Rinkeby</button> : null}
			</motion.div>
		</>
	)
}
