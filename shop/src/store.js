/* eslint-disable */
import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

// 주의사항 : 모든 state를 보관하지 않을 것.

// 저장소에서 state 생성(useState와 유사)
// 여기서는 slice 라고 부른다.

          

let stock = createSlice({
  name: 'stock',
  initialState: [10, 11, 12]
})


// cart.js 데이터와 기능
let cart = createSlice({
  name: 'stockList',
  initialState: [{
    id: 0,
    name: 'White and Black',
    count: 2
  }, {
    id: 2,
    name: 'Grey Yordan',
    count: 1
  }],
  reducers: {
    count(state, action) {
      state.map((obj, i) => {
        if(obj.id === action.payload) {
          state[action.payload].count += 1
        }
      })
    }, 
    pushCart(state, action) {
      state.push(action.payload)
    }
  }
})
export let { count, pushCart } = cart.actions





export default configureStore({
  reducer: { 
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer
  }
}) 