<template>
  <div>
    <div>
      <h3>{{postData.title}}</h3>
      <p>{{postData.text}}</p>
      <p>Escrito por: {{postData.username}} / <span class='nickname'>{{postData.nickname}}</span></p>
      <h4>Comentarios:</h4>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'post-detail',
  data () {
    return {
      postData: Object
    }
  },
  props: {},
  methods: {
    getOnePost (idParam) {
      axios
        .get('https://localhost:3443/blog/posts/' + idParam)
        .then(res => {
          this.postData = res.data.post
        })
    }
  },
  async created () {
    let idParam = this.$route.params.id
    await this.getOnePost(idParam)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
