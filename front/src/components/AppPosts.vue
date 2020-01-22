<template>
  <main>
    <h2>{{message}}</h2>
    <ul class='posts_list'>
      <app-post-preview
        v-for='(post, index) in posts'
        :key='index'
        :id='index'
        :post='post'
        :postId='postId'
      />
    </ul>
  </main>
</template>

<script>
import AppPostPreview from '../components/AppPostPreview'
export default {
  name: 'app-posts',
  props: {
    posts: null,
    goToDetail: Function,
    postId: null,
    message: String
  },
  components: {
    AppPostPreview
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.posts_list {
  display: grid;
  grid-template-columns: 1fr, 1fr, 1fr;
}
</style>
