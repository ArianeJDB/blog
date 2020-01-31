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
          <span class='deep-orange--text text--darken-3'>La contraseña debe tener mínimo 6 caracteres</span>
        </v-text-field>
      </v-form>
       <v-btn class='my-8 teal white--text' @click='sendRegistration'>Enviar</v-btn>
       </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppHeader from '../components/AppHeader.vue'
export default {
  name: 'app-registration',
  data () {
    return {
      username: null,
      nickname: null,
      password: null,
      validPassword: true
    }
  },
  methods: {
    sendRegistration () {
      const params = { username: this.username, nickname: this.nickname, password: this.password }

      axios.post('https://localhost:3443/register', params)
        .then(res => {
          console.log('RESDATA', res.status)
        })
      this.username = ''
      this.nickname = ''
      this.password = ''
    }
  },
  props: {},
  components: {
    AppHeader
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
