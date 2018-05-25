<template>
  <section class="hero is-primary is-medium">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <router-link :to="{name: 'home'}" tag="a" class="navbar-item">HACKERNEWS</router-link>
          </div>
          <div id="navbarMenuHeroA" class="navbar-menu">
            <div class="navbar-end">
              <router-link :to="{name: 'home'}" exact-active-class="is-active" tag="a" class="navbar-item">Home
              </router-link>
              <router-link :to="{name: 'submitTopic'}" exact-active-class="is-active" tag="a" class="navbar-item"
                           v-if="this.isAuthenticated">Submit
              </router-link>
              <router-link :to="{name: 'login'}" exact-active-class="is-active" tag="a" class="navbar-item"
                           v-if="!this.isAuthenticated">Login
              </router-link>
              <a href="#" class="navbar-item" @click.prevent="logout"
                 v-if="this.isAuthenticated">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "vMenu",
    created() {
      console.log(this.$store.getters)
    },
    computed: {
      ...mapGetters([
        'isAuthenticated'
      ])
    },
    methods: {
      logout() {
        this.$store.commit('logout')
      }
    }
  }
</script>

<style scoped>

</style>
