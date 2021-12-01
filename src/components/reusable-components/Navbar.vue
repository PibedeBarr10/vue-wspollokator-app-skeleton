<template>
  <div
    class="flex-none navbar border-base-100 text-black"
    style="border-bottom: 2px solid #ddd"
  >
    <div class="flex-none px-4">
      <span class="text-lg font-extrabold">
        <router-link to="/"> Współlokator </router-link>
      </span>
    </div>
    <div class="flex-1 px-2 mx-2">
      <div class="items-stretch hidden lg:flex"></div>
    </div>
    <div class="flex-none">
      <slot />
    </div>
    <div
      v-if="currentUser"
      class="flex-none"
    >
    <div>
       <router-link to="/my-profile" class="btn btn-ghost btn-sm rounded-btn">
        Mój profil
      </router-link>
      </div>
      <div>
       <router-link to="/chat" class="btn btn-ghost btn-sm rounded-btn">
         <ChatIcon class="h-6 w-6" />
        </router-link>
        </div>
      <div
        class="btn btn-ghost btn-sm rounded-btn"
        @click="logout"
      >
        <LogoutIcon class="h-6 w-6" />
      </div>
      
      
    </div>
  </div>
</template>

<script>
import { LogoutIcon } from "@heroicons/vue/outline";
import {ChatIcon} from "@heroicons/vue/outline";

export default {
  name: "Navbar",
  components: {
    LogoutIcon,
    ChatIcon,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logout() {
      if (this.currentUser) {
        this.$store.dispatch('auth/logout').then(() => {
          this.$router.push('/')
        })
      }
    }
  }
};
</script>

<style scoped></style>
