<template>
  <div>
    <app-header />
    <div class="app-login">
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
  methods: {
    async sendLogin () {
      const url = 'https://localhost:3443/login'
      const result = await axios.request({
        url,
        auth: {
          username: this.username,
          password: this.password
        },
        method: 'post'
      })
      const token = result.data.token
      const userRole = result.data.userData.role
      const username = result.data.userData.username
      this.addDataLS(token, userRole, username)
      this.username = ''
      this.password = ''
      window.location = '/'
    },
    addDataLS (token, userRole, username) {
      localStorage.setItem('token', token)
      localStorage.setItem('role', userRole)
      localStorage.setItem('username', username)
    }
  }
}
</script>

<style scoped lang="scss">
// .login_form {
//   display: flex;
//   flex-direction: column;
// }
</style>
