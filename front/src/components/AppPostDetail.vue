<template>
  <div>
    <app-header />
    <div class="container mt-12 pt-12">
      <div v-if="validateAuthorPost" class="btns_container text-center my-8">
        <v-btn class="mx-8 deep-orange darken-3 white--text" @click="toggleEditable">Editar Post</v-btn>
        <v-btn class="mx-8 deep-orange darken-3 white--text" @click="deletePost">Borrar post</v-btn>
      </div>
      <v-card width="50%" class="text-center pa-5 mt-5">
        <p
          v-if="editable"
          class="deep-orange--text text--darken-3 mb-0"
        >Puedes editar el título haciendo click en él</p>
        <h2 class="title display-2" :contenteditable="editable">{{postData.title}}</h2>
        <p class="overline">({{postData.date}})</p>
        <p
          v-if="editable"
          class="deep-orange--text text--darken-3 mb-0"
        >Puedes editar el texto haciendo click en él</p>
        <p class="text headline mt-0" :contenteditable="editable">{{postData.text}}</p>
        <h4 class="subtitle-1 mb-5">
          Escrito por: {{postData.username}} /
          <span class="nickname">{{postData.nickname}}</span>
        </h4>
        <v-btn v-if="editable" class="teal white--text" @click="editPost">Enviar post editado</v-btn>
        <app-good-message v-if='isSent' :OKmessage='messageSent' />
        <app-error-message v-if='isInvalid' :errorMessage='errorMessage' />
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
import AppGoodMessage from './AppGoodMessage'
import AppErrorMessage from './AppErrorMessage'
const token = localStorage.getItem('token')
export default {
  name: 'app-post-detail',
  data () {
    return {
      postData: {},
      postId: null,
      editable: false,
      validateAuthorPost: false,
      validateAuthorComment: false,
      delete: false,
      message: 'Comentarios',
      element: 'comentario',
      messageComments: '',
      isSent: false,
      isInvalid: false,
      messageSent: 'Tu post ha sido editado =)',
      errorMessage: 'Ups! ha habido un error, asegúrate de haber rellenado todos los campos'
    }
  },
  components: {
    AppHeader,
    AppPosts,
    AppNewPost,
    AppGoodMessage,
    AppErrorMessage
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
      const titleEl = document.querySelector('.title')
      const textEl = document.querySelector('.text')
      const titleValue = titleEl.textContent
      const textValue = textEl.textContent
      await axios.put(
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
        .then((response) => {
          this.isSent = true
          location.reload()
        })
        .catch((error) => {
          console.log(error)
          this.isInvalid = true
        })
    },
    deletePost () {
      if (this.validateAuthorPost) {
        axios
          .delete('https://localhost:3443/blog/posts/' + this.postId, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then(res => {
            document.location.href = '/'
          })
      }
    },
    deleteComment (e) {
      const trigger = e.currentTarget.parentElement
      const commentId = trigger.querySelector('.hidden').textContent
      if (this.validateAuthorPost) {
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
      }
    },
    toggleEditable () {
      if (this.validateAuthorPost) {
        this.editable = !this.editable
      }
    },
    async validationAuthorPost () {
      let validated
      const role = localStorage.getItem('role')
      const username = localStorage.getItem('username')
      const usernamePost = await this.postData.username
      if (username === usernamePost || role === 'admin') {
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

<style scoped >
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
