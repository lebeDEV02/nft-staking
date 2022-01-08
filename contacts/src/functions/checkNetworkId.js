import { web3 } from '../imports/web3'


export async function checkNetworkId(setNetworkId){
	const networkId = web3.eth.net.getId().then(res => setNetworkId(res))
}