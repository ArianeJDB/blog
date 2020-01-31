<template>
  <div>
    <app-header />
    <div class='app-registration mt-12 text-center'>
       <v-card-title class='deep-orange--text text--darken-3'>Registro</v-card-title>
        <v-card width='70%'>
      <v-form method='post' class='mx-12 mt-12'>
        <v-text-field type='text' color='deep-orange darken-3' label='Tu nombre de usuario' v-model='username'>
        </v-text-field>
          <v-text-field type='text' color='deep-orange darken-3' label='Tu nickname' v-model='nickname'>
        </v-text-field>
        <v-text-field type='password' color='deep-orange darken-3' label='Escribe tu contraseña' v-model='password'>
        </v-text-field>
      </v-form>
       <v-btn class='my-8 teal white--text' @click='sendRegistration'>Enviar</v-btn>
       </v-card>
       <app-error-message v-if='isInvalid' :errorMessage='errorEmpty' />
       <app-good-message v-if='isSent' :OKMessage='messageSent' />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppHeader from '../components/AppHeader.vue'
import AppErrorMessage from './AppErrorMessage'
import AppGoodMessage from './AppGoodMessage'
export default {
  name: 'app-registration',
  data () {
    return {
      username: '',
      nickname: '',
      password: '',
      isInvalid: false,
      errorEmpty: 'Ups! parece que ha habido un error, asegúrate de rellenar todos los campos',
      isSent: false,
      messageSent: 'Te has registrado correctamente =)'
    }
  },
  methods: {
    sendRegistration () {
      const params = { username: this.username, nickname: this.nickname, password: this.password }
      if (this.username === '' || this.nickname === '' || this.password === '') {
        this.isInvalid = true
      } else {
        axios.post('https://localhost:3443/register', params)
          .then(response => {
            this.isSent = true
          })
          .catch((error) => {
            console.log(error)
          })
        this.isInvalid = false
        this.isSent = true
        this.username = ''
        this.nickname = ''
        this.password = ''
      }
    }
  },
  props: {},
  components: {
    AppHeader,
    AppErrorMessage,
    AppGoodMessage
  }
}
</script>

<style scoped >
.app-registration{
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
