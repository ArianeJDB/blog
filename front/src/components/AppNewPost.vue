<template>
  <div v-if="isAuth" class="app-new-post pt-12 mt-12">
    <h2 class="text-center mt-5 headline deep-orange--text text--darken-3">Escribe tu {{element}}</h2>
    <v-form class="mx-12 mt-12">
      <v-text-field
        class="input_title"
        color="deep-orange darken-3"
        label="Tìtulo"
        v-if="element !== 'comentario'"
        v-model="title"
      ></v-text-field>
      <v-textarea class="input_text" color="deep-orange darken-3" label="Contenido" v-model="text"></v-textarea>
      <app-error-message v-if="isValid" :errorMessage="errorInvalid" />
      <app-good-message v-if="isSent" :OKMessage="messageSent" />
      <div class="text-right">
        <v-btn
          class="teal white--text"
          @click="element === 'post' ? addNewPost() : addNewComment()"
        >Enviar</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import AppErrorMessage from './AppErrorMessage'
import AppGoodMessage from './AppGoodMessage'
export default {
  name: 'app-new-post',
  data () {
    return {
      title: null,
      text: null,
      token: localStorage.getItem('token'),
      isValid: false,
      isSent: false,
      errorInvalid: 'No puedes incluir palabras ofensivas',
      messageSent: 'Tu post ha sido enviado =)'
    }
  },
  props: {
    element: String,
    isAuth: null,
    postId: String
  },
  components: {
    AppErrorMessage,
    AppGoodMessage
  },
  methods: {
    addNewPost () {
      axios.post(
        'https://localhost:3443/blog/posts',
        {
          title: this.title,
          text: this.text
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }
      )
        .then((response) => {
          console.log(response.data)
          this.isSent = true
          location.reload()
        })
        .catch((error) => {
          console.log(error)
          this.isValid = true
        })
      this.title = ''
      this.text = ''
    },
    addNewComment () {
      const result = axios.post(
        'https://localhost:3443/blog/posts/' + this.postId,
        {
          comments: [
            {
              comment: this.text
            }
          ]
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        }
      )
        .then((response) => {
          console.log(response.data)
          this.isValid = false
          this.isSent = true
          // location.reload()
        })
        .catch((error) => {
          console.log(error)
          this.isValid = true
        })
      console.log('result add new comment', result)
      this.text = ''
    }
  }
}
</script>

<style scoped >
</style>
