<template>
  <div id="app">
    <div class="nav">
      <div class="left-nav">
        <router-link to="/"><img src="./assets/logo.png" alt="D&D Spellbook logo" class="logo"/></router-link>
      </div>
      <div class="right-nav">
        <button v-if="!user" class="button" @click="signIn()">Sign-In with Google</button>
        <div v-if="user" class="profile" @click="showAccountMenu = !showAccountMenu">
          <img :src="user.profileImage" class="profile-image" alt="profile"/>
          <div class="profile-name">{{user.firstName}}</div>
          <div v-if="showAccountMenu" class="account-menu">
            <ul>
              <li @click="signOut()">Sign Out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import * as authenticationService from './auth/authentication-service.js'

const data = { showAccountMenu: false }

export default {
  name: 'App',
  data: function() { return data },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
      signIn () {
        authenticationService.signIn()
      },
      signOut () {
        authenticationService.signOut()
      }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
  .logo {
    height:50px;
  }
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    
  }
  .right-nav {
    align-self: flex-end;
  }
  .profile {
    display: flex;
    padding: 5px 10px;
    position: relative;
  }
  .profile-image {
    border-radius: 50%;
    height: 40px;
  }
  .profile-name {
    padding: 7px;
    font-size: 25px;
    color: white;
  }
  .account-menu {
    position: absolute;
    left: 15px;
    top: 40px;
    background-color: #aaa;
    padding: 10px;

    ul {
      padding: 0;
      margin: 0;
      li {
        cursor: pointer;
      }
    }
  }
</style>
