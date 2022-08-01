/* eslint-disable */
import './App.css';
import { useState } from 'react';

function App() {

	let post = 'ABCD';
	let [a, aFunc] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
	let [like, lFunc] = useState(0);

	return (
		<div className="App">
			{/* 상단메뉴 만들기 */}
			<div class="black-nav">
				<h4>{ post }</h4>
			</div>
			<div className="list">
				<h4>{ a[0] } <span onClick={ () => { lFunc(like+1) } }>☺</span> { like } </h4>
				<p>2월 17일 발행</p>
			</div>
			<div className="list">
				<h4>{ a[1] }</h4>
				<p>2월 17일 발행</p>
			</div>
			<div className="list">
				<h4>{ a[2] }</h4>
				<p>2월 17일 발행</p>
			</div>
    	</div>
  	);
}

export default App;
