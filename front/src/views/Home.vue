<template>
  <div class="home">
    <app-header />
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
        console.log('hola', res.data.posts)
      })
  },
  methods: {
    validateAuth () {
      let auth
      console.log(localStorage.getItem('token'))
      if (localStorage.getItem('token') !== null) {
        console.log('ESTA AUTH')
        auth = true
      } else {
        console.log('NOPPPP')
        auth = false
      }
      this.isAuth = auth
      return auth
    }
  }
}
</script>

<style scoped lang='scss'>
textarea{
  margin-top: 50px;
}
</style>
