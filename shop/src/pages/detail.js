/* eslint-disable */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';

function Detail(props) {
  let [cnt, setCnt] = useState(0);
  let {id} = useParams();
  const shoes = props.shoes;
  let [modal, setModal] = useState(true);
  let [ment, setMent] = useState(null);
  let [variant, setVariant] = useState(null);
  let [change, setChange] = useState(0);

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
    </>
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