import { CHARACTERS_ENDPOINT } from '@/constants/endpoints'

export default {
  methods: {
    getCharactersBySlug (slug) {
      return fetch(`${CHARACTERS_ENDPOINT}/${slug}`)
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
