<template>
  <div class="card" style="width: 18rem;">
    <img v-if="src" :src="src" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">{{ name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    src: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
