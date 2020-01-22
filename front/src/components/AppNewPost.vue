<template>
  <div>
    <div>
      <p>Título de tu post</p>
      <input type='text' v-model='title' />
      Contenido
      <textarea name='Nuevo post' id='a' cols='80' rows='10' v-model='text'></textarea>
      <button @click='addNewPost'>Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app-new-post',
  data () {
    return {
      title: null,
      text: null
    }
  },
  props: {},
  methods: {
    addNewPost () {
      const token = localStorage.getItem('token')
      const result = axios.post(
        'https://localhost:3443/blog/posts',
        {
          title: this.title,
          text: this.text
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      if (result.status === 500) {
        console.log('ups error de servidor')
      }
      return result.status
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
