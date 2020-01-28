<template>
  <div>
    <app-header />
    <div class="app-registration">
      <form method="post">
        <label for="username">Tu nombre de usuario</label>
        <input type="text" name="username" placeholder="John" v-model="username" />
        <label for="nickname">Tu nickname</label>
        <input type="text" name="nickname" placeholder="Johny" v-model="nickname" />
        <label for="nickname">Escribe tu contraseña (mínimo 6 caracteres)</label>
        <input type="password" name="password" v-model="password" />
      </form>
      <button @click='sendRegistration'>Enviar</button>
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
      password: null
    }
  },
  methods: {
    sendRegistration () {
      const params = { username: this.username, nickname: this.username, password: this.password }

      axios.post('https://localhost:3443/register', params)
        .then(res => {
          console.log('RESDATA', res.data.register)
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
