<template>
  <div class="d-flex flex-column align-items-center">
    <NuxtLink class="btn btn-info mt-5" to='/'>Go back</NuxtLink>
    <CharacterCard
      :src='characterAttributes.image ? characterAttributes.image : ``'
      :name="characterName"
      class="mt-5"
    />
    <br/>
    <div class="d-flex flex-column flex-md-row">
      <div v-if="characterAttributes.house">
        <p>
          Do you know the house where 
          <span v-if="characterAttributes.gender === 'Female'">she</span>
          <span v-else-if="characterAttributes.gender === 'Male'">he</span>
          <span v-else>it</span>
          stay?
        </p>
        <b-form-input
          v-model="house"
        />
      </div>
      <div v-if="characterAttributes.wands">
        <p>
          Do you know how many wands 
          <span v-if="characterAttributes.gender === 'Female'">she</span>
          <span v-else-if="characterAttributes.gender === 'Male'">he</span>
          <span v-else>it</span>
          had?
        </p>
        <b-form-input
          v-model="wands"
        />
      </div>
      <div v-if="characterAttributes.boggart">
        <p>
          What about
          <span v-if="characterAttributes.gender === 'Female'">her</span>
          <span v-else-if="characterAttributes.gender === 'Male'">his</span>
          <span v-else>it</span>
          boggart?
        </p>
        <b-form-input
          v-model="boggart"
        />
      </div>
    </div>
    <div
      v-if="!characterAttributes.house && !characterAttributes.wands && !characterAttributes.boggart"
    >
      <p class="alert alert-dark">We can't make any game because we haven't got to many info :( </p>
      <b-button
        v-if="characterAttributes.blood_status && !bloodData"
        @click="getRandomData"
      >
        Get random data
      </b-button>
      <div v-if="bloodData">
        <p class="alert alert-primary">
          <span v-if="characterAttributes.gender === 'Female'">Her</span>
          <span v-else-if="characterAttributes.gender === 'Male'">His</span>
          <span v-else>Their</span> blood data is: {{ bloodData }}
        </p>
      </div>
      <NuxtLink class="btn btn-light" to='/'>Try another character</NuxtLink>
      <NuxtLink class="btn btn-light" to='/resume'>See character resume</NuxtLink>
    </div>
    <p
      v-if="questionsPassed !== -1"
      :class="['mt-2', {
        'alert alert-success': questionsPassed > 2,
        'alert alert-warning': questionsPassed === 2,
        'alert alert-danger': questionsPassed <= 1,
      }]"
    >
      You got {{ questionsPassed }} question good
    </p>
    <div v-if="!(!characterAttributes.house && !characterAttributes.wands && !characterAttributes.boggart)">
      <div
        v-if="questionsPassed === -1"
      >
        <b-button
          @click="checkAnswers"
        >
          Check your answers
        </b-button>
      </div>
      <div
        v-else
        class="d-flex justify-content-between"
      >
        <NuxtLink class="btn btn-light" to='/'>See another character</NuxtLink>
        <NuxtLink class="btn btn-light" to='/resume'>See character resume</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import GetCharacters from '../mixins/api/getCharacters'
import GetCharactersBySlug from '../mixins/api/getCharactersBySlug'


export default {
  name: 'CharacterPage',
  mixins: [GetCharacters, GetCharactersBySlug],
  data() {
    return {
      characterSlug: this.$router.currentRoute.query.slug,
      characterName: this.$router.currentRoute.query.name,
      characterList: [],
      characterAttributes: {},
      characterAttributes1: {},
      wands: '',
      boggart: '',
      house: '',
      bloodData: ''
    }
  },
  computed: {
    ...mapState('user', ['questionsPassed']),
    ...mapGetters({
      getQuestionsPassed: 'user/getQuestionsPassed'
    }),
  },
  mounted () {
    this.$store.dispatch('user/setCharacterSelected', this.characterName)
    this.getCharactersBySlug(this.characterSlug).then(d => {
      this.characterAttributes = d.attributes
      this.$store.dispatch('character/setAllCharacterData', d.attributes)
    })
  },
  methods: {
    checkAnswers () {
      let questionPassed = 0
      if (this.wands !== '' && parseInt(this.wands) === this.characterAttributes.wands.length) {
        questionPassed ++
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
      if (this.boggart !== '' && this.normalizeString(this.boggart) === this.normalizeString(this.characterAttributes.boggart)) {
        questionPassed ++
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
      if (this.house !== '' && this.normalizeString(this.house) === this.normalizeString(this.characterAttributes.house)) {
        questionPassed ++
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
      else {
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
    },
    normalizeString (str) {
      return str.toUpperCase()
    },
    getRandomData () {
      this.bloodData = this.characterAttributes.blood_status
    }
  }
}
</script>
