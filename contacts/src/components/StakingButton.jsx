import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { generalVariant } from '../variants/generalVariant'
import styles from "../styles/staking.module.css"
import MoonLoader from "react-spinners/MoonLoader";
export default function StakingButton({ callback, textButton, className, hook, account, setIsLoading, isLoading, notify }) {
	return (
		<AnimatePresence>
			<motion.button
				initial="hidden"
				animate="visible"
				variants={generalVariant}
				exit="exit"
				whileHover={{ scale: 1.03 }}
				onClick={() => callback(hook, account, setIsLoading, notify)} className={isLoading ? styles.staking__button_processing : className}>{textButton}
				<AnimatePresence>
					{isLoading && <motion.div
						initial="hidden"
						animate="visible"
						variants={generalVariant}
						exit="exit"
						className={styles.loader}>< MoonLoader size={20} loading={true} /></motion.div>}
				</AnimatePresence>
			</motion.button >
		</AnimatePresence>

	)
}
