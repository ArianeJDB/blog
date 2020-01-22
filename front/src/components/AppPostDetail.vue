<template>
  <div>
    <div>
      <button @click='toggleEditable'>Editar Post</button>
      <p v-if='editable'>Puedes editar el título haciendo click en él</p>
      <h3 :contenteditable='editable'>{{postData.title}}</h3>
      <p v-if='editable'>Puedes editar el text haciendo click en él</p>
      <p class='text' :contenteditable='editable'>{{postData.text}}</p>
      <p>
        Escrito por: {{postData.username}} /
        <span class='nickname'>{{postData.nickname}}</span>
      </p>
      <button v-if='editable' @click='editPost'>Enviar comentario editado</button>
      <h4>Comentarios:</h4>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import AppNewPost from '../components/AppNewPost'
export default {
  name: 'post-detail',
  data () {
    return {
      postData: Object,
      postId: null,
      editable: false
    }
  },
  components: {
    // AppNewPost
  },
  props: {},
  methods: {
    getOnePost (idParam) {
      axios.get('https://localhost:3443/blog/posts/' + idParam).then(res => {
        this.postData = res.data.post
      })
    },
    async editPost () {
      console.log('IDEPARA', this.postId)
      const titleEl = document.querySelector('h3')
      const textEl = document.querySelector('.text')
      const titleValue = titleEl.textContent
      const textValue = textEl.textContent
      const token = localStorage.getItem('token')
      const result = await axios.put(
        'https://localhost:3443/blog/posts/' + this.postId,
        {
          title: titleValue,
          text: textValue
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      console.log('RESULT', result)
      if (result.status === 500) {
        console.log('ups error de servidor')
      }
      return result.status
    },
    toggleEditable () {
      const role = localStorage.getItem('role')
      const username = localStorage.getItem('username')
      if (username === this.postData.username || role === 'admin') {
        this.editable = !this.editable
      } else {
        console.log('modal no puedes')
      }
    }
  },
  async created () {
    let idParam = this.$route.params.id
    this.postId = idParam
    await this.getOnePost(idParam)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
