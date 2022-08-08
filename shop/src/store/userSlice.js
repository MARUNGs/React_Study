import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name: 'user',
  initialState: { 
    name: 'Yoo',
    age: 28
  }, reducers: {
    rename(state) {
      // array | object의 경우 return 없이 직접 수정해도 state 반영 가능하다.
      state.name = 'KIM'
    }, plusAge(state, action) { // action : state변경함수를 action이라고 한다.
      state.age += action.payload // 화물 보낸 것 출력문법
    }
  }
})


export let { rename, plusAge } = user.actions /*{ 함수명 } : 오른쪽 자료를 변수로 빼는 문법.*/


export default user