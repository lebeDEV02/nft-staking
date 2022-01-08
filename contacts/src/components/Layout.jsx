import React from 'react'
import { NavLink, Outlet } from "react-router-dom"
export default function Layout(location) {
	return (
		<>
			<header>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/mint">Mint</NavLink>
				<NavLink to="/stake">Stake</NavLink>
			</header>
			<main className="container">
				<Outlet />
			</main>
		</>
	)
}
