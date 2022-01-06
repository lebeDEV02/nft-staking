import {web3Modal} from "../imports/web3Modal.js";

export async function logOut(setAccount) {
		const accounts = await web3Modal.clearCachedProvider();
		setAccount(undefined)
		localStorage.setItem("isLoggedIn", false);
}													