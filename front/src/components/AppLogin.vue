<template>
  <div>
    <app-header />
    <div class="app-login mt-12 text-center">
      <v-card-title class='deep-orange--text text--darken-3'>Entrar</v-card-title>
      <v-card width='70%'>
      <v-form method="post" class='mx-12 mt-12'>
        <v-text-field type='text' class='input_username' color='deep-orange darken-3' label='Nombre de usuario' v-model='username' data-cy='username'>
        </v-text-field>
         <v-text-field class='input_password' color='deep-orange darken-3' label='Contraseña' type='password' v-model='password'>
        </v-text-field>
        <!-- <label for="username">Nombre de usuario</label>
        <input type="text" name="username" placeholder="John" v-model="username" /> -->
        <!-- <label for="nickname">Contraseña</label>
        <input type="password" name="password" v-model="password" /> -->
      </v-form>
      <v-btn class='my-8 teal white--text' @click="sendLogin">Enviar</v-btn>
      </v-card>
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
      const nickname = result.data.userData.nickname
      this.addDataLS(token, userRole, username, nickname)
      this.username = ''
      this.password = ''
      window.location = '/'
    },
    addDataLS (token, userRole, username, nickname) {
      localStorage.setItem('token', token)
      localStorage.setItem('role', userRole)
      localStorage.setItem('username', username)
      localStorage.setItem('nickname', nickname)
    }
  }
}
</script>

<style scoped>
.app-login{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
