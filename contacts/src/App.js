import {
	useEffect,
	useState
} from 'react';
import {Routes, Route} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Mintpage from "./pages/Mintpage"
import Stakepage from "./pages/Stakepage"
import { load } from './functions/load';
import { checkIsLoggedIn } from './functions/checkIsLoggedIn'

import Layout from "./components/Layout"


function App() {


	const [account, setAccount] = useState();

		useEffect(() => {
		if (checkIsLoggedIn()) {
			load(setAccount)
		}
		
	}, [])


	return (
    <>
	 <Routes>
		 <Route path="/" element={<Layout/>}>
		 <Route index element={<Homepage  account={account} setAccount={setAccount}/>} />
		 <Route path="mint" element={<Mintpage account={account} setAccount={setAccount}/>} />
		 <Route path="stake" element={<Stakepage account={account} setAccount={setAccount}/>} />
		 </Route>
	 </Routes>
    </>
  );
}

export default App;