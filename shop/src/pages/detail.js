/* eslint-disable */
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Nav, Button } from 'react-bootstrap';
// Context API Setting 3
import { Context1 } from './../App.js'
import { useDispatch, useSelector } from "react-redux";
import { pushCart } from './../store.js'

function Detail(props) {
  let [cnt, setCnt] = useState(0);
  let {id} = useParams();
  let find = props.shoes.find(x => x.id === id)
  const shoes = props.shoes;
  let [modal, setModal] = useState(true);
  let [ment, setMent] = useState(null);
  let [variant, setVariant] = useState(null);
  let [change, setChange] = useState(0);
  let [tab, setTab] = useState(0);
  let dispatch = useDispatch()
  let watched = null // 최근 본 상품목록에 이용할 변수는 재렌더링 필요없음 

  // ********************************************************************************************
  // 1. 첫 랜더링할 때만 안내글 div 2초 보여주고 없애기
  useEffect(() => {
    setModal(true)
    setVariant('warning')
    setMent('2초이내 구매시 할인!')
    
    let timer = setTimeout(() => {
      setModal(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [ment]) // 멘트 변경마다 실행

  // 2. 문자입력시 숫자입력 안내 보여주기
  useEffect(()=>{
    // mount, update시 실행된다.
    let timer

    if (!ment) {
      timer = setTimeout(()=>{
        if(modal) setModal(false)
      }, 2000)
    } else {
      // ment가 존재할 때 string 타입이면 '숫자만 입력하세요.' 경고글 띄우기
      timer = setTimeout(()=>{
        if(!modal && change>0 && isNaN(ment)) {
          alert("숫자만 입력하세요")
        }
      })
    }
  }, [change])

  // 최근 본 상품목록에 추가
  /* 목표 : 사용자가 Detail page 접속하면 그 페이지에 보이는 상품id를 가져와서
            LocalStorage에 watched 항목에 추가한다. */
  useEffect(() => {
    let storageList = JSON.parse(localStorage.getItem("watched")) // []

    if(watched) {
      if(storageList.length > 0) {
        // push 전에 동일한 id값 index 찾기
        let existenceId = storageList.findIndex((obj) => {
          return obj.id === watched.id
        })

        if(existenceId === -1) {
          // 중복된 상품이 없다면 최근 본 상품목록에 추가한다.
          storageList.push(watched)
        }
      }
    } else {
      storageList.push(watched)
    }

    localStorage.setItem("watched", JSON.stringify(storageList))
  }, [watched])
  // ********************************************************************************************

	return (
    <>
      {
        (modal) ? <ModalDisappear ment={ment} variant={variant} /> : null
      }

      <br />
      <Container>
        {
          shoes.map(function(item, i) {
            if(Number(item.id) === Number(id)) {
              watched = item // 최근본 상품
              return (
                <Row key={i}>
                  <Col sm>
                    <img src={process.env.PUBLIC_URL + "/shoes" + (Number(id) + 1) +".jpg"} width="100%" alt="신발" />
                  </Col>
                  <Col sm>
                    <Form.Control type="test" placeholder="숫자만 입력하세요." onChange={(e)=>{
                        setMent(e.target.value) // state만 세팅해두고 useEffect에서 처리
                        setChange(++change)
                    }} />
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>\{item.price}원</p>
                    <Button onClick={()=>{
                      setCnt(++cnt)

                      // [주문하기] 버튼 클릭 시 장바구니에 추가. --> store.js
                      dispatch(pushCart( {id: 1, name: 'Red Knit', count: 1} ))
                    }} variant="danger">주문하기</Button>
                  </Col>
                </Row>
              )
            }
          })
        }
      </Container>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => { setTab(0) }}> 버튼 0  </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => { setTab(1) }}> 버튼 1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => {setTab(2) }}> 버튼 2 </Nav.Link>
        </Nav.Item>
      </Nav>

      <TabContent tab={tab} shoes={props.shoes}/>
    </>
  )
}

// 탭UI 컨텐츠
function TabContent({tab, shoes}) { // props -> {tab}
  let [fade, setFade] = useState(null)
  // Context API Setting 4
  let {stock} = useContext(Context1)
  
  useEffect(() => { // 헐 대박 여기서도 쓸 수 있어
    setTimeout(() => {
      setFade('end')
    }, 100)
    
    return () => {
      setFade('')
    }
  }, [tab])
  
  return (
    // className은 띄어쓰기를 주의할 것
    <div className={`start + ${fade}`}>
      {
        [<div>내용 {tab} {stock}, {shoes[0].title}</div>, <div>내용 {tab}</div>, <div>내용 {tab}</div>][tab]
      }
    </div>
  )
}

// 알림창
function ModalDisappear(props) {
  return (
    <Container>
      <Row>
        <Col>
          <Alert variant={props.variant}>
            {props.ment}
          </Alert>
          </Col>
      </Row>
    </Container>
  )
}

export {Detail};