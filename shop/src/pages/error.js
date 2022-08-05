function Err404() {
	return (
		<div>
			<img src={process.env.PUBLIC_URL + "/err404Page.png"} widt="40%" alt="404" />
		</div>
	)
}

function Err500() {
  return (
    <div>
      <img src={process.env.PUBLIC_URL + "/err500Page.jpg"} alt="500" />
    </div>
  )
}

export {Err404, Err500};