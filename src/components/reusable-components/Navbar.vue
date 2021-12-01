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
      <div
        class="btn btn-ghost btn-sm rounded-btn"
        @click="logout"
      >
        <LogoutIcon class="h-6 w-6" />
      </div>
    </div>

    <NotificationBar
      class="fixed bottom-3 right-4"
    />
  </div>
</template>

<script>
import { LogoutIcon } from "@heroicons/vue/outline";
import NotificationBar from "../NotificationBar.vue";

export default {
  name: "Navbar",
  components: {
    NotificationBar,
    LogoutIcon,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted () {},
  methods: {
    logout() {
      if (this.currentUser) {
        this.$store.dispatch('auth/logout').then(() => {
          this.$store.dispatch('clearPointState')
          this.$store.dispatch('clearProfileState')
          this.$router.push('/')
        })
      }
    }
  }
};
</script>

<style scoped></style>
