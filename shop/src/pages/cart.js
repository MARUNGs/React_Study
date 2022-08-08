/* eslint-disable */
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { rename, plusAge } from './../store/userSlice.js'
import { count } from './../store.js'

function Cart() {
  let slices = useSelector((state) => state )
  let dispatch = useDispatch()

  return (
    <div>
      <h6> { slices.user.name }의 나이 : { slices.user.age }</h6>
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
                      dispatch(count(data.id))
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