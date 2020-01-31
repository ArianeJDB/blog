<template>
  <div>
    <app-header />
    <div class="app-login mt-12 text-center">
      <v-card-title class="deep-orange--text text--darken-3">Entrar</v-card-title>
      <v-card width="70%">
        <v-form method="post" class="mx-12 mt-12">
          <v-text-field
            type="text"
            class="input_username"
            color="deep-orange darken-3"
            label="Nombre de usuario"
            v-model="username"
            data-cy="username"
          ></v-text-field>
          <v-text-field
            type="password"
            class="input_password"
            color="deep-orange darken-3"
            label="Contraseña"
            v-model="password"
          ></v-text-field>
          <app-error-message v-if='isInvalid' :errorMessage='errorMessage' />
        </v-form>
        <v-btn class="my-8 teal white--text" @click="sendLogin">Enviar</v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppHeader from '../components/AppHeader'
import AppErrorMessage from './AppErrorMessage'
export default {
  name: 'app-login',
  data () {
    return {
      username: null,
      password: null,
      isInvalid: false,
      errorMessage: 'Ups! Algo ha ido mal, asegúrate de escribir bien tus datos'
    }
  },
  components: {
    AppHeader,
    AppErrorMessage
  },
  methods: {
    async sendLogin () {
      const url = 'https://localhost:3443/login'
      await axios.request({
        url,
        auth: {
          username: this.username,
          password: this.password
        },
        method: 'post'
      })
        .then((response) => {
          console.log(response)
          const token = response.data.token
          const userRole = response.data.userData.role
          const username = response.data.userData.username
          const nickname = response.data.userData.nickname
          this.addDataLS(token, userRole, username, nickname)
          this.username = ''
          this.password = ''
          window.location = '/'
        })
        .catch((error) => {
          if (error) { this.isInvalid = true }
        })
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
