<template>
  <div
    v-if="users.length === 0"
    class="flex justify-center items-center w-full"
    style="height: 100%"
  >
    <p>Brak wyników</p>
  </div>
  <div v-else v-for="user in users" :key="user" class="flex w-full mt-4">
    <div
      class="
        flex
        w-full
        mb-4
        rounded-box
        shadow-md
        mx-2
        btn-ghost
        cursor-pointer
      "
    >
      <div class="m-4 px-4" @click="showUserProfile(user.profile_id)">
        <img
          class="
            w-full
            rounded-full
            object-cover object-center
            border-solid border-2 border-black
          "
          style="object-fit: cover; height: 48px; width: 48px"
          :src="user.avatar"
          :alt="user.first_name + ' image'"
        />
      </div>

      <div
        class="flex justify-between flex-grow pl-0 pr-4 py-4"
        @click="showUserProfile(user.profile_id)"
      >
        <div>
          <p class="card-title">
            {{ `${user.first_name} ${user.last_name}` }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center w-20">
        <TrashIcon
          class="h-8 w-8 text-red-500 cursor-pointer"
          @click="deleteFromFavourite(user.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/outline";
import favouriteService from "../../services/favouriteService";
const API_URL = import.meta.env.VITE_API_URL;
export default {
  components: {
    TrashIcon,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeUser: -1,
      API_URL,
    };
  },
  methods: {
    deleteFromFavourite(id) {
      console.log(this.users === 0);
      favouriteService
        .removeFavourite(id)
        .then(() => window.location.reload(true));
    },
    showUserProfile(id) {
      this.$router.push({ name: "Profil użytkownika", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.group:hover {
  background-color: #ddd;
}
</style>
