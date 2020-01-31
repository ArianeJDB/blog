<template>
  <li v-if='post !== undefined' class="preview_item ma-5">
    <v-card class="text-center pa-5">
      <span class="hidden">{{post._id}}</span>
      <h2 class='display-1'>{{post.title}}</h2>
      <p>{{post.comment}}</p>
      <h4 class='subtitle-1'>Escrito por: {{post.username}} / <span class="nickname">{{post.nickname}}</span>
      </h4>
      <p class='overline'>({{post.date}})</p>
      <v-btn v-if="validationAuthorPost" @click="deleteComment" class='teal white--text'>Borrar comentario</v-btn>
      <!-- <button v-if="validationAuthorComment">Editar comentario</button> -->
      <v-btn v-if='post.title !== undefined' class='deep-orange darken-3'><router-link class='link  white--text' :to="'/postdetail/'+post._id">{{messageComments}}</router-link></v-btn>
  </v-card>
  </li>
</template>

<script>
export default {
  name: 'app-post-preview',
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
<style scoped>
.preview_item {
  width: 40%;
  // border: solid black 1px;
  // width: 300px;
  // margin: 10px;
  list-style-type: none;
}
.nickname {
  font-style: italic;
  font-weight: 100;
}
.hidden {
  display: none;
}
.link{
  text-decoration: none;
  cursor: pointer;
}
</style>
