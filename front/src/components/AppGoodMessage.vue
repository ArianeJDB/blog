<template>
<p class='sent_good text-center mt-0 subtitle-2 teal--text'>{{OKMessage}}</p>
</template>

<script>

export default {
  name: 'app-message-error',
  data () {
    return {
    }
  },
  props: {
    OKMessage: String
  },
  methods: {
  }
}
</script>

<style scoped >
</style>
