import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Nav, Navbar, Row, Button, Card, CardGroup } from 'react-bootstrap';
import imgSrc from './img/bg.png'; // 이미지 사용
import data from './data.js'; // 경로는 . 으로 시작
import { Routes, Route, useNavigate } from 'react-router-dom';

// 페이지별 import
import { Detail } from './pages/detail.js';
import { Err404 } from './pages/error.js';
import About from './pages/about.js';
import {Event} from './pages/event.js';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <NavBarTop />
      <Routes>
        <Route path="/" element={ // 메인페이지
          <>
            <BgImg />
            <Cards shoes={shoes} navigate={navigate} />
          </>
        } />
        <Route path="/detail" element={<Detail />} />

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
function Cards(props) {
  const { shoes } = props;
  return (
    <Container>
      <Row>
        <CardGroup>
          {
            shoes.map((x, i) => {
              return (
                <Card key={i}>
                  <Card.Img variant="top" src={process.env.PUBLIC_URL + "/shoes" + (i + 1) + ".jpg"} />
                  <Card.Body>
                    <Card.Title> {x.title} </Card.Title>
                    <Card.Text> {x.content} </Card.Text>
                    <Button variant="outline-info" onClick={() => {
                      props.navigate('/detail')
                    }}>더보기</Button>
                  </Card.Body>
                </Card>
              )
            })
          }
        </CardGroup>
      </Row>
    </Container>
  )
}

export default App;

