<template>
  <div class="m-2 m-md-5">
    <b-form-input
      v-model="text"
      placeholder='Hey muggle, which character are you looking for?'
      @input="onInput($event)"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: ''
      }
    },
    methods: {
      onInput (value) {
        this.$emit('on-input-written', value)
      }
    }
  }
</script>