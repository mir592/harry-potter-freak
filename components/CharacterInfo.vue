<template>
  <div>
    <NuxtLink :to="{ path: 'character', query: { slug: slug } }">
      <p>{{ name }}</p>
      <CharacterImage v-if="image" :src="image" />
      <p>{{ specie }}</p>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'CharacterInfo',
  props: {
    name: {
      type: String,
      required: true
    },
    specie: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      required: true
    }
  }
}
</script>
