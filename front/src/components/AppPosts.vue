<template>
  <main>
    <div v-if="element === 'comentario'">
    </div>
    <h2>{{message}}</h2>
    <ul class='posts_list'>
      <app-post-preview
        v-for='(post, index) in posts'
        :key='index'
        :id='index'
        :post='post'
        :postId='postId'
        :element='element'
        :messageComments='messageComments'
        :validationRole='validationRole'
        :deleteComment='deleteComment'
      />
    </ul>
  </main>
</template>

<script>
import AppPostPreview from '../components/AppPostPreview'
export default {
  name: 'app-posts',
  data () {
    return {}
  },
  props: {
    posts: null,
    goToDetail: Function,
    postId: null,
    message: String,
    element: String,
    messageComments: String,
    validationRole: Boolean,
    deleteComment: Function
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
