<template>
  <div class="home">
    <app-header :goHome='goHome' />
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
      isAuth: Boolean
    }
  },
  components: {
    AppHeader,
    AppPosts,
    AppNewPost
  },
  mounted () {
    this.validateAuth()
    axios
      .get('https://localhost:3443/blog/posts')
      .then(res => {
        this.posts = res.data.posts
      })
  },
  methods: {
    validateAuth () {
      let auth
      if (localStorage.getItem('token') !== null) {
        console.log('ESTA AUTH')
        auth = true
      } else {
        console.log('No está auth')
        auth = false
      }
      this.isAuth = auth
      return auth
    },
    goHome () {
      window.location = '/'
    }
  }
}
</script>

<style scoped lang='scss'>
textarea{
  margin-top: 50px;
}
</style>
