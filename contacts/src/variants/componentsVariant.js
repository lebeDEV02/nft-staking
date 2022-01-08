export const componentsVariant = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.3, type: 'spring' }},
	exit: {
		x: '100vw',
		transtion: {ease: 'easeInOut'}
	}
}