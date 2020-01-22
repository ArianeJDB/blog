<template>
  <div class="home">
    <app-header />
    <app-new-post />
    <app-posts :posts='posts' :postId='postId' :message='message' />
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
      message: 'Posts más recientes'
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
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
textarea{
  margin-top: 50px;
}
</style>
