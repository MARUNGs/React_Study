import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
// import React, { useState } from 'react';
import imgSrc from './img/bg.png'; // 이미지 사용
import list from './data.js';

function App() {

  // let [shoes] = useState([data]);


  return (
    <div className="App">
      <NavBarTop />
      <BgImgSetting />
      <ProductList />
    </div>
  );
}

// 내비게이션
function NavBarTop() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SHOP</Navbar.Brand>
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
function BgImgSetting() {
  return (
    <div className='main-bg' style={{ backgroundImage: 'url(' + imgSrc + ')'}}></div>
  )
}

// 상품리스트
function ProductList() {
  return (
    <Container>
      <Row>
        <Col sm>
          {/* public 폴더 이미지 쓰는 권장방식 */}
          <img src={process.env.PUBLIC_URL + "/shoes1.jpg"} width="80%"></img>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col sm>
          <img src={process.env.PUBLIC_URL + "/shoes2.jpg"} width="80%"></img>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
        <Col sm>
          <img src={process.env.PUBLIC_URL + "/shoes3.jpg"} width="80%"></img>
          <h4>상품명</h4>
          <p>상품설명</p>
        </Col>
      </Row>
    </Container>
  )
}

export default App;

