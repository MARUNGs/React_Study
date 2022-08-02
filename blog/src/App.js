/* eslint-disable */
import './App.css';
import React, { useState } from 'react';

function App() {
	let post = 'React Blog';
	let [a, aFunc] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학']);
	let [likeArr, arrFunc] = useState([0, 0, 0]);
	let [modal, setModal] = useState(false); // 모달창 상태 표현
	let [title, setTitle] = useState(0); // 제목 상태
	let [getVal, setVal] = useState(null); // 입력값

	return (
		<div className="App">
			<div className="black-nav">
				<h4>{ post }</h4>
			</div>

			{/* map() 함수 이용 */}
			{
				a.map(function(x, i) {
					return (
						<div className="list" key={i}>
							<h4 onClick={()=>{
								setTitle(i);

								if(modal) {
									setModal(false);
								} else {
									setModal(true);
								}
							}}>

								{/* 각각의 제목글 별 좋아요 표시 기능 */}
								<span> { i }. </span>{ x } <span onClick={(e)=>{
									// 이벤트 버블링 제한
									e.stopPropagation();

									let arrCopy = likeArr;
									arrCopy[i] += 1;
									arrFunc(arrCopy);
								}}> ☺ </span> { likeArr[i] }

								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

								{/* 각각의 글제목 삭제 기능 구현 */}
								<span style={{ borderStyle: 'outset', cursor: 'pointer' }} onClick={(e)=>{
									e.stopPropagation();
									let copy = [...a];

									for(var i=0; i<copy.length; i++) {
										// 글제목과 일치하는 요소를 찾아서 제거
										if(copy[i] == x) {
											copy.splice(i, 1);
										}
									}
									aFunc(copy);
								}}>Delete</span>
							</h4>
							<p>2월 17일 발행</p>
						</div>
					)
				})
			}

			{/* 클라이언트의 입력값 다루기 : e.target.value */}
			<input type="text" onChange={(e)=>{ 
				setVal(e.target.value);
			}}/>
			<button onClick={()=>{
				let copy = [...a];
				copy.unshift(getVal);
				aFunc(copy);
			}}>글 제목 추가</button>

			{/* 모달 창 생성, 자식 컴포넌트로 props 전달 */}
			{
				modal == true ? <Modal title={title} aFunc={aFunc} a={a} color={'#eee'}/> : null
			}
			<Modal2 />
    	</div>
  	);
}

function Modal(props) {
	// state를 여기에 작성해도 괜찮다. 
	// 그러나 여러 컴포넌트에서 필요하다 싶으면 App에서 보관하는게 효율적이다.
	// let [title, setTitle] = useState(0); // 제목 상태 

	return (
		<div className="modal" style={{ background: props.color }}>
			<h4>{ props.a[props.title] }</h4>
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

// class 문법
class Modal2 extends React.Component {
	constructor(props) { // props를 받을 땐
		super(props);

		// state 선언
		this.state = {
			name: 'kim',
			age: 20
		}
	}

	render() {
		return (
			
			<div>
				HEY {this.state.age} {/* state 사용 */}
				<button onClick={()=>{
					this.setState({ age: 21 }) // state 변경
				}}>
					클릭
				</button>
			</div> 
		);
	}
}

export default App;
