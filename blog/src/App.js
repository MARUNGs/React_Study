/* eslint-disable */
import './App.css';
import { useState } from 'react';

function App() {

	let post = 'ABCD';
	let [a, aFunc] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
	// let [like, lFunc] = useState(0);
	let [likeArr, arrFunc] = useState([0, 0, 0]);
	let [modal, setModal] = useState(false); // 모달창 상태 표현


	return (
		<div className="App">
			<div class="black-nav">
				<h4>{ post }</h4>
			</div>

			{/* <button onClick={ () => { // 가나다순 정렬
				let copy = [...a];
				copy.sort();
				aFunc(copy);
			}}>
				글제목 가나다순 정렬
			</button>

			<div className="list">
				<h4>
					{ a[0] }
					<span onClick={ () => { lFunc(like+1) } }>
						☺
					</span> 
					
					{ like }
					<span onClick={ () => {
						let copy = [...a];
						copy[0] = '여자코트 추천';
						aFunc(copy);
					}}> 글수정 </span>
				</h4>
				<p>2월 17일 발행</p>
			</div>
			<div className="list">
				<h4>{ a[1] }</h4>
				<p>2월 17일 발행</p>
			</div>
			<div className="list">
				<h4 onClick={ () => {
					if(modal) {
						setModal(false);
					} else {
						setModal(true);
					}
				} }>{ a[2] }</h4>
				<p>2월 17일 발행</p>
			</div> */}

			{/* map() 함수 이용 */}
			{
				a.map(function(x, i) {
					return (
						<div className="list">
							<h4 onClick={()=>{
								if(modal) {
									setModal(false);
								} else {
									setModal(true);
								}
							}}>
								{/* 각각의 제목글 별 좋아요 표시 기능 */}
								<span> { i }. </span>{ x } <span onClick={()=>{
									let arrCopy = likeArr;
									arrCopy[i] += 1;
									arrFunc(arrCopy);
								}}> ☺ </span> { likeArr[i] }
							</h4>
							<p>2월 17일 발행</p>
						</div>
					)
				})
			}


			{
				modal == true ? <Modal aFunc={aFunc} a={a} color={'#eee'}/> : null
			}
    	</div>
  	);
}

function Modal(props) {
	return (
		<div className="modal" style={{ background: props.color }}>
			<h4>{ props.a[0] }</h4>
			<p>날짜하하하</p>
			<p>상세내용</p>
			<button onClick={()=>{
				let copy = [...props.a];
				copy[0] = '여자코트 추천';
				props.aFunc(copy);
			}}>제목글 수정</button>
		</div>
	);
}

export default App;
