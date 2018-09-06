import { routerRedux } from 'dva/router'
// const TOKEN = 'token'

// const getToken = () => {
//   return localStorage.getItem(TOKEN)
// }

// const setToken = (token) => {
//   localStorage.setItem(TOKEN, token)
// }

// const removeToken = () => {
//   localStorage.removeItem(TOKEN)
// }

export default {
  namespace: 'currentUser',
  state: {
    isLogin: false,
    signItem: {},
    groupItem: {},
    allSigns: []

  },
  reducers: {
    'refresh' (state, payload) {
      console.log('run on refresh page, check sign in')
      return Object.assign(state, {})
    },
    'sign-in' (state, action) {
    //  const token = action.token
      try {
        console.log('do sign in')
        return {...state, isLogin: true}
      } catch (e) {
        // eslint-disable-next-line
        console.error(e)
      }
      //removeToken()
      return {}
    },
    'sign-out' (state) {
      console.log('do sign out')
      //removeToken()
      return {...state, isLogin:false};
    },
    'edit-item' (state, action) {
      try {
        // console.log('do edit')
        // console.log(action.payload)
        if (action.payload.name == null) {
          const signItem = {...state.signItem, ...action.payload}
          return {...state, signItem}
        }
        const groupItem = {...state.groupItem, ...action.payload}
        return {...state, groupItem}
      } catch (e) {
        console.log(e)
      }
    },
    'all-Signs' (state, action){
      //console.log(action.payload)
      try {
        const allSigns = action.payload;
        return {...state, allSigns}
      } catch (e) {
        console.log(e)
      }
    }
  },
  effects: {
    *login(action,{call, put}){
      yield put({
        type: 'sign-in',
      });
      yield put(routerRedux.push('./dashboard'))
    },

    *logout(action,{call,put}){
      yield put({
        type: 'sign-out',

      });
    },
    *edit(action,{call,put}){
      yield put({
        type: 'edit-item',
        payload: action.payload,
      });
    //   yield put(routerRedux.push('./edit'))
    },
    *allSigns(action,{call,put}){
      yield put({
        type: 'all-Signs',
        payload: action.payload,
      })
    }

  }
};
