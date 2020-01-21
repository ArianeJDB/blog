<template>
  <div>
    <div>
      <p>Título de tu post</p>
      <input type='text' />
      Contenido
      <textarea name='Nuevo post' id='a' cols='80' rows='10'></textarea>
      <button>Send</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-new-post',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
