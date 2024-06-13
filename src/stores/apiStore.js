// stores/counter.js
import { defineStore } from 'pinia'

export const useApiStore = defineStore('apiStore', {
  state: () => {
    return {
      serverUrl: 'http://localhost:3000/',
      authToken: '',
      user: undefined,
      homePosts: []

    }
  },
  actions: {
    increment() {
      this.count++
    },
  },
})