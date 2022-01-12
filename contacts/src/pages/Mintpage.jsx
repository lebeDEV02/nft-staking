import { React, useState, useEffect, useContext } from 'react'
import { checkWhitelist } from '../functions/checkWhitelist';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT';
import { mintNFT } from '../functions/mintNFT';
import { Link } from 'react-router-dom';
import { load } from '../functions/load';
import { motion, AnimatePresence } from "framer-motion"
import styles from "../styles/minting.module.css"
import { generalVariant } from '../variants/generalVariant';
import { web3 } from '../imports/web3';
import MoonLoader from "react-spinners/MoonLoader";
import { AccountContext } from '../Contexts/accountContext';
import { web3Modal } from '../imports/web3Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Mintpage() {

	const [whitelistStatus, setWhitelistStatus] = useState();
	const [didMintedAnNFT, setDidMintedAnNFT] = useState(false);
	const [isMinting, setIsMinting] = useState(false);
	const { account, setAccount } = useContext(AccountContext)
	const [chainId, setChainId] = useState();

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			load(setAccount)
		}

		async function listenMMAccount() {
			window.ethereum.on("accountsChanged", async function () {
				const accounts = await web3.eth.requestAccounts();
				load(setAccount)
			});
		}
		listenMMAccount();
		if (account) {
			checkDidMintedAnNFT(setDidMintedAnNFT, account);
			async function checkChainId() {
				const chainId = await web3.eth.getChainId()
				setChainId(chainId)
			}
			checkChainId();
		}
	}, [account])



	return (
		<>
			<div>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
			{!web3Modal.cachedProvider && <h1>Авторизуйтесь, чтобы продолжить</h1>}
			{chainId == 4 && <motion.div initial="hidden"
				animate="visible"
				variants={generalVariant}
				exit={{ opacity: 0, transtion: { ease: "easeInOut" } }}>
				{web3Modal.cachedProvider && !didMintedAnNFT != false && account && <motion.button
					initial="hidden"
					animate="visible"
					variants={generalVariant}
					whileHover={{ scale: 1.03 }}
					className={styles.minting__button} onClick={() => checkWhitelist(setWhitelistStatus, account)}>Check Whitelist</motion.button>}
				{account && didMintedAnNFT == false && whitelistStatus !== undefined &&
					<motion.h1
						initial="hidden"
						animate="visible"
						variants={generalVariant}
					>{whitelistStatus ? `Вы в вайтлисте и можете сминтить NFT!!!` : `К сожалению, Вы не в вайтлисте`}
					</motion.h1>}
				{account && didMintedAnNFT == false && whitelistStatus &&
					<motion.button
						initial="hidden"
						animate="visible"
						variants={generalVariant}
						whileHover={{ scale: 1.03 }}
						className={isMinting ? styles.minting__button_processing : styles.minting__button} onClick={() => mintNFT(account, setDidMintedAnNFT, setIsMinting)}>Mint an NFT
						<AnimatePresence>
							{isMinting && <motion.div
								initial="hidden"
								animate="visible"
								variants={generalVariant}
								exit="exit"
								className={styles.loader}>< MoonLoader size={20} loading={true} /></motion.div>}
						</AnimatePresence>
					</motion.button>}
				{account && didMintedAnNFT && <motion.h1
					initial="hidden"
					animate="visible"
					variants={generalVariant}
				>Вы уже заминтили NFT, застейкать её можно <Link to="/stake">здесь</Link></motion.h1>}
			</motion.div>}
		</>
	)
}
