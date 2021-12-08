<template>
  <div v-if="users.length === 0" class="flex w-full justify-center">
    <p>Brak wyników</p>
  </div>
  <div v-else v-for="user in users" :key="user" class="flex w-full">
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
      @click="showUserProfile(user.profile_id)"
    >
      <div class="m-4 px-4">
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

      <div class="flex justify-between flex-grow pl-0 pr-4 py-4">
        <div>
          <p class="card-title">
            {{ `${user.first_name} ${user.last_name}` }}
          </p>
          <!--        <div class="space-x-4">-->
          <!--          <div class="badge badge-primary">Warszawa</div>-->
          <!--          <div class="badge badge-primary">Docelowa liczba osób: 4</div>-->
          <!--        </div>-->
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center w-20">
      <TrashIcon
        class="h-10 w-10 text-red-500 cursor-pointer"
        @click="deleteFromFavourite(user.id)"
      />
    </div>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/outline";
import favouriteService from "../../services/favouriteService";
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
