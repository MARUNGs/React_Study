/* eslint-disable */
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { rename, plusAge } from './../store/userSlice.js'
import { count } from './../store.js'
import { memo, useMemo, useState } from 'react';

/***** [재렌더링을 막자] *****/
// memo의 원리?? 
// -> props가 변할 때만 재렌더링한다.
// -> 기존 props === 신규 props를 계속 비교하게 될 것이다.
// -> props가 길고 복잡하면 memo를 쓰는 것이 손해가 될 수도 있다.
let Child = memo(function() {
  return <div>자식 컴포넌트</div>
})

// useMemo
function Func() {
  // return 반복문 10억번 돌린 결과...
}


function Cart() {
  let slices = useSelector((state) => state )
  let dispatch = useDispatch()
  let [count, setCount] = useState(0)

  /**** [ 실행시점의 차이 ] *****/
  // useEffect : HTML 실행 후에 실행된다.
  // useMemo : 랜더링 될때 같이 실행된다.
  let result = useMemo(() => {
    return Func() // Cart 컴포넌트가 랜더링할 때 1회만 실행해준다.
  }, [])

  return (
    <div>
      <Child />
      <Button onClick={() => {
        setCount(++count)
      }}>재렌더링 테스트</Button>
      <h6> { slices.user.name }의 나이 : { slices.user.age } </h6>
      <Button onClick={(() => {
        dispatch(plusAge(100))
      })}>나이증가</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>순서</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            slices.cart.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.count}</td>
                  <td>
                    <Button variant="secondary" onClick={() => {
                      // dispatch(rename())
                      dispatch(count(slices.cart[i].id))
                    }}> + </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Cart