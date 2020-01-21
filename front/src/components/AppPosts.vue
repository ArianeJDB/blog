<template>
  <div class="s">
   Recent Posts:
    <post-preview v-for="(post, index) in posts" :key="index" :post='post' />
  </div>
</template>

<script>
import PostPreview from '@/components/PostPreview.vue'
export default {
  name: 'app-posts',
  props: {
    posts: Array
  },
  components: {
    PostPreview
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
