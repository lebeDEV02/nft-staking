import { React, useState, useEffect } from 'react'
import { checkWhitelist } from '../functions/checkWhitelist';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT';
import { mintNFT } from '../functions/mintNFT';
import { Link } from 'react-router-dom';


export default function Mintpage(account, setAccount) {

	const [whitelistStatus, setWhitelistStatus] = useState();
	const [didMintedAnNFT, setDidMintedAnNFT] = useState("");

	useEffect(() => {
		checkDidMintedAnNFT(setDidMintedAnNFT, account.account);
	}, [])

	return (
		<>
			{!didMintedAnNFT && account && <button onClick={() => checkWhitelist(setWhitelistStatus, account.account)}>Check Whitelist</button>}
			{!didMintedAnNFT && whitelistStatus !== undefined && <h1>{whitelistStatus ? `Вы в вайтлисте и можете сминтить NFT!!!` : `К сожалению, Вы не в вайтлисте`}</h1>}
			{!didMintedAnNFT && whitelistStatus && <button onClick={() => mintNFT(account.account)}>Mint an NFT</button>}
			{didMintedAnNFT && <h1>Вы уже заминтили NFT, застейкать её можно <Link to="/stake">здесь</Link></h1>}
		</>
	)
}
