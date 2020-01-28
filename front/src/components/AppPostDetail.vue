<template>
  <div>
    <app-header />
    <div>
      <div v-if='validateAuthorPost'>
        <button @click='toggleEditable'>Editar Post</button>
        <button @click='deletePost'>Borrar post</button>
      </div>
      <p v-if='editable'>Puedes editar el título haciendo click en él</p>
      <h3 :contenteditable='editable'>{{postData.title}}</h3>
      <p v-if='editable'>Puedes editar el text haciendo click en él</p>
      <p class='text' :contenteditable='editable'>{{postData.text}}</p>
      <p>
        Escrito por: {{postData.username}} /
        <span class='nickname'>{{postData.nickname}}</span>
      </p>
      <button v-if='editable' @click='editPost'>Enviar post editado</button>
      <app-new-post
        :element='element'
        :isAuth='isAuth'
        :postId='postId'
      />
      <app-posts
        :posts='postData.comments'
        :message='message'
        v-if='postData.comments'
        :element='element'
        :messageComments='messageComments'
        :validationAuthorPost='validateAuthorPost'
        :deleteComment ='deleteComment'
        :validationAuthorComment='validateAuthorComment'
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import AppPosts from '../components/AppPosts'
import AppHeader from '../components/AppHeader'
import AppNewPost from '../components/AppNewPost'
const token = localStorage.getItem('token')
export default {
  name: 'app-post-detail',
  data () {
    return {
      postData: Object,
      postId: null,
      editable: false,
      validateAuthorPost: false,
      validateAuthorComment: false,
      delete: false,
      message: 'Comentarios:',
      element: 'comentario',
      messageComments: ''
    }
  },
  components: {
    AppHeader,
    AppPosts,
    AppNewPost
  },
  props: {
    isAuth: Boolean,
    newComment: null
  },
  methods: {
    getOnePost (idParam) {
      axios.get('https://localhost:3443/blog/posts/' + idParam).then(res => {
        this.postData = res.data.post
        this.validationAuthorPost()
        this.validationAuthorComment()
      })
    },
    async editPost () {
      const titleEl = document.querySelector('h3')
      const textEl = document.querySelector('.text')
      const titleValue = titleEl.textContent
      const textValue = textEl.textContent
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
      if (result.status === 500) {
        console.log('ups error de servidor')
      }
      return result.status
    },
    deletePost () {
      if (this.validateAuthorPost) {
        console.log('si lo puedes borrar')
        axios
          .delete('https://localhost:3443/blog/posts/' + this.postId, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then(res => {
            console.log(res.data.message)
            document.location.href = '/'
          })
      } else {
        console.log('no puedes borrar un post que no es tuyo')
      }
    },
    deleteComment (e) {
      const trigger = e.currentTarget.parentElement
      const commentId = trigger.querySelector('.hidden').textContent
      if (this.validateAuthorPost) {
        console.log('si lo puedes borrar')
        axios
          .delete('https://localhost:3443/blog/posts/' + this.postId + '/comments/' + commentId, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then(res => {
            console.log(res.data.message)
          })
      } else {
        console.log('no puedes borrar comentarios de un post que no es tuyo')
      }
    },
    toggleEditable () {
      if (this.validateAuthorPost) {
        this.editable = !this.editable
      } else {
        console.log('modal no puedes')
      }
    },
    async validationAuthorPost () {
      let validated
      const role = localStorage.getItem('role')
      const username = localStorage.getItem('username')
      const usernamePost = await this.postData.username
      if (username === usernamePost || role === 'admin') {
        console.log('es mi entrada y puedo borrar comentarios')
        validated = true
      } else {
        validated = false
      }
      this.validateAuthorPost = validated
    },
    async validationAuthorComment () {
      let validated
      const role = localStorage.getItem('role')
      const username = localStorage.getItem('username')
      console.log('111usernameeeee', username)
      this.postData.comments.forEach(comment => {
        console.log('222222', comment.username)
        if (comment.username === username || role === 'admin') {
          console.log('Soy el autor de este comentario y puedo borrarlo')
          validated = true
        } else {
          validated = false
        }
      })
      this.validateAuthorComment = validated
    }
    // async validationRole () {
    //   let validated
    //   const role = localStorage.getItem('role')
    //   const username = localStorage.getItem('username')
    //   const usernamePost = await this.postData.username
    //   if (username === usernamePost || role === 'admin') {
    //     console.log('es mi entrada y puedo borrar este comentario')
    //     validated = true
    //   } else {
    //     validated = false
    //   }
    //   this.validatedRole = validated
    // }
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
.comments_container {
  border: solid 1px black
}
li {
  list-style-type: none
}
</style>
