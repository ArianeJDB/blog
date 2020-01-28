<template>
  <div>
    <li class='preview_item'>
       <router-link :to="'/postdetail/'+post._id">
       {{messageComments}}</router-link>
      <span class='hidden'>{{post._id}}</span>
      <h4>{{post.title}}</h4>
      <p>{{post.comment}}</p>
      <span>{{post.date}}</span>
      <h6>
        Escrito por: {{post.username}} /
        <span class='nickname'>{{post.nickname}}</span>
      </h6>
      <button v-if='validationAuthorPost' @click='deleteComment'>Borrar comentario</button>
    </li>
  </div>
</template>

<script>
export default {
  name: 'post-review',
  props: {
    post: Object,
    id: Number,
    postId: null,
    element: String,
    messageComments: String,
    validationAuthorComment: Boolean,
    validationAuthorPost: Boolean,
    deleteComment: Function
  },
  methods: {}
}
</script>
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
