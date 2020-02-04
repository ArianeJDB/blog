<template>
<p class='error_valid text-center mt-0 subtitle-2 deep-orange--text text--darken-3'>{{errorMessage}}</p>
</template>

<script>

export default {
  name: 'app-message-error',
  props: {
    errorMessage: String
  }
}
</script>

<style scoped >
</style>
