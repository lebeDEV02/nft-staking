import {web3} from "../imports/web3.js"
import { web3Modal } from "../imports/web3Modal.js";

export async function load(setAccount) {
	const accounts = await web3.eth.requestAccounts();
	setAccount(accounts[0])
	web3Modal.setCachedProvider(true)
}