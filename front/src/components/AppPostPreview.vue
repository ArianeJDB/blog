<template>
  <li class='preview_item' @click='goToDetail'>
    <h4>{{post.title}}</h4>
    <h6>Escrito por: {{post.username}} / <span>{{post.nickname}}</span></h6>
    <router-link :to="'/postdetail'">
    MAS
    </router-link>
      <!-- LA RUTA CAMBIA CON EL ID -->
  </li>
</template>

<script>
export default {
  name: 'post-review',
  props: {
    post: Object,
    goToDetail: Function
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.preview_item {
    border: solid black 1px;
    width: 300px;
    margin: 10px;
    list-style-type: none;
    cursor: pointer;
}
span {
    font-style: italic;
    font-weight: 100;
}
</style>
