<template>
  <div>
    <li class='preview_item'>
       <router-link :to="'/postdetail/'+post._id">Ver comentarios</router-link>
      <span class='hidden'>{{post._id}}</span>
      <h4>{{post.title}}</h4>
      <p>{{post.comment}}</p>
      <span>{{post.date}}</span>
      <h6>
        Escrito por: {{post.username}} /
        <span class='nickname'>{{post.nickname}}</span>
      </h6>
    </li>
  </div>
</template>

<script>
export default {
  name: 'post-review',
  props: {
    post: Object,
    goToDetail: Function,
    id: Number,
    postId: null
  },
  methods: {}
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.preview_item {
  border: solid black 1px;
  width: 300px;
  margin: 10px;
  list-style-type: none;
}
.nickname {
  font-style: italic;
  font-weight: 100;
}
.hidden {
  display: none;
}
</style>
