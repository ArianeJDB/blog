<template>
  <div class="home">
    <app-header :goHome='goHome' :username='usernameAuth' :nickname='nicknameAuth' />
    <app-new-post
      :element='element'
      :isAuth='isAuth'
    />
    <app-posts
      :posts='posts'
      :postId='postId'
      :message='message'
      :element='element'
      :messageComments='messageComments'
    />
  </div>
</template>

<script>
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import AppPosts from '@/components/AppPosts.vue'
import AppNewPost from '../components/AppNewPost.vue'
export default {
  name: 'Home',
  data () {
    return {
      posts: Array,
      postId: String,
      message: 'Posts más recientes',
      element: 'post',
      messageComments: 'Ver comentarios',
      isAuth: Boolean,
      usernameAuth: String,
      nicknameAuth: String
    }
  },
  components: {
    AppHeader,
    AppPosts,
    AppNewPost
  },
  mounted () {
    axios
      .get('https://localhost:3443/blog/posts')
      .then(res => {
        this.posts = res.data.posts
      })
    this.validateAuth()
    this.whoIsAuth()
  },
  methods: {
    validateAuth () {
      let auth
      if (localStorage.getItem('token') !== null) {
        auth = true
      } else {
        console.log('No está auth')
        auth = false
      }
      this.isAuth = auth
      return this.isAuth
    },
    whoIsAuth () {
      if (localStorage.getItem('username') !== null) {
        this.usernameAuth = localStorage.getItem('username')
        this.nicknameAuth = localStorage.getItem('nickname')
      } else {
        this.usernameAuth = 'desconocido'
      }
    },
    goHome () {
      window.location = '/'
    }
  }
}
</script>

<style scoped >
textarea{
  margin-top: 50px;
}
</style>
