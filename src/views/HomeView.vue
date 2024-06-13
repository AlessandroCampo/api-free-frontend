<template class="">

  <Sidebar v-if="store.user"></Sidebar>
  <main class="py-8 h-full ml-72" v-if="store.user">
    <div class="searchbar flex  items-center gap-3 bg-input rounded-3xl ps-6 pe-6 py-3 w-[350px] mx-auto mb-12">
      <i class="fa-solid fa-magnifying-glass text-white font-xl"></i>
      <input type="search" placeholder="Start typing your search" class="bg-transparent w-full text-lg">
    </div>
    <CreatePostVue class="mx-auto w-[450px]"></CreatePostVue>
    <PostVue class="mx-auto w-[450px] my-12" v-for="post in store.homePosts" :key="post.id" :propPost="post"></PostVue>
  </main>



</template>

<script setup>
import CreatePostVue from "@/components/CreatePost.vue";
import Sidebar from "@/components/Sidebar.vue";
import PostVue from "@/components/Post.vue";
import { onMounted, ref } from "vue";
import { useApiStore } from "@/stores/apiStore";
import axios from "axios";
const store = useApiStore();


onMounted(async () => {
  try {
    const posts = await axios.get(store.serverUrl + "posts");
    if (posts) {
      console.log(posts)
      store.homePosts = posts.data.allPosts;
    }
  } catch (err) {
    console.error(err);
  }
});



</script>

<style></style>
