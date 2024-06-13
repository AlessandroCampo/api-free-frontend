<template>
    <div class="h-screen w-screen fixed top-0 left-0 bg-gray-600 bg-opacity-75 z-10 flex items-center justify-center">
        <div class="bg-white flex-col rounded-xl w-[300px]">
            <div class="p-6 flex items-center flex-col gap-2">
                <h4 class=" text-black font-semibold ">
                    {{ config?.title }}
                </h4>
                <p class="text-center">
                    {{ config?.p }}
                </p>
            </div>

            <div class="flex w-full overflow-hidden text-center  border-t-2">
                <button class=" w-1/2 py-3 px-2 border-r-2" @click="emit('onKeep')">
                    {{ config?.option1label }}
                </button>
                <button class=" w-1/2 py-3 px-2 text-gray-800 font-bold" @click="emit('onConfirm')">
                    {{ config?.option2label }}
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    config: {
        type: Object,
        required: false
    }
})
const emit = defineEmits(['onKeep', 'onConfirm'])
</script>

<style scoped></style>