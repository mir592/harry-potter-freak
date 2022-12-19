<template>
  <div>
    <h2>All the data from the user that you choose:</h2>
    <div>
      <div
        v-for="(d, key, index) in data"
        :key="index"
      >
        <div v-if="d">
          <div
            v-if="typeof(d) === 'string'"
            class="p-2"
          >
            <span class="text-capitalize">{{ normalizeKey(key) }}</span>: {{ d }}
          </div>
          <div v-else>
            <span class="text-capitalize p-2">{{ normalizeKey(key) }}</span>:
            <ul
              v-for="(s, index) in  d"
              :key="index"
            >
              <li>{{ s }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink class="btn btn-light" to='/'>Start again</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GetCharacters from '../mixins/api/getCharacters'
import GetCharactersByName from '../mixins/api/getCharactersByName'


export default {
  name: 'ResumePage',
  mixins: [GetCharacters, GetCharactersByName],
  data() {
    return {
      characters: []
    }
  },
  computed: {
    ...mapState('character', ['data'])
  },
  methods: {
    normalizeKey (string) {
      return string.replaceAll('_', ' ')
    }
  }
}
</script>
