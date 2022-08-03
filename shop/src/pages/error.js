function Err404() {
	return (
		<div>
			<img src={process.env.PUBLIC_URL + "/err404Page.png"} widt="40%" alt="404" />
		</div>
	)
}

export {Err404};