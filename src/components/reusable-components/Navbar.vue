<template>
  <nav
    class="
      navbar
      text-black
      justify-center
      flex-col
      px-4
      md:flex-row md:justify-between
    "
    style="border-bottom: 2px solid #ddd"
  >
    <div class="w-full justify-between md:w-auto">
      <!-- LOGO -->
      <div class="text-lg font-extrabold">
        <router-link to="/">Współlokator</router-link>
      </div>
      <!-- Mobile menu button -->
      <div @click="toggleNav" class="flex md:hidden">
        <button
          type="button"
          class="
            text-black-100
            hover:text-black-400
            focus:outline-none focus:text-black-400
          "
        >
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- AUTH MENU -->
    <div
      v-if="!currentUser"
      :class="showMenu ? 'flex' : 'hidden'"
      class="
        flex flex-col
        items-center
        justify-between
        mt-4
        space-y-4
        md:flex md:space-y-0 md:flex-row md:mt-0
      "
    >
      <router-link to="/login" class="btn btn-ghost btn-sm rounded-btn">
        Zaloguj się
      </router-link>
      <router-link to="/register" class="btn btn-ghost btn-sm rounded-btn">
        Zarejestruj się
      </router-link>
    </div>
    <!-- MAIN MENU -->
    <div
      v-if="currentUser"
      :class="showMenu ? 'flex' : 'hidden'"
      class="
        flex flex-col
        items-center
        justify-between
        mt-4
        space-y-4
        md:flex md:space-y-0 md:flex-row md:mt-0
      "
      style="z-index: 1000"
    >
      <router-link to="/my-profile" class="btn btn-ghost btn-sm rounded-btn">
        Mój profil
      </router-link>
      <router-link to="/notifications" class="btn btn-ghost btn-sm rounded-btn">
        <InformationCircleIcon class="h-6 w-6" />
      </router-link>
      <router-link to="/chat/0" class="btn btn-ghost btn-sm rounded-btn">
        <ChatIcon class="h-6 w-6" />
      </router-link>
      <router-link to="/favourite" class="btn btn-ghost btn-sm rounded-btn">
        <HeartIcon class="h-6 w-6" />
      </router-link>
      <div class="btn btn-ghost btn-sm rounded-btn" @click="logout">
        <LogoutIcon class="h-6 w-6" />
      </div>
    </div>

    <NotificationBar class="fixed bottom-3 right-4" />
  </nav>
</template>

<script>
import { ref } from "vue";
import { LogoutIcon } from "@heroicons/vue/outline";
import NotificationBar from "../NotificationBar.vue";
import {
  ChatIcon,
  HeartIcon,
  InformationCircleIcon,
} from "@heroicons/vue/outline";

export default {
  name: "Navbar",
  components: {
    NotificationBar,
    LogoutIcon,
    ChatIcon,
    HeartIcon,
    InformationCircleIcon,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {},
  methods: {
    logout() {
      if (this.currentUser) {
        this.$store.dispatch("auth/logout").then(() => {
          this.$store.dispatch("clearPointState");
          this.$store.dispatch("clearProfileState");
          this.$router.push("/");
        });
      }
    },
  },
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
};
</script>

<style scoped></style>
