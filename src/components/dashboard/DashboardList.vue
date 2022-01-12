<template>
  <div v-for="user in users" :key="user" class="flex w-full">
    <div v-if="users.length === 0" class="flex w-full justify-center">
      <p>Brak wyników</p>
    </div>
    <div
      v-else
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
      @mouseover.native="getUserOnHover(user)"
      @mouseleave.native="getUserOnHover"
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

      <div class="flex justify-between flex-grow pl-0 pr-4 py-4" @click="showUserProfile(user.profile_id)">
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
      <div class="flex items-center justify-center w-10">
        <HeartIcon
          class="h-5 w-5 text-red-500 cursor-pointer"
          @click="sendToFavourite(user.id)"
        />
      </div>
    </div>
  </div>
  <div class="self-center space-x-4"></div>
</template>

<script>
import { HeartIcon } from "@heroicons/vue/outline";
import favouriteService from "../../services/favouriteService";

export default {
  components: {
    HeartIcon,
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
    getUserOnHover(user = null) {
      const oldActiveUserIndex = this.activeUser;
      user
        ? (this.activeUser = this.users.indexOf(user))
        : (this.activeUser = -1);

      if (this.activeUser !== oldActiveUserIndex) {
        this.$emit("setMarkersOnMap", this.activeUser);
      }
    },
    sendToFavourite(id) {
      favouriteService
        .addFavourite(id)
        .then(() => {
          this.$store.dispatch("notificationModule/show", {
            text: "Dodano do ulubionych",
            type: "success",
          });
        })
        .catch((err) => {
          console.log("blad", err);
        });
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
