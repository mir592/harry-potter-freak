import { CHARACTERS_ENDPOINT } from '@/constants/endpoints'

export default {
  methods: {
    getCharactersByName (name) {
      return fetch(`${CHARACTERS_ENDPOINT}?filter[name_cont_any]=${name}`)
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
