<template>
  <div class="home">
    <app-header />
    <app-new-post v-if='isAuth' :element='element' />
    <app-posts :posts='posts' :postId='postId' :message='message' :element='element' :messageComments='messageComments' :isAuth='isAuth'/>
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
      isAuth: false
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
        console.log('hola', res.data.posts)
      })
    this.validateAuth()
  },
  methods: {
    validateAuth () {
      let isAuth
      if (localStorage.getItem('token')) {
        isAuth = true
      }
      this.isAuth = isAuth
    }
  }
}
</script>

<style scoped lang='scss'>
textarea{
  margin-top: 50px;
}
</style>
