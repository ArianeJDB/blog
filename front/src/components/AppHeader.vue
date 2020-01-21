<template>
  <div class="header_container">
    <h1>Hola soy el header</h1>
       <router-link :to="'/registration'">
      Regístrate
    </router-link>
       <router-link :to="'/login'">
      Entrar
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header_container{
  height: 100px;
  background-color: red;
}
h1{
  margin-top: 0;
}
</style>
