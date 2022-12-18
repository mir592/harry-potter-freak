<template>
  <img :src="src">
</template>

<script>
export default {
  name: 'CharacterImage',
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>
