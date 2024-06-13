<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 font-semibold text-theme ">
                <i class="fa-solid fa-ellipsis text-xl"></i>
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute right-0 z-10 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                    <MenuItem v-slot="{ active }" class="cursor-pointer flex items-center gap-2"
                        v-for="option in props.options" :key="option.label" @click="option.cb">
                    <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                        class="flex justify-between px-4 rounded-lg">
                        <span>{{ option?.label }}</span>
                        <i class="fa-solid" :class="option.icon"></i>

                    </div>

                    </MenuItem>

                </div>

            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { defineProps } from 'vue';
const props = defineProps({
    options: {
        type: Array,
        required: true
    }
});

</script>