<template>
    <div class="comment border-b-2 border-gray-400 flex gap-4 p-2">
        <img :src="propComment.user.avatar" alt="profile-pic"
            class="profile-pic rounded-full w-[50px] h-[50px] aspect-square" v-if="propComment.user?.avatar">
        <div v-else
            class="rounded-full w-[50px] h-[50px] aspect-square uppercase font-semibold flex items-center justify-center bg-theme text-input text-3xl">
            {{ propComment.user?.username[0] }}</div>
        <div class="comment-right w-full">
            <div class="right-upper flex itemes-center gap-3">
                <div class="font-bold">{{ propComment.user?.username }}</div>
                <div>{{ utilStore.formatTimestamp(propComment.updatedAt) }} <span
                        v-show="propComment.updatedAt > propComment.createdAt" class="font-semibold">(Modificato)</span>
                </div>

            </div>
            <div class="flex justify-between w-full">
                <p v-if="!editingComment">{{ propComment?.content }}</p>
                <input type="text" class="bg-transparent" v-model="editedComment" ref="editInput"
                    v-show="editingComment">
                <div class="controls text-theme text-xl flex items-center gap-2"
                    v-show="propComment.userId == store?.user?.id">
                    <i class="fa-solid" @click="editComment"
                        :class="!editingComment ? 'fa-pen-to-square' : 'fa-paper-plane'"></i>
                    <i class="fa-solid fa-trash" @click="deleteComment"></i>
                </div>
            </div>

        </div>


    </div>
</template>

<script setup>
import { useUtilStore } from '@/stores/utilStore.js';
import { useApiStore } from '@/stores/apiStore';
import { defineProps, onMounted, ref, watch, nextTick, getCurrentInstance } from 'vue';

import axios from 'axios';
const props = defineProps({
    propComment: {
        type: Object,
        required: true
    }
})
const utilStore = useUtilStore();
const store = useApiStore();
const editedComment = ref(props.propComment.content);
const editingComment = ref(false);



const editComment = async () => {
    if (!editingComment.value) {
        editingComment.value = true
        return
    }
    const data = {
        content: editedComment.value
    };

    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };
    try {
        const response = await axios.put(`${store.serverUrl}comments/${props.propComment.id}`, data, { headers })
        if (response) {
            console.log(response.data);
        }

    } catch (err) {
        console.error(err)
    }
}

const deleteComment = async () => {
    const { emit } = getCurrentInstance();
    const headers = {
        Authorization: `Bearer ${store.authToken}`
    };
    try {
        const response = await axios.delete(`${store.serverUrl}comments/${props.propComment.id}`, { headers })
        if (response) {
            console.log(response.data);
            emit('commentDeleted', props.propComment.id);
        }

    } catch (err) {
        console.error(err)
    }
};

const focusInput = () => {
    if (editingComment.value) {
        nextTick(() => {
            const inputElement = document.getElementById('editInput');
            if (inputElement) {
                inputElement.focus();
            }
        });
    }
};
watch(editingComment, focusInput);


onMounted(() => {
    console.log(props.propComment)
})
</script>

<style lang="scss" scoped></style>