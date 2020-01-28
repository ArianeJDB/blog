<template>
  <div class="app-header">
<v-toolbar class="teal">
  <router-link :to="'/'"><img src="../assets/logo.png" alt=""></router-link>
   <v-spacer></v-spacer>
  <router-link :to="'/registration'" class='link'>
  <div class='registration_container mr-3'>
    <v-icon>mdi-account-plus</v-icon>
    <span>Regístrate</span>
  </div>
  </router-link>
  <router-link :to="'/login'" class='link'>
    <div class='login_container mr-3'>
    <v-icon>mdi-login-variant</v-icon>
    <span>Entrar</span>
  </div>
  </router-link>
  </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    goHome: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
img{
  width: 30px;
}
.link{
  text-decoration: none;
}
.registration_container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login_container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
