import { React, useState, useEffect } from 'react'
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT'
import { checkWhitelist } from '../functions/checkWhitelist'
import { getAmountOfNFTs } from '../functions/getAmountOfNFTs';
import { load } from '../functions/load';

export default function Stakepage(account, setAccount) {
	const [amountOfNFTs, setAmountOfNFTs] = useState("");
	const [didMintedAnNFT, setDidMintedAnNFT] = useState("");

	useEffect(() => {
		async function fetchData() {
			const NFTAmount = await getAmountOfNFTs(setAmountOfNFTs, account.account)
		}
		fetchData()
	}, [])
	const obj = fetch("https://bafybeiebtprqb3xcp2gd6covr7j76ldag3zcgzf753i4tujeucadb5ykiy.ipfs.dweb.link/0.json")
		.then(res => console.log(res.data))
	return (
		<>
			{ }
			{amountOfNFTs !== undefined && <h1>У вас на кошельке {amountOfNFTs} NFT</h1>}
			{/* {console.log(JSON.parse(`https://bafybeiebtprqb3xcp2gd6covr7j76ldag3zcgzf753i4tujeucadb5ykiy.ipfs.dweb.link/0.json`))} */}
			{/* <img src="https://bafybeiebtprqb3xcp2gd6covr7j76ldag3zcgzf753i4tujeucadb5ykiy.ipfs.dweb.link/0.json"></img> */}
		</>
	)
}
