const TOKEN = 'token'

const getToken = () => {
  return localStorage.getItem(TOKEN)
}

const setToken = (token) => {
  localStorage.setItem(TOKEN, token)
}

const removeToken = () => {
  localStorage.removeItem(TOKEN)
}

export default {
  namespace: 'currentUser',
  state: {},
  reducers: {
    'refresh' (state, payload) {
      console.log('run on refresh page, check sign in')
      return Object.assign(state, {})
    },
    'sign-in' (state, payload) {
      const token = payload.token
      try {
        console.log('do sign in')
        return
      } catch (e) {
        // eslint-disable-next-line
        console.error(e)
      }
      removeToken()
      return {}
    },
    'sign-out' (state) {
      console.log('do sign out')
      removeToken()
      return {}
    }
  },
};