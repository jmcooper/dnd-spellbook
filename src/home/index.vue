<template>
  <div class="home-hero">
    <button class="button" v-if="!user">Sign in to  Spellbook</button>
    <router-link to="/edit-spellbook"><button class="button" v-if="user">Create a Spellbook</button></router-link>
    <button class="button" v-if="hasSpellbooks">Manage My Spellbooks</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    user () {
      return this.$store.state.user
    },
    hasSpellbooks () {
      const user = this.$store.user
      return user && user.spellbooks && user.spellbooks.length > 0
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .home-hero {
    background: linear-gradient(rgba(0,0,0, .6), rgba(0,0,0, .6)), url('./hero-castle.jpg') no-repeat -600px center;
    background-size: cover;
    height: 800px;
    padding-top:100px;
  }
  .button {
    font-size: 30px;
    padding: 15px;
  }
</style>
