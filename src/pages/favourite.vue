<template>
  <div class="flex flex-col my-0 py-0" style="height: 100vh; max-height: 100vh">
    <div>
      <Navbar />
    </div>

    <div class="h-full flex-1">
      <FavouriteList :users="users" />
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LogoutIcon } from "@heroicons/vue/outline";
import FavouriteList from "../components/favourite/FavouriteList.vue";
import Navbar from "../components/reusable-components/Navbar.vue";
import Filters from "../components/reusable-components/Filters.vue";
import favouriteService from "../services/favouriteService";

export default {
  components: {
    Filters,
    FavouriteList,
    LogoutIcon,
    Navbar,
  },
  data() {
    return {
      users: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
    this.getUsers();
  },
  methods: {
    getUsers() {
      favouriteService.getFavourite().then((data) => {
        console.log(data);
        this.users = [];
        data.forEach((data) => {
          this.users.push({
            id: data.user_id,
            profile_id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            avatar: data.avatar,
          });
        });
      });
    },
  },
};
</script>

<style scoped>
.flex-50 {
  flex: 0 0 50%;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: mediumpurple;
  border-radius: 10px;
}
</style>
