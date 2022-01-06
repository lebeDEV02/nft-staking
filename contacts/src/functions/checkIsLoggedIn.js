export const checkIsLoggedIn = () => {
		return (localStorage.getItem("isLoggedIn") === "true")
}