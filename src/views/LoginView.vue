<template>

    <div class="w-screen h-screen flex">
        <div class="login-left w-[45%] bg-cover h-full"></div>
        <div class="login-right w-[55%] flex items-center justify-center">
            <form class="register flex flex-col text-gray-400 w-1/3 gap-4" @submit.prevent="sendRegisterRequest"
                v-if="pageState === 'register'">
                <!-- <h2 class="uppercase text-2xl font-semibold text-center mb-3">
                    Create your BoolBook account
                </h2> -->
                <img src="/logo-no-background.png" alt="logo" class="mb-3">
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <i class="fa-solid fa-user text-lg"></i>
                    <input type="text"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Username" v-model="formData.username" autocomplete>
                </div>
                <div v-if="formErrors.username.length > 0" class="error-message text-red-500">
                    {{ formErrors.username[0] }}
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <i class="fa-solid fa-envelope text-lg"></i>
                    <input type="email"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Email" v-model="formData.email">
                </div>
                <div v-if="formErrors.email.length > 0" class="error-message text-red-500">
                    {{ formErrors.email[0] }}
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3 ">
                    <i class="fa-solid fa-lock text-lg"></i>
                    <input type="password"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Password" v-model="formData.password">
                </div>
                <div v-if="formErrors.password.length > 0" class="error-message text-red-500">
                    {{ formErrors.password[0] }}
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <i class="fa-solid fa-lock text-lg"></i>
                    <input type="password"
                        class="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Confirm Password" v-model="formData.confirmPassword">
                </div>
                <div v-if="formErrors.confirmPassword.length > 0" class="error-message text-red-500">
                    {{ formErrors.confirmPassword[0] }}
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <i class="fa-solid fa-image text-lg"></i>
                    <label for="profile_pic" class="cursor-pointer py-2">{{ profilePicLabel }}</label>
                    <input type="file" id="profile_pic" class="bg-transparent w-full hidden"
                        placeholder="Confirm Password" accept=".png, .jpg, .jpeg" @change="handleFileUpload">
                </div>
                <div v-if="formErrors.image.length > 0" class="error-message text-red-500">
                    {{ formErrors.image[0] }}
                </div>
                <button
                    class="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3">
                    Register
                </button>
                <p class="font-bold text-xl mt-3 cursor-pointer" @click="changePage('login')">
                    Already have an account?
                </p>
            </form>
            <form class="register flex flex-col text-gray-400 w-1/3 gap-4" @submit.prevent="sendRegisterRequest"
                v-else-if="pageState == 'login'">
                <div class="uppercase text-2xl font-semibold text-center mb-3">

                    <img src="/logo-no-background.png" alt="logo">
                    <!-- <h2 class="my-3 text-4xl">
                        Log In
                    </h2> -->
                </div>

                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <i class="fa-solid fa-user text-lg"></i>
                    <input type="text"
                        class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Username" v-model="loginData.username" autocomplete>
                </div>
                <div v-if="loginDataErrors.username.length > 0" class="error-message text-red-500">
                    {{ loginDataErrors.username[0] }}
                </div>
                <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <i class="fa-solid fa-lock text-lg"></i>
                    <input type="password"
                        class="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Password" v-model="loginData.password">
                </div>
                <div v-if="loginDataErrors.password.length > 0" class="error-message text-red-500">
                    {{ loginDataErrors.password[0] }}
                </div>
                <div v-if="logInErros.length > 0" class="error-message text-red-500">
                    {{ logInErros[0].msg }}
                </div>
                <div v-if="successMessages.length > 0" class="success-message text-green-500">
                    {{ successMessages[0].msg }}
                </div>

                <button
                    class="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3"
                    @click="sendLoginRequest">
                    Log In
                </button>
                <button
                    class="bg-input hover:bg-gray-900 text-gray-400 border-0 border-gray-400 text-lg font-bold py-2 px-4 rounded-xl transition duration-300"
                    @click="changePage('forgot')">
                    Forgot your password?
                </button>
                <p class="font-bold text-xl mt-3 cursor-pointer" @click="changePage('register')">
                    Don't have an account yet?
                </p>
            </form>
            <form class="register flex flex-col text-gray-400 w-1/3 gap-4" @submit.prevent="sendRegisterRequest"
                v-else-if="pageState == 'forgot'">
                <div class=" font-semibold text-center mb-3">

                    <img src="/logo-no-background.png" alt="logo" class="mb-6">
                    <!-- <h2 class="my-3 text-4xl">
                        Log In
                    </h2> -->

                    <div class="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3 my-3">
                        <i class="fa-solid fa-envelope text-lg"></i>
                        <input type="email"
                            class="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                            placeholder="Your Email" v-model="resetEmail">

                    </div>
                    <div v-if="successMessages.length > 0" class="success-message text-green-500">
                        {{ successMessages[0].msg }}
                    </div>
                    <div v-if="resetEmailErrors.length > 0" class="error-message text-red-500">
                        {{ resetEmailErrors[0] }}
                    </div>
                    <button
                        class="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3 w-full"
                        @click="sendPassResetRequest">
                        Reset Password
                    </button>
                    <p class="font-bold text-xl mt-3 cursor-pointer text-start" @click="changePage('login')">
                        Ready to login?
                    </p>

                </div>
            </form>
        </div>


    </div>
</template>

<script setup>

import { useApiStore } from '@/stores/apiStore';
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

const store = useApiStore();
const pageState = ref('login');
let userProfilePic = undefined;
const profilePicLabel = ref('Upload a profile picture');
const resetEmail = ref('');
let logInErros = ref([]);
let successMessages = ref([]);
const resetEmailErrors = ref([]);



const formData = ref({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
});


const formErrors = ref({
    username: [],
    email: [],
    password: [],
    confirmPassword: [],
    image: []
});


const loginData = ref({
    username: "",
    password: "",
});


const loginDataErrors = ref({
    username: [],
    password: []
});

const changePage = (page) => {
    Object.keys(formErrors.value).forEach(field => {
        formErrors.value[field] = [];
    });
    Object.keys(loginData.value).forEach(field => {
        loginData.value[field] = [];
    });
    resetEmailErrors.value = [];
    successMessages.value = [];
    pageState.value = page
}



const handleFileUpload = (event) => {
    userProfilePic = event.target.files[0];
    profilePicLabel.value = userProfilePic.name;
};

const checkFormData = () => {
    Object.keys(formErrors.value).forEach(field => {
        formErrors.value[field] = [];
    });

    if (!formData.value.username.trim()) {
        formErrors.value.username.push('Username is required');
    }

    if (!formData.value.email.trim()) {
        formErrors.value.email.push('Email is required');
    }

    if (!formData.value.password.trim()) {
        formErrors.value.password.push('Password is required');
    }

    if (!formData.value.confirmPassword.trim()) {
        formErrors.value.confirmPassword.push('Confirm Password is required');
    }

    if (formData.value.password !== formData.value.confirmPassword) {
        formErrors.value.confirmPassword.push('Passwords do not match');
    }

    return Object.values(formErrors.value).some(errors => errors.length > 0);
};


const checkLoginData = () => {
    Object.keys(loginData.value).forEach(field => {
        loginDataErrors.value[field] = [];
    });

    if (!loginData.value.username.trim()) {
        loginDataErrors.value.username.push('Username is required');
    }


    if (!loginData.value.password.trim()) {
        loginDataErrors.value.password.push('Password is required');
    }


    return Object.values(loginDataErrors.value).some(errors => errors.length > 0);
};


const sendRegisterRequest = async (e) => {
    const errorsOccurred = checkFormData();
    if (errorsOccurred) return;

    console.log(formData.value)

    const userData = new FormData();
    userData.append('username', formData.value.username);
    userData.append('email', formData.value.email);
    userData.append('password', formData.value.password);
    if (userProfilePic) {
        userData.append('image', userProfilePic);
    }


    try {
        const registration = await axios.post(store.serverUrl + 'users/register', userData);
        if (registration) {
            store.authToken = registration.data.token;
            store.user = registration.data.user;
            console.log(registration.data);
            localStorage.setItem('authToken', store.authToken);
            localStorage.setItem('boolBookUser', JSON.stringify(store.user));
            router.push({ name: 'home' });
        };
    } catch (err) {
        err.response.data.errors.forEach(err => {
            formErrors.value[err.path].push(err.msg)
        })
        console.error(err);
    }
}

const sendLoginRequest = async (e) => {
    const errorsOccurred = checkLoginData();
    if (errorsOccurred) return;

    const userData = {
        username: loginData.value.username,
        password: loginData.value.password
    }

    try {
        const response = await axios.post(store.serverUrl + 'users/login', userData);
        if (response) {
            store.authToken = response.data.token;
            store.user = response.data.user;
            console.log(response.data);
            localStorage.setItem('authToken', store.authToken);
            localStorage.setItem('boolBookUser', JSON.stringify(store.user));
            router.push({ name: 'home' });
        };
    } catch (err) {
        logInErros.value = err.response.data.errors;
        console.error(err);
    }
}

const sendPassResetRequest = async (e) => {
    if (!resetEmail.value) {
        resetEmailErrors.value.push('Please insert your email in order to recover your password')
        return;
    }

    const userData = {
        username: loginData.value.username,
        password: loginData.value.password
    }

    try {
        const response = await axios.post(store.serverUrl + 'users/login', userData);
        if (response) {
            store.authToken = response.data.token;
            store.user = response.data.user;
            console.log(response.data);
            localStorage.setItem('authToken', store.authToken);
            localStorage.setItem('boolBookUser', JSON.stringify(store.user));
            router.push({ name: 'home' });
        };
    } catch (err) {
        logInErros.value = err.response.data.errors;
        console.error(err);
    }
}


</script>

<style scoped>
.login-left {
    background-image: url('login-bg.jpg');
    background-size: cover;
    background-position: center;
}
</style>