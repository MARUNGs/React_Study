/* eslint-disable */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Row, Button, Card, CardGroup, Col } from 'react-bootstrap';
import imgSrc from './img/bg.png'; // 이미지 사용
import data from './data.js'; // 경로는 . 으로 시작
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

// 페이지별 import
import { Detail } from './pages/detail.js';
import { Err404 } from './pages/error.js';
import About from './pages/about.js';
import { Event } from './pages/event.js';

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate()
  let [cnt, setCnt] = useState(0)

  // 원래 axios는 비동기식 통신 기술인데 동기화 형태로 변경하였음
  // const fetchShoes = async () => {
  //   const { data } = await axios.get("https://codingapple1.github.io/shop/data2.json")
  //   setShoes([...shoes, ...data])
  //   setFlag(true)
  // }

  // useEffect(() => {
  //   if (!flag) fetchShoes() // false일때만 동기화 실행
  // }, [cnt])

  return (
    <div className="App">
      <NavBarTop />
      <Routes>
        <Route path="/" element={ // 메인페이지
          <>
            <BgImg />
            <Container>
              <Button onClick={async () => {
                await axios.get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    let copy = [...shoes, ...result.data]
                    setShoes(copy)
                    setCnt(++cnt)
                  }).catch(() => {
                    console.log("서버통신 실패했어")
                  })
              }}> 상품추가 </Button>

              <Row>
                {
                  (Math.floor(shoes.length) / 3) === 1
                    ? <Cols shoes={shoes} len={shoes.length} navigate={navigate} />
                    : <Row>
                      <Cols shoes={shoes} len={shoes.length} navigate={navigate} />
                    </Row>
                }
              </Row>
            </Container>
          </>
        } />

        {/* URL 파라미터 - :id */}
        {/* 파라미터는 몇번이고 추가할 수 있다. */}
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member element</div>} />
          <Route path="location" element={<div>location element</div>} />
        </Route>

        {/* Event 페이지 만들기 */}
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<Card.Subtitle className="mb-2 text-muted">첫 주문시 양배추즙 서비스</Card.Subtitle>} />
          <Route path="two" element={<Card.Subtitle className="mb-2 text-muted">생일기념 쿠폰받기</Card.Subtitle>} />
        </Route>

        <Route path="*" element={<Err404 />} />
      </Routes>
    </div>
  );
}

// 내비게이션
function NavBarTop() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">SHOP</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">INTRODUCTION</Nav.Link>
          <Nav.Link href="#features">DETAIL</Nav.Link>
          <Nav.Link href="#pricing">QnA</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

// 배경화면 설정
function BgImg() {
  return (
    <div className='main-bg' style={{ backgroundImage: 'url(' + imgSrc + ')' }}></div>
  )
}

// 상품리스트
function Cols(props) {
  const { shoes } = props

  let rows = []
  for (let i = 0; i < props.len; i++) {
    rows.push(i)
  }

  const cardGroup = rows

  return (
    // <>
    //   {
    //     cardGroup.map((num, i) => {
    //       debugger
    //       <Col sm>
    //         <span>i</span>
    //       </Col>
    //     })
    //   }
    // </>




    <>
      <CardGroup>
        {
          shoes.map((data, i) => {
            return (
              <Card>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + "/shoes" + (i + 1) + ".jpg"} width="80%" />
                <Card.Body>
                  <Card.Title> A </Card.Title>
                  <Card.Text> B </Card.Text>
                  <Button variant="outline-info" onClick={() => {
                    props.navigate('/detail/' + 'C')
                  }}>더보기</Button>
                </Card.Body>
              </Card>
            )
          })
        }
      </CardGroup>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title> A </Card.Title>
            <Card.Text> B </Card.Text>
            <Button variant="outline-info" onClick={() => {
              props.navigate('/detail/' + 'C')
            }}>더보기</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title> A </Card.Title>
            <Card.Text> B </Card.Text>
            <Button variant="outline-info" onClick={() => {
              props.navigate('/detail/' + 'C')
            }}>더보기</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title> A </Card.Title>
            <Card.Text> B </Card.Text>
            <Button variant="outline-info" onClick={() => {
              props.navigate('/detail/' + 'C')
            }}>더보기</Button>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title> A </Card.Title>
            <Card.Text> B </Card.Text>
            <Button variant="outline-info" onClick={() => {
              props.navigate('/detail/' + 'C')
            }}>더보기</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title> A </Card.Title>
            <Card.Text> B </Card.Text>
            <Button variant="outline-info" onClick={() => {
              props.navigate('/detail/' + 'C')
            }}>더보기</Button>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title> A </Card.Title>
            <Card.Text> B </Card.Text>
            <Button variant="outline-info" onClick={() => {
              props.navigate('/detail/' + 'C')
            }}>더보기</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  )
}


function AddCardGroup() {
  // 컴포넌트 하나에서 처리할 수 없어서 CardGroup 내 포함되는 Cards를 추가하는 컴포넌트를 생성하였다.

}


export default App;

