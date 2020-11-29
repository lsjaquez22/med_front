import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* User */
    userId: null,
    userName: null,
    userEmail: null,
    userAvatar: null,
    userCompany: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,
    isLogged: false,
    isAdmin: false
  },
  mutations: {
    /* A fit-them-all commit */
    isLogged (state, value) {
      state.isLogged = value
    },
    isAdmin (state, value) {
      state.isAdmin = value
    },
    basic (state, payload) {
      state[payload.key] = payload.value
    },
    loginDoctor (state, user) {
      localStorage.setItem('jwt', user.accessToken)
      state.userId = user.id
      state.userName = user.username
      state.userEmail = user.email
      state.userCompany = user.hospital
    },
    updateDoctor (state, user) {
      state.userId = user.id
      state.userName = user.username
      state.userEmail = user.email
      state.userCompany = user.hospital
    },
    logoutDoctor (state) {
      localStorage.removeItem('jwt')
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    /* Aside Mobile */
    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    }
  },
  actions: {
    isLogged (context, value) {
      context.commit('isLogged')
    },
    async loginDoctor (context, value) {
      const response = await axios({
        method: 'POST',
        url: 'https://patas-app.herokuapp.com/api/doctor/signin',
        data: {
          username: value.username,
          password: value.password
        }
      })
      if (response.status === 200) {
        context.commit('loginDoctor', response.data)
        context.commit('isLogged', true)
        context.commit('isAdmin', false)
      }
    },
    logoutDoctor (context, value) {
      context.commit('isLogged')
      context.commit('isLogged', false)
      context.commit('isAdmin', false)
    },
    async updateUser (context, user) {
      const response = await axios({
        method: 'PUT',
        url: `https://patas-app.herokuapp.com/api/doctor/update/${this.state.userId}`,
        headers: {
          'x-access-token': localStorage.getItem('jwt')
        },
        data: {
          username: user.username,
          email: user.email
        }
      })
      if (response.status === 200) {
        context.commit('updateDoctor', response.data)
      }
    }
  }
})
