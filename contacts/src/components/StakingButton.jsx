import React from 'react'
import { motion } from "framer-motion"
import { generalVariant } from '../variants/generalVariant'
export default function StakingButton({ callback, textButton, className, hook, account, setIsLoading }) {
	return (
		<motion.button
			initial="hidden"
			animate="visible"
			variants={generalVariant}
			whileHover={{ scale: 1.03 }}
			onClick={() => callback(hook, account, setIsLoading)} className={className}>{textButton}</motion.button>
	)
}
