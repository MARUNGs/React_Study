/* eslint-disable */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { Container, Nav, Navbar, Row, Button, Card, CardGroup, Alert } from 'react-bootstrap';
import imgSrc from './img/bg.png'; // 이미지 사용
import data from './data.js'; // 경로는 . 으로 시작
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

// 페이지별 import
import { Err404 } from './pages/error.js';
import About from './pages/about.js';
import { Event } from './pages/event.js';

/***** [굳이 먼저 실행되지 않아도 되는 컴포넌트는 lazy import 한다.] *****/
// import Detail from './pages/detail.js';
// import Cart from './pages/cart.js';
const Detail = lazy(() => import("./pages/detail.js"))
const Cart   = lazy(() => import("./pages/cart.js"))



// Context API Setting 1
export let Context1 = createContext() // state 보관함 생성

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate()
  let [cnt, setCnt] = useState(0)
  let [show, setShow] = useState(true)
  let [stock] = useState([10, 11, 12])


  /***** [ useEffect ] *****/
  // 최근 본 상품목록 초기화
  useEffect(() => {
    let storageList = JSON.parse(localStorage.getItem("watched"))

    if(storageList == null) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  /***** [ 숙제 ] ******/
  // 원래 axios는 비동기식 통신 기술인데 동기화 형태로 변경하였음
  // const fetchShoes = async () => {
  //   const { data } = await axios.get("https://codingapple1.github.io/shop/data2.json")
  //   setShoes([...shoes, ...data])
  //   setFlag(true)
  // }

  // useEffect(() => {
  //   if (!flag) fetchShoes() // false일때만 동기화 실행
  // }, [cnt])

  /***** [ react-query ] *****/
  let result = useQuery(['작명'], () => {
    return axios.get("https://codingapple1.github.io/userdata.json") // return 무조건 작성!
    .then((a) => {
      return a.data // return 무조건 작성!
    }),
    { staleTime: 2000 } // -> 설정한 시간동안 데이터가 stale되지 않도록 막는다. (refetch 방지)
  })

  return (
    <div className="App">
      <NavBarTop navigate={navigate} result={result}/>

      <Suspense fallback={<div>로딩중</div>}>
        <Routes>
          <Route path="/" element={ // 메인페이지
            <>
              <BgImg />
              <Container>
                <Button onClick={async () => {
                  { show ? <LoadingAlert/> : null }
                  await axios.get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    let copy = [...shoes, ...result.data]
                    setShoes(copy)
                    setCnt(++cnt)
                    setShow(false)
                  }).catch(() => {
                    console.log("첫번째 서버통신 실패했어")
                  })

                  if(cnt == 2) { // 두번 클릭했을 때 7,8,9 데이터 가져오기
                    await axios.get("https://codingapple1.github.io/shop/data3.json")
                    .then((result) => {
                      let copy = [...shoes, ...result.data]
                      setShoes(copy)
                      setCnt(++cnt)
                    }).catch(() => {
                      console.log("두번째 서버통신 실패했어")
                    })
                  } else if(cnt > 2) {
                    alert("더이상 상품이 존재하지 않습니다.")
                  }

                  // post 전송
                  // axios.post("/testUrl", {name: "ysk"})
                  
                  // 동시에 ajax 요청 여러개 하려면?
                  // Promise.all([axios.get("/url1"), axios.get("/url2")])

                  // 원래 서버와 통신할 땐 '문자'만 주고받을 수 있는데 
                  // json 형태를 이용하면 문자취급하여 통신이 가능하다.

                  // fetch("/url3")
                  // .then( /*결과 => 결과.json() */ )
                  // .then(/*data=>{}*/)

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
          {/* Context API Setting 2 */}
          <Route path="/detail/:id" element={
            <Context1.Provider value={{ stock, shoes }}> {/* ==> props 대신 사용할 수 있는 state 보관함 등록 */}
              <Detail shoes={shoes} />
            </Context1.Provider>
          } />

          {/* 장바구니 만들기 */}
          <Route path="/cart" element={ <Cart/> } />

          {/* ****************************************************************************** */}

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
      </Suspense>
    </div>
  );
}

// 내비게이션
function NavBarTop(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">SHOP</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">INTRODUCTION</Nav.Link>
          <Nav.Link onClick={() => {
            props.navigate("/cart")
          }}>Cart</Nav.Link>
          <Nav.Link href="#pricing">QnA</Nav.Link>
        </Nav>
        <Nav className="ms-auto helloUser">
          { props.result.isLoading ? "잠시만 기다려주세요..." : props.result.data.name }
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

// 로딩 알림창
function LoadingAlert() {
  return (
    <>
      <Alert key="info" variant="info">
        <p>로딩중입니다.</p>
      </Alert>
    </>
  )
}

// 상품리스트
function Cols(props) {
  // 원래는 props를 바로 이용해서 map을 이용하는 예제를 사용했어야 했으나...
  // 강의의 내용과 내 소스를 조금 다르기 때문에 이렇게 변경하였다.

  let cols = []
  let rows = []
  for (let i = 0; i < props.len; i++) {
    if(i>0 && ((i+1) % 3===0)) { // 상품은 3의 배수로 취급하여 나머지값 0이면 다음 행 추가로 취급함
      cols.push(props.shoes[i]) // 마지막 col을 담고,
      rows.push(cols)           // rows에 추가하여 행 추가하고
      cols = []                 // 새 컬럼들 추가하려고 다시 초기화
    } else {
      cols.push(props.shoes[i])
    }
  }

  return (
    <>
      {
        rows.map((cols, i) => {
          return (
            <CardGroup key={i}>
              {
                cols.map((col, j) => {
                  return (
                    <Card key={j}>
                      <Card.Img variant="top" src={process.env.PUBLIC_URL + "/shoes" + (col.id + 1) + ".jpg"} width="80%" />
                      <Card.Body>
                        <Card.Title> {col.title} </Card.Title>
                        <Card.Text> {col.content} </Card.Text>
                        <Button variant="outline-info" onClick={() => {
                          props.navigate('/detail/' + col.id)
                        }} > 더보기 </Button>
                      </Card.Body>
                    </Card>
                  )
                })
              }              
            </CardGroup>
          )
        })
      }
    </>




    // <>
    //   <CardGroup>
    //     {
    //       shoes.map((data, i) => {
    //         return (
    //           <Card>
    //             <Card.Img variant="top" src={process.env.PUBLIC_URL + "/shoes" + (i + 1) + ".jpg"} width="80%" />
    //             <Card.Body>
    //               <Card.Title> A </Card.Title>
    //               <Card.Text> B </Card.Text>
    //               <Button variant="outline-info" onClick={() => {
    //                 props.navigate('/detail/' + 'C')
    //               }}>더보기</Button>
    //             </Card.Body>
    //           </Card>
    //         )
    //       })
    //     }
    //   </CardGroup>
    //   <CardGroup>
    //     <Card>
    //       <Card.Body>
    //         <Card.Title> A </Card.Title>
    //         <Card.Text> B </Card.Text>
    //         <Button variant="outline-info" onClick={() => {
    //           props.navigate('/detail/' + 'C')
    //         }}>더보기</Button>
    //       </Card.Body>
    //     </Card>
    //     <Card>
    //       <Card.Body>
    //         <Card.Title> A </Card.Title>
    //         <Card.Text> B </Card.Text>
    //         <Button variant="outline-info" onClick={() => {
    //           props.navigate('/detail/' + 'C')
    //         }}>더보기</Button>
    //       </Card.Body>
    //     </Card>
    //     <Card>
    //       <Card.Body>
    //         <Card.Title> A </Card.Title>
    //         <Card.Text> B </Card.Text>
    //         <Button variant="outline-info" onClick={() => {
    //           props.navigate('/detail/' + 'C')
    //         }}>더보기</Button>
    //       </Card.Body>
    //     </Card>
    //   </CardGroup>
    //   <CardGroup>
    //     <Card>
    //       <Card.Body>
    //         <Card.Title> A </Card.Title>
    //         <Card.Text> B </Card.Text>
    //         <Button variant="outline-info" onClick={() => {
    //           props.navigate('/detail/' + 'C')
    //         }}>더보기</Button>
    //       </Card.Body>
    //     </Card>
    //     <Card>
    //       <Card.Body>
    //         <Card.Title> A </Card.Title>
    //         <Card.Text> B </Card.Text>
    //         <Button variant="outline-info" onClick={() => {
    //           props.navigate('/detail/' + 'C')
    //         }}>더보기</Button>
    //       </Card.Body>
    //     </Card>
    //     <Card>
    //       <Card.Body>
    //         <Card.Title> A </Card.Title>
    //         <Card.Text> B </Card.Text>
    //         <Button variant="outline-info" onClick={() => {
    //           props.navigate('/detail/' + 'C')
    //         }}>더보기</Button>
    //       </Card.Body>
    //     </Card>
    //   </CardGroup>
    // </>
  )
}

export default App;

