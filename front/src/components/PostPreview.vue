<template>
  <div class='preview_container'>
    {{post.title}}
    {{post.username}}
    {{post.nickname}}
  </div>
</template>

<script>
export default {
  name: 'post-review',
  props: {
    post: Object
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.preview_container{
    border: solid black 1px;
    width: 300px;
}
</style>
