import {web3} from "../imports/web3.js"

export async function load(setAccount) {
		const accounts = await web3.eth.requestAccounts();
      localStorage.setItem("isLoggedIn", true);
		setAccount(accounts[0])
}