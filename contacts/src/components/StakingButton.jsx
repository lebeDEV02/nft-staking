import React from 'react'
import { motion } from "framer-motion"
export default function StakingButton({ callback, textButton, className, hook, account }) {
	const list = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}
	return (
		<motion.button
			initial="hidden"
			animate="visible"
			variants={list}
			transition={{ duration: 0.3, type: 'spring' }} onClick={() => callback(hook, account)} className={className}>{textButton}</motion.button>
	)
}
