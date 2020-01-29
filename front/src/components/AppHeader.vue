<template>
  <nav class="app-header">
    <v-toolbar class="teal" height="100px">
      <router-link :to="'/'">
        <img src="../assets/logo.png" alt />
      </router-link>
      <v-toolbar-title class="text-uppercase ml-2">
        <span class="font-weight-light">rock</span>
        <span class="font-weight-medium">blog</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="hidden-md-and-down menu">
        <div class='mx-3'>
          <span>Hola,</span>
          <span class="font-weight-medium ml-2">{{username}}</span> /
          <span class="font-weight-light">{{nickname}}</span>
        </div>
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
      </div>
      <v-spacer class="hidden-lg-and-up"></v-spacer>
      <v-icon class="black--text hidden-lg-and-up" @click="drawer = !drawer">mdi-menu</v-icon>
    </v-toolbar>
    <v-navigation-drawer right v-model="drawer" app class="deep-orange darken-3 hidden-lg-and-up">
      <div class="welcome_container pt-10">
        <span class="hola subtitle-1 ml-3">Hola,</span>
        <div class="display-1 text-center">
          <span class="font-weight-medium">{{username}}</span>
          <span v-if='nickname !== null' class="font-weight-light"> /{{nickname}}</span>
        </div>
      </div>
      <router-link :to="'/registration'" class="link">
        <div class="registration_container my-10">
          <v-icon class="mx-6">mdi-account-plus</v-icon>
          <span>Regístrate</span>
        </div>
      </router-link>
      <router-link :to="'/login'" class="link">
        <div class="login_container">
          <v-icon class="mx-6">mdi-login-variant</v-icon>
          <span>Entrar</span>
        </div>
      </router-link>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  name: 'app-header',
  props: {
    goHome: Function,
    username: String,
    nickname: String
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
img {
  width: 50px;
}
.link {
  text-decoration: none;
  color: black;
}
.registration_container {
  display: flex;
}
.login_container {
  display: flex;
}
.welcome_container{
  border-bottom: solid 1px black;
  height: 150px;
}
.welcome_big{
  display: flex;
}
.menu {
  display: flex;
  flex-direction: row;
}
.usernick{
  border-right: solid 1px black;
}
</style>
