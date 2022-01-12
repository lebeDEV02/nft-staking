import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
import Homepage from "../pages/Homepage"
export default function Layout(location) {
	return (
		<>
			<header>
				<nav className="nav">
					<NavLink to="/mint">Mint</NavLink>
					<NavLink to="/stake">Stake</NavLink>
					<NavLink to="/exchange">Exchange</NavLink>
				</nav>
				<div className="login">
					<Homepage />
				</div>
			</header>
			<main className="container">
				<Outlet />
			</main>
		</>
	)
}
