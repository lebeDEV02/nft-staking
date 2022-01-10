import {
	useEffect,
	useState,
	useContext
} from 'react';
import {Routes, Route, useLocation} from "react-router-dom"
import Homepage from "./pages/Homepage"
import Mintpage from "./pages/Mintpage"
import Stakepage from "./pages/Stakepage"
import { load } from './functions/load';
import { AccountContext } from './Contexts/accountContext';
import Layout from "./components/Layout"
import { AnimatePresence } from 'framer-motion';


function App() {

	const location = useLocation()
	const context = useContext(AccountContext)
	const [account, setAccount] = useState();


	return (
    <>

       <AccountContext.Provider value={{account, setAccount}}>
	 <Routes>
		 <Route path="/" element={<Layout location={location}/>}>
		 <Route index element={<Homepage  account={account} setAccount={setAccount}/>} />
		 <Route path="mint" element={<Mintpage account={account} setAccount={setAccount}/>} />
		 <Route path="stake" element={<Stakepage account={account} setAccount={setAccount}/>} />
		 </Route>
	 </Routes>
       </AccountContext.Provider>
    </>
  );
}

export default App;