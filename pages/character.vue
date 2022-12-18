<template>
  <div>
    <NuxtLink to='/'>Go back</NuxtLink>
    <br/>
    {{ characterName }}
    <br/>
    <CharacterImage v-if="characterAttributes.image" :src='characterAttributes.image'/>
    <br/>
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
    <div v-if="!characterAttributes.house && !characterAttributes.wands && !characterAttributes.boggart">
      <p>We can't make any game because we haven't got to many info :( </p>
      <b-button
        v-if="!bloodData"
        @click="getRandomData"
      >
        Get random data
      </b-button>
      <div v-if="bloodData">
        <p>
          <span v-if="characterAttributes.gender === 'Female'">Her</span>
          <span v-else-if="characterAttributes.gender === 'Male'">His</span>
          <span v-else>Their</span> blood data is: {{ bloodData }}
        </p>
      </div>
      <NuxtLink to='/'>Try another character</NuxtLink>
    </div>
    <p v-if="questionsPassed !== -1">
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
      <div v-else>
        <NuxtLink to='/'>See another character</NuxtLink>
        <NuxtLink to='/resume'>See character resume</NuxtLink>
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
      if (this.boggart !== '' && this.boggart === this.characterAttributes.boggart) {
        questionPassed ++
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
      if (this.house !== '' && this.house === this.characterAttributes.house) {
        questionPassed ++
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
      else {
        this.$store.dispatch('user/setQuestionsPassed', questionPassed)
      }
    },
    getRandomData () {
      this.bloodData = this.characterAttributes.blood_status
    }
  }
}
</script>
