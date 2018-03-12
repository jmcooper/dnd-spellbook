'use strict'
import Vue from 'vue'
import store from '../store'

export function signIn() {
  Vue.googleAuth().signIn(
    (authorizationResult) => store.dispatch('signIn', authorizationResult), 
    console.log
  )
}

export function signOut() {

  Vue.googleAuth().signOut(() => store.commit('clearUser'), console.log)

}