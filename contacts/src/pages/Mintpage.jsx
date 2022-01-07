import { React, useState, useEffect } from 'react'
import { checkWhitelist } from '../functions/checkWhitelist';
import { checkDidMintedAnNFT } from '../functions/checkDidMintedNFT';
import { mintNFT } from '../functions/mintNFT';
import { Link } from 'react-router-dom';
import { checkIsLoggedIn } from '../functions/checkIsLoggedIn';
import { load } from '../functions/load';


export default function Mintpage() {

	const [whitelistStatus, setWhitelistStatus] = useState();
	const [didMintedAnNFT, setDidMintedAnNFT] = useState("");
	const [account, setAccount] = useState();

	useEffect(() => {
		async function fetchAccountInfo() {
			if (checkIsLoggedIn()) {
				const account = await load(setAccount);
			}
		}
		fetchAccountInfo();
		if (account) {
			checkDidMintedAnNFT(setDidMintedAnNFT, account);
		}
	}, [account])

	return (
		<>
			{account && !didMintedAnNFT && <button onClick={() => checkWhitelist(setWhitelistStatus, account)}>Check Whitelist</button>}
			{account && !didMintedAnNFT && whitelistStatus !== undefined && <h1>{whitelistStatus ? `Вы в вайтлисте и можете сминтить NFT!!!` : `К сожалению, Вы не в вайтлисте`}</h1>}
			{account && !didMintedAnNFT && whitelistStatus && <button onClick={() => mintNFT(account)}>Mint an NFT</button>}
			{account && didMintedAnNFT && <h1>Вы уже заминтили NFT, застейкать её можно <Link to="/stake">здесь</Link></h1>}
		</>
	)
}
