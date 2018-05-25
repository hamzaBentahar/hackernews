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
              <router-link :to="{name: 'home'}" exact-active-class="is-active" tag="a" class="navbar-item">Home</router-link>
              <router-link :to="{name: 'login'}" exact-active-class="is-active" tag="a" class="navbar-item">Login</router-link>
              <router-link :to="{name: 'submitTopic'}" exact-active-class="is-active" tag="a" class="navbar-item">Submit</router-link>
              <a href="#" class="navbar-item" @click.prevent="logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
</template>

<script>
  export default {
    name: "vMenu",
    methods: {
      logout(){
        localStorage.removeItem('token')
        console.log('token removed')
      }
    }
  }
</script>

<style scoped>

</style>
