<template>
  <div>
    <div
      v-if="data.name"
      class="p-5"
    >
      Your last search was: {{data.name}}
    </div>
    <FindCharacter
      @on-input-written="onFindCharacter"
    />
    <div
      v-for="(item, index) in characters"
      :key="index"
    >
      <CharacterLink
        :characterName="item.attributes.name"
        :characterSlug="item.attributes.slug"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GetCharacters from '../mixins/api/getCharacters'
import GetCharactersByName from '../mixins/api/getCharactersByName'


export default {
  name: 'IndexPage',
  mixins: [GetCharacters, GetCharactersByName],
  data() {
    return {
      characters: []
    }
  },
  mounted () {
    this.$store.dispatch('user/resetUserData')
  },
  computed: {
    ...mapState('character', ['data'])
  },
  methods: {
    onFindCharacter (ev) {
      if (ev.length > 1) {
        this.getCharactersByName(ev).then(d => {
          this.characters = d
        })
      } else {
        this.characters = []
      }
    }
  }
}
</script>

