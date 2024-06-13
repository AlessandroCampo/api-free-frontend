<template>
    <div class="post-container flex flex-col text-gray-400 gap-6 bg-input  rounded-xl">
        <ConfirmationModal v-if="showModal" :config="modalConfig" @on-keep="showModal = false" @on-confirm="deletePost">
        </ConfirmationModal>
        <EditModal v-if="showEditModal" :oldValue="propPost?.content" @on-keep="showEditModal = false"
            @on-confirm="editPost">
        </EditModal>
        <div class="upper flex gap-4 items-start p-6">
            <img :src="propPost.user.avatar" alt="profile-pic"
                class="profile-pic rounded-full w-[50px] h-[50px] aspect-square" v-if="propPost.user?.avatar">
            <div v-else
                class="rounded-full w-[50px] h-[50px] aspect-square uppercase font-semibold flex items-center justify-center bg-theme text-input text-3xl">
                {{ propPost.user?.username[0] }}</div>
            <div class="author-infos">
                <div class="font-bold"> {{ propPost.user?.username }} </div>
                <div>{{ utilStore.formatTimestamp(propPost?.updatedAt) }} <span
                        v-show="propPost.updatedAt > propPost.createdAt" class="font-semibold">(Edited)</span>
                </div>
            </div>
            <Dropdown class="ms-auto" :options="postOptions" v-if="props.propPost.userId === store.user.id"></Dropdown>

        </div>
        <p class="px-6">
            {{ propPost.content }}
        </p>
        <img :src="propPost.image" alt="post-image" class="w-full h-[320px] object-cover object-center"
            v-if="propPost.image">
        <div class="bottom flex gap-12 px-6">
            <div class="icons flex items-center gap-6 text-lg text-theme">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-heart" @click="likePost"
                        :class="postLikedByTheUser ? 'text-red-600' : ''"></i>
                    <span class="text-lg font-semibold">
                        {{ propPost.likes.length }}
                    </span>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-comment" @click="() => { showComments = !showComments }"></i>
                    <span class="text-lg font-semibold">
                        {{ propPost.comments.length }}
                    </span>
                </div>
            </div>

        </div>
        <div class="comment w-full flex items-center gap-3 ms-[-12px] px-6  pb-6">
            <input type="text" placeholder="Write your commment here"
                class="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0 ps-3"
                v-model="commentContent">
            <i class="fa-solid fa-paper-plane text-theme text-lg" @click="commentPost"></i>
        </div>
        <div v-if="commentErros.length > 0" class="error-message text-red-500">
            {{ commentErros[0] }}
        </div>
        <div class="comments" v-show="showComments && propPost.comments.length > 0">
            <CommentVue v-for="comment in propPost.comments" :key="comment.id" :propComment="comment"></CommentVue>
        </div>
    </div>

</template>

<script setup>

import { useUtilStore } from '@/stores/utilStore.js';
import { useApiStore } from '@/stores/apiStore';
import { onMounted, ref, computed } from 'vue';
import CommentVue from '@/components/Comment.vue';
import Dropdown from '@/components/Dropdown.vue';
import ConfirmationModal from './ConfirmationModal.vue';
import EditModal from './EditModal.vue';
import axios from 'axios';



const utilStore = useUtilStore();
const store = useApiStore();
const showComments = ref(false);
const commentContent = ref('');
const commentErros = ref([]);
const showModal = ref(false);
const showEditModal = ref(false);
const modalConfig = ref({
    title: '',
    p: '',
    option1label: '',
    option2label: ''
})






const props = defineProps({
    propPost: {
        type: Object,
        required: true
    }
});

const postOptions = ref([
    {
        label: 'Edit',
        icon: 'fa-pen-to-square',
        cb: () => { showEditModal.value = true }
    },
    {
        label: 'Delete',
        icon: 'fa-trash',
        cb: () => {
            modalConfig.value = {
                title: 'Are you sure you want to delete your post?',
                p: "If you delte this post, you won't be able to recover it",
                option1label: "Keep",
                option2label: "Delete"
            }

            showModal.value = true
            return
        }
    },
])


const postLikedByTheUser = computed(() => {
    return props?.propPost?.likes.find(l => l.userId == store.user.id)
})


onMounted(() => {
    console.log(props.propPost.likes, store.user);
})

const deletePost = async () => {
    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };
    try {
        const response = await axios.delete(`${store.serverUrl}posts/${props.propPost.slug}`, { headers })
        if (response) {
            showModal.value = false
            store.homePosts = store.homePosts.filter(p => p.id !== props.propPost.id);
        }
    } catch (err) {
        console.error(err);
    }
}

const editPost = async (newContent) => {
    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };
    console.log(newContent)
    try {
        const response = await axios.patch(`${store.serverUrl}posts/${props.propPost.slug}/content`, { content: newContent }, { headers })
        if (response) {
            showEditModal.value = false
            store.homePosts.find(p => p.id === props.propPost.id).content = newContent;
        }
    } catch (err) {
        console.error(err);
    }
}

const validateComment = () => {
    commentErros.value = [];
    if (!commentContent.value.length) {
        commentErros.value.push('Your comment cannot be empty!')
        return false
    };

    if (!commentContent.value.length > 500) {
        commentErros.value.push('Your comment cannot be longer than 250 characters.')
        return false
    };

    return true;
};

const likePost = async () => {
    const data = {
        postId: props.propPost.id
    };

    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };
    try {
        const response = postLikedByTheUser.value ?
            await axios.delete(`${store.serverUrl}posts/${props.propPost.slug}/like`, { headers }) :
            await axios.post(`${store.serverUrl}posts/${props.propPost.slug}/like`, data, { headers });

        if (response) {
            console.log(response);
            if (!postLikedByTheUser.value) {
                props.propPost.likes.push(response.data.newLike);
            } else {
                props.propPost.likes = props.propPost.likes.filter(l => l.userId !== store.user.id);
            }
        }
    } catch (err) {
        console.error(err);
    }
};


const commentPost = async () => {

    if (!validateComment()) return

    const data = {
        postId: props.propPost.id,
        content: commentContent.value
    }

    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };
    try {

        const response = await axios.post(`${store.serverUrl}posts/${props.propPost.slug}/comment`, data, { headers });
        if (response) {
            console.log(response.data)
            commentContent.value = "";
            response.data.newComment.user = {
                username: store.user.username,
                avatar: store.user.profilePic
            }
            props.propPost.comments.unshift(response.data.newComment);
        }
    } catch (err) {
        console.error(err);
    }
}

</script>

<style scoped></style>