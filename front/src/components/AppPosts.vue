<template>
  <main>
    <h2>Recent Posts:</h2>
    <ul class='posts_list'>
      <app-post-preview
        v-for='(post, index) in posts'
        :key='index'
        :post='post'
        :goToDetail='goToDetail'
      />
    </ul>
  </main>
</template>

<script>
import AppPostPreview from '../components/AppPostPreview'
export default {
  name: 'app-posts',
  props: {
    posts: null
  },
  components: {
    AppPostPreview
  },
  methods: {
    goToDetail (e) {
      const trigger = e.currentTarget
      console.log('click aqui', trigger)
    }
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
