<template>
  <router-view class="h-full" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue';
import { useApiStore } from './stores/apiStore';
import router from './router';
const store = useApiStore();


onBeforeMount(() => {
  const authToken = localStorage.getItem('authToken');
  const user = localStorage.getItem('boolBookUser');

  if (authToken) {
    store.authToken = authToken;
  }
  if (user) {
    store.user = JSON.parse(user);
  }

});
</script>

<style scoped>
/* Add your scoped styles here */
</style>
