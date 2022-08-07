/* eslint-disable */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Nav } from 'react-bootstrap';

function Detail(props, {detailClass}) {
  let [cnt, setCnt] = useState(0);
  let {id} = useParams();
  const shoes = props.shoes;
  let [modal, setModal] = useState(true);
  let [ment, setMent] = useState(null);
  let [variant, setVariant] = useState(null);
  let [change, setChange] = useState(0);
  let [tab, setTab] = useState(0);

  // **********************************************
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
  // **********************************************

  // 첫 랜더링할 때만 안내글 div 2초 보여주고 없애기
  useEffect(() => {
    let timer

    timer = setTimeout(()=>{
      if(modal) setModal(false)
    }, 2000)

    // 1번만 실행
    return () => {
      clearTimeout(timer)
      setVariant("warning")
      setMent("2초 안에 구매시 할인혜택 적용!")
    }
  }, [])

	return (
    <>
      {
        (modal) ? <ModalDisappear ment={ment} variant={variant} /> : null
      }

      <Container>
        {
          shoes.map(function(item, i) {
            if(Number(item.id) === Number(id)) {
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
                    <button onClick={()=>{
                      setCnt(++cnt)
                    }} className="btn btn-danger">구매</button>
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

      <TabContent tab={tab}/>
    </>
  )
}
function TabContent({tab}) { // props -> {tab}
  let [fade, setFade] = useState(null)
  
  useEffect(() => { // 헐 대박 여기서도 쓸 수 있어
    // tab 값이 변경될때마다 className 부여
    setTimeout(() => {
      setFade('end')
    }, 100)
    
    return () => {
      // state가 변할 때마다 className을 뗐다가 다시 부착해야 한다.
      setFade('')
    }

    // [automatic batching]
    // state 변경이 되고나서 재렌더링 한번만 실행해주는 기능이 react에 내장되어 있다.
    // 그렇다보니 setFade('')와 setFade('end') 코드를 합쳐서 결국 setFade('end')가 되는데,
    // 이렇게 되면 뗐다가 다시 부착해야 발동하려는 목적을 달성할 수 없으므로,
    // setTimeout() 으로 코드실행 간격을 줘야 한다.
  }, [tab])
  
  return (
    // className은 띄어쓰기를 주의할 것
    <div className={`start + ${fade}`}>
      {
        [<div>내용 {tab}</div>, <div>내용 {tab}</div>, <div>내용 {tab}</div>][tab]
      }
    </div>
  )
}

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