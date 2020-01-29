<template>
  <div v-if='isAuth' class='app-new-post pt-12 mt-12'>
    <h2 class='text-center mt-5 headline deep-orange--text text--darken-3'>Escribe tu {{element}}</h2>
      <v-form class='mx-12 mt-12'>
    <v-text-field color='deep-orange darken-3' label='Tìtulo' v-if="element !== 'comentario'" v-model='title'>
    </v-text-field>
        <v-textarea color='deep-orange darken-3' label="Contenido" v-model='text'></v-textarea>
        <div class= 'text-right'>
        <v-btn class='teal white--text' @click="element === 'post' ? addNewPost() : addNewComment()">Enviar</v-btn>
        </div>
        <!-- <button @click="element === 'post' ? addNewPost() : addNewComment()">Enviar {{element}}</button> -->
  </v-form>
<!-- <label for='text'>Contenido de tu {{element}}</label>
    <textarea name='Nuevo post' id='a' cols='80' rows='10' v-model='text'></textarea>
    <button @click="element === 'post' ? addNewPost() : addNewComment()">Enviar {{element}}</button> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app-new-post',
  data () {
    return {
      title: null,
      text: null,
      token: localStorage.getItem('token')
    }
  },
  props: {
    element: String,
    isAuth: null,
    postId: String
  },
  methods: {
    addNewPost () {
      const result = axios.post(
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
      console.log('result status', result.PromiseStatus)
      // if (result.data.status === 500) {
      //   console.log('ups error de servidor')
      // } else if (result.data.status === 200) {
      //   console.log('MANDA MENSAHE DE QUE SE HAAÑADIDO POST')
      // }
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
      console.log('result add new comment', result)
      // if (result.data.status === 500) {
      //   console.log('ups error de servidor')
      // } else if (result.data.status === 200) {
      //   console.log('MANDA MENSAHE DE QUE SE HAAÑADIDO POST')
      // }
      this.text = ''
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
