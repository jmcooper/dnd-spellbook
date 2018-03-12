import Vue from 'vue'
import Router from 'vue-router'
import Home from './home'
import EditSpellbook from './spellbooks/edit-spellbooks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/edit-spellbook/:id',
      props: true,
      component: EditSpellbook
    },
    {
      path: '/edit-spellbook',
      component: EditSpellbook
    },
  ]
})
