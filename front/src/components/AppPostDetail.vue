<template>
  <div>
    <app-header />
    <div class='container mt-12 pt-12'>
      <div v-if="validateAuthorPost" class='btns_container text-center my-8'>
        <v-btn class='mx-8 deep-orange darken-3 white--text' @click="toggleEditable">Editar Post</v-btn>
        <v-btn class='mx-8 deep-orange darken-3 white--text' @click="deletePost">Borrar post</v-btn>
      </div>
        <v-card width='50%' class='text-center pa-5 mt-5'>
        <p v-if="editable" class=' deep-orange--text text--darken-3 mb-0'>Puedes editar el título haciendo click en él</p>
        <h2 class='display-1' :contenteditable="editable">{{postData.title}}</h2>
        <p class='overline'>({{postData.date}})</p>
        <p v-if="editable" class=' deep-orange--text text--darken-3 mb-0'>Puedes editar el texto haciendo click en él</p>
        <p class="text headline mt-0" :contenteditable="editable">{{postData.text}}</p>
         <h4 class='subtitle-1 mb-5'>Escrito por: {{postData.username}} / <span class="nickname">{{postData.nickname}}</span>
      </h4>
        <v-btn v-if="editable" class='teal white--text' @click="editPost">Enviar post editado</v-btn>
      </v-card>
      </div>
      <app-new-post :element="element" :isAuth="isAuth" :postId="postId" />
      <app-posts
        :posts="postData.comments"
        :message="message"
        v-if="postData.comments"
        :element="element"
        :messageComments="messageComments"
        :validationAuthorPost="validateAuthorPost"
        :deleteComment="deleteComment"
        :validationAuthorComment="validateAuthorComment"
      />
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
      message: 'Comentarios',
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
        window.location.reload(false)
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
      this.postData.comments.forEach(comment => {
        if (comment.username === username || role === 'admin') {
          console.log('Soy el autor de este comentario y puedo borrarlo')
          validated = true
        } else {
          validated = false
        }
      })
      this.validateAuthorComment = validated
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
.comments_container {
  border: solid 1px black
}
li {
  list-style-type: none
}
.nickname {
  font-style: italic;
  font-weight: 100;
}
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btns_container{
  display: flex;
}
</style>
