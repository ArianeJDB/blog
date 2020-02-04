<template>
  <nav class="app-header">
    <v-toolbar class="teal menu_container" height="100px">
      <router-link :to="'/'">
        <img src="../assets/logo.png" alt />
      </router-link>
      <v-toolbar-title class="text-uppercase ml-2">
        <span class="font-weight-light">rock</span>
        <span class="font-weight-medium">blog</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-md-and-down menu">
        <router-link :to="'/registration'" class="link">
          <div>
            <v-icon>mdi-account-plus</v-icon>
            <span class='mx-3'>Regístrate</span>
          </div>
        </router-link>
        <router-link :to="'/login'" class="link">
          <div>
            <v-icon>mdi-login-variant</v-icon>
            <span class='mx-3'>Entrar</span>
          </div>
        </router-link>
        <div class='logout' @click='logout'>
            <v-icon>mdi-exit-run</v-icon>
            <span class='mx-3'>Salir</span>
        </div>
      </div>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
      <v-icon class="black--text hidden-lg-and-up" @click="drawer = !drawer">mdi-menu</v-icon>
    </v-toolbar>
    <v-navigation-drawer right v-model="drawer" app class="deep-orange darken-3 hidden-lg-and-up">
      <div class='drawer_container'>
      <router-link :to="'/registration'" class="link">
        <div class="icon_container">
          <v-icon class="mx-6">mdi-account-plus</v-icon>
          <span>Regístrate</span>
        </div>
      </router-link>
      <router-link :to="'/login'" class="link">
        <div class="icon_container">
          <v-icon class="mx-6">mdi-login-variant</v-icon>
          <span>Entrar</span>
        </div>
      </router-link>
        <div class='icon_container' @click='logout'>
            <v-icon class="mx-6">mdi-exit-run</v-icon>
            <span>Salir</span>
        </div>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      isOut: false
    }
  },
  name: 'app-header',
  props: {
    goHome: Function,
    username: null,
    nickname: null
  },
  methods: {
    logout () {
      localStorage.clear()
      this.isOut = true
      window.location = '/'
    }
  }
}
</script>

<style scoped >
img {
  width: 50px;
}
.link {
  text-decoration: none;
  color: black;
}
.icon_container {
  display: flex;
  margin: 20px;
}
.login_container {
  display: flex;
}
.menu {
  display: flex;
  flex-direction: row;
}
.menu_container{
  position: fixed;
  top:0;
  width: 100%;
  z-index: 1
}
.logout{
  display: flex;
  cursor: pointer;
}
.drawer_container{
  margin-top: 80px;
  display: flex;
  flex-direction: column;
}
</style>
