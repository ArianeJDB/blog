<template>
  <div v-if='isAuth'>
    <label for='title' v-if="element !== 'comentario'">Título de tu post</label>
    <input type='text' v-model='title' v-if="element !== 'comentario'" />

    <label for='text'>Contenido de tu {{element}}</label>
    <textarea name='Nuevo post' id='a' cols='80' rows='10' v-model='text'></textarea>
    <button @click="element === 'post' ? addNewPost() : addNewComment()">Enviar {{element}}</button>
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
      console.log('result', result)
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
