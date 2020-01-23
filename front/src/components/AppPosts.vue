<template>
  <main>
    <div v-if="element === 'comentario'">
    <!-- <button>Añadir comentario</button>
    <textarea name="comment" id="" cols="30" rows="10" v-model='newComment'></textarea> -->
    <app-new-post :element='element' :isAuth='isAuth' />
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
        :newComment='newComment'
      />
    </ul>
  </main>
</template>

<script>
import AppPostPreview from '../components/AppPostPreview'
import AppNewPost from '../components/AppNewPost'
export default {
  name: 'app-posts',
  data () {
    return {
      newComment: null
    }
  },
  props: {
    posts: null,
    goToDetail: Function,
    postId: null,
    message: String,
    element: String,
    messageComments: String,
    validationRole: Boolean,
    isAuth: Boolean
  },
  components: {
    AppPostPreview,
    AppNewPost
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
