<template>
  <div class="home">
    <app-header />
    <div>
      <textarea name="Nuevo post" id="a" cols="80" rows="10"></textarea>
      <button>Send</button>
    </div>
    <app-posts :posts='posts'/>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import AppPosts from '@/components/AppPosts.vue'

export default {
  name: 'Home',
  data () {
    return {
      posts: Array
    }
  },
  components: {
    AppHeader,
    AppPosts
  },
  methods: {
    // getPosts: function () {
    //   const url = 'https://localhost:3443/blog/posts'

    // }
  },
  mounted () {
    axios
      .get('https://localhost:3443/blog/posts')
      .then(res => { this.posts = res.data.posts })
  }
}
</script>

<style scoped lang='scss'>
textarea{
  margin-top: 50px;
}
</style>
