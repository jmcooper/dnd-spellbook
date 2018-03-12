import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import uuid from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    spells: {},
    updateSavedSpellbookId: null
  },
  mutations: {
    clearUser(state) {
      state.user = null
    },
    updateSpells(state, spells) {
      state.spells = spells
    },
    updateUser(state, user) {
      state.user = Object.assign({}, user)
    }
  },
  actions: {
    signIn({ commit }, googleAuthResult) {
      const user = {
        accessToken: googleAuthResult.El,
        firstName: googleAuthResult.w3.ofa,
        lastName: googleAuthResult.w3.wea,
        profileImage: googleAuthResult.w3.Paa,
      }
      axios.post('/api/signin', user)
        .then(response => commit('updateUser', response.data))
        .catch(console.error)        
    },
    getSpells({commit}) {
      axios.get('/api/spells')
      .then(result => commit('updateSpells', result.data))
      .catch(console.error)      
    },
    upsertSpellbook({commit, state}, spellbook) {
      const user = Object.assign({}, state.user)
      
      if (!user.spellbooks)
        user.spellbooks = []

      if (!spellbook.id)
        spellbook.id = uuid.v4()

      const existingSpellbookIndex = user.spellbooks.findIndex(sb => sb.id === spellbook.id)
      if (existingSpellbookIndex > -1)
        user.spellbooks[existingSpellbookIndex] = spellbook
      else
        user.spellbooks.push(spellbook)        

        return axios.post('/api/user', user)
          .then(result => {
            commit('updateUser', user)
            return spellbook.id
          })
          .catch(console.error)
    }

  }
})
