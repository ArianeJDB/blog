<template>
  <div>
    <app-header />
    <div class="login_form">
      <form method="post">
        <label for="username">Nombre de usuario</label>
        <input type="text" name="username" placeholder="John" v-model="username" />
        <label for="nickname">Contraseña</label>
        <input type="password" name="password" v-model="password" />
      </form>
      <button @click="sendLogin">Enviar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppHeader from '../components/AppHeader'
export default {
  name: 'app-login',
  data () {
    return {
      username: null,
      password: null
    }
  },
  components: {
    AppHeader
  },
  props: {},
  methods: {
    async sendLogin () {
      const params = {
        username: this.username,
        password: this.password
      }
      const url = 'https://localhost:3443/login'
      console.log('PARAMS', params)
      // await axios.post('https://localhost:3443/login', {}, { headers: { 'Authorization': 'Basic ' + params } })
      //   .then(res => {
      //     console.log('RESDATA LOGIN', res.data)
      //   })
      const result = await axios.request({
        url,
        auth: {
          username: this.username,
          password: this.password
        },
        method: 'post'
      })
      this.username = ''
      this.password = ''
      console.log('RESULT DATA', result.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login_form {
  display: flex;
  flex-direction: column;
}
</style>
