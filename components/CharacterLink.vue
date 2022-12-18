<template>
  <NuxtLink :to="{ path: 'character', query: { slug: characterSlug, name: characterName } }">{{characterName}}</NuxtLink>
</template>

<script>
export default {
  name: 'CharacterLink',
  props: {
    characterName: {
      type: String,
      required: true
    },
    characterSlug: {
      type: String,
      required: true
    }
  }
}
</script>
