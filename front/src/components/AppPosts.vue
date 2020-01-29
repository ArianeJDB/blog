<template>
  <main class='app-posts'>
    <div v-if="element === 'comentario'">
    </div>
    <h2 class='text-center my-7 headline deep-orange--text text--darken-3'>{{message}}:</h2>
    <ul class='posts_list'>
      <app-post-preview
        v-for='(post, index) in posts'
        :key='index'
        :id='index'
        :post='post'
        :postId='postId'
        :element='element'
        :messageComments='messageComments'
        :validationAuthorPost='validationAuthorPost'
        :validationAuthorComment='validationAuthorComment'
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
    validationAuthorPost: Boolean,
    deleteComment: Function,
    validationAuthorComment: Boolean
  },
  components: {
    AppPostPreview
  }
}
</script>

<style scoped>
.posts_list{
      text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
