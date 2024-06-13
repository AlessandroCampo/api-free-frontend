<template>
    <div class="post-create class bg-input p-8 rounded-xl">
        <div class="upper flex items-start gap-8 h-[130px] pb-6">
            <img :src="store.user?.profilePic" alt="profile-pic"
                class="profile-pic rounded-full w-[50px] h-[50px] object-cover  object-center aspect-square">
            <textarea cols="30" rows="10" class="bg-transparent w-full h-full  text-lg p-3 py-0 text-gray-400 textarea"
                placeholder="What's on your mind?" v-model="newPostContent"></textarea>
        </div>
        <!-- Image Preview -->
        <div v-if="imagePreview" class="image-preview mt-4 mb-8">
            <img :src="imagePreview" alt="Image Preview" class="w-full max-h-[200px] object-cover rounded-lg" />
        </div>
        <div class="lower flex items-center justify-between">
            <div class="icons flex items-center gap-6 text-2xl text-theme">
                <label for="post_pic">
                    <i class="fa-solid fa-image text-2xl"></i>
                </label>

                <i class="fa-solid fa-video"></i>
                <i class="fa-solid fa-music"></i>
                <input type="file" id="post_pic" class="bg-transparent w-full hidden" placeholder="Confirm Password"
                    accept=".png, .jpg, .jpeg" @change="handleFileUpload">
            </div>
            <button
                class="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-3xl transition duration-300"
                @click="publishPost">
                Publish
            </button>
        </div>

    </div>
</template>

<script setup>
import { useApiStore } from '@/stores/apiStore';
import axios from 'axios';
import { ref } from 'vue';
const store = useApiStore();
let newPostContent = ref('');
let newPostPic = undefined;
const imagePreview = ref(null);


const handleFileUpload = (event) => {
    newPostPic = event.target.files[0];
    if (newPostPic) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(newPostPic);
    }
};

const validatePost = () => {
    if (!newPostContent.value || newPostContent.value.length > 250) {
        console.log('validation  error')
        return false;
    }
    return true
};

const publishPost = async () => {
    if (!validatePost()) {
        console.log('error in validation');
        return;
    }
    if (!store.authToken) {
        console.log('error in auth');
        return;
    }

    const data = {
        content: newPostContent.value,
        image: newPostPic
    };

    const formData = new FormData();
    formData.append('content', newPostContent.value);
    if (newPostPic) {
        formData.append('image', newPostPic);
    }

    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };

    try {
        const response = await axios.post(store.serverUrl + 'posts', formData, { headers });
        if (response) {
            newPostContent.value = '';
            imagePreview.value = null;
            newPostPic = undefined;
            console.log(store.user)
            const newPostWithUser = {
                ...response.data.newPost,
                user: {
                    username: store.user.username,
                    avatar: store.user.profilePic
                },
                likes: [],
                comments: []
            }
            console.log(newPostWithUser)
            store.homePosts.unshift(newPostWithUser);
        }
    } catch (err) {
        console.error(err);
    }
};



</script>



<style lang="scss" scoped></style>