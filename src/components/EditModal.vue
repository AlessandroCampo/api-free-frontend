<template>
    <div class="h-screen w-screen fixed top-0 left-0 bg-gray-600 bg-opacity-75 z-10 flex items-center justify-center">
        <div class="bg-white flex-col rounded-xl w-[300px]">
            <div class="p-6 flex items-center flex-col gap-2 h-[200px]">
                <textarea cols="30" rows="10" v-model="newValue">
               </textarea>
            </div>

            <div class="flex w-full overflow-hidden text-center  border-t-2">
                <button class=" w-1/2 py-3 px-2 border-r-2" @click="emit('onKeep')">
                    Keep Origianl
                </button>
                <button class=" w-1/2 py-3 px-2 text-gray-800 font-bold" @click="handleConfirm">
                    Edit
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    oldValue: {
        type: String,
        required: false
    }
})
const newValue = ref(props.oldValue);
const emit = defineEmits(['onKeep', 'onConfirm'])
const handleConfirm = () => {
    console.log(newValue.value)
    emit('onConfirm', newValue.value);
};
</script>

<style scoped></style>