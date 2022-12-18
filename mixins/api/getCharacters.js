import { CHARACTERS_ENDPOINT } from '@/constants/endpoints'

export default {
  methods: {
    getCharacters () {
      return fetch(CHARACTERS_ENDPOINT)
        .then((res) => res.json())
        .then((res) => res.data)
        .catch(() => {
          return {
            hasError: true,
          };
        });
    }
  }
}
