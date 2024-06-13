<template>
    <aside class="flex justify-between py-8 px-2 ps-8 flex-col h-screen fixed border-r-2 border-gray-400 w-72">
        <img src="/logo-no-background.png" alt="logo" class="w-[160px] cursor-pointer" @click="goToHome">

        <div class="util-icons text-lg flex items-start gap-12 flex-col text-gray-400">
            <div class="icon-group flex gap-6 items-center hover:text-gray-200 cursor-pointer hover:scale-105">
                <i class="fa-solid fa-bell text-theme text-3xl"></i>
                <span>Notifications</span>
            </div>
            <div class="icon-group flex gap-6 items-center hover:text-gray-200 cursor-pointer hover:scale-105">
                <i class="fa-solid fa-message text-theme text-3xl"></i>
                <span>Messages</span>
            </div>
            <div class="icon-group flex gap-6 items-center hover:text-gray-200 cursor-pointer hover:scale-105">
                <i class="fa-solid fa-gear text-theme text-3xl"></i>
                <span>Settings</span>
            </div>
            <div class="flex items-center gap-6 hover:text-gray-200 cursor-pointer hover:scale-105">
                <img class="w-[35px] height-[35px]  rounded-full" :src="store?.user?.profilePic" alt="user photo"
                    v-if="store?.user?.profilePic">
                <div class="w-8 h-8 rounded-full text-lg uppercase font-bold flex items-center justify-center text-input bg-theme"
                    v-else>
                    {{ store?.user?.username[0] }}
                </div>
                <span>Profile</span>
            </div>
        </div>
        <div class="icon-group flex gap-6 items-center text-gray-400 hover:text-gray-200 cursor-pointer hover:scale-105"
            @click="logOut">
            <i class="fa-solid fa-right-from-bracket text-theme text-3xl"></i>
            <span class=" text-lg">Sign Out</span>
        </div>
    </aside>
</template>

<script setup>
import router from '@/router';
import { useApiStore } from '@/stores/apiStore';
import { ref } from 'vue';
const store = useApiStore();
const goToHome = () => {
    router.push({ name: 'home' });
}


const logOut = () => {
    store.user = undefined;
    store.authToken = '';
    localStorage.removeItem('authToken');
    localStorage.removeItem('boolBookUser');
    router.push({ name: 'login' })
}

</script>

<style scoped></style>