<template>
  <div class="home">
    <app-header />
    <app-new-post />
    <app-posts :posts='posts' :goToDetail='goToDetail' :postId='postId' />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import AppPosts from '@/components/AppPosts.vue'
import AppNewPost from '../components/AppNewPost.vue'
export default {
  name: 'Home',
  data () {
    return {
      posts: Array,
      postId: String
    }
  },
  components: {
    AppHeader,
    AppPosts,
    AppNewPost
  },
  methods: {
    goToDetail (e, postId) {
      const id = e.currentTarget.firstChild.innerHTML
      this.posts.forEach(item => {
        if (item._id === id) {
          console.log('item', typeof item)
          // this.postDetail = item
          this.postId = item._id
        }
      })
      // await this.getOnePost()
      // await this.$router.push({ postDetail: 'this.postDetail' })
    }
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
