<template>
  <div class="flex flex-col my-0 py-0" style="height: 100vh; max-height: 100vh">
    <div>
      <Navbar />
    </div>

    <div
      class="flex-styling w-full py-4 pr-6 list"
      style="height: 100%"
    >
      <div
        class="dashboard-list-container h-full "
        style="overflow: hidden; overflow-y: scroll"
      >
        <DashboardList :users="users" />
      </div>
    </div>
  </div>
</template>

<script>


import { LogoutIcon } from "@heroicons/vue/outline";
import DashboardList from "../components/dashboard/DashboardList.vue";
import Navbar from "../components/reusable-components/Navbar.vue";
import Filters from "../components/reusable-components/Filters.vue";
import usersService from "../services/usersService";

export default {
  components: {
    Filters,
    DashboardList,
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
    this.searchUsers();
  },
  methods: {
    getUsers() {
      usersService
        .getProfiles()
        .then((data) => {
          console.log(data);
          this.users = [];
          data.forEach((data) => {
            this.users.push({
              id: data.user.id,
              profile_id: data.user.profile,
              localization: data.point[0].location.coordinates,
              radius: data.point[0].radius,
              first_name: data.user.first_name,
              last_name: data.user.last_name,
              avatar: data.avatar,
              updated_at: data.user.updated_at,
              filters: {
                accepts_animals: data.accepts_animals,
                age: data.age,
                preferable_price: data.preferable_price,
                sex: data.sex,
                smoking: data.smoking,
              },
            });
          });
        })
        .then(() => {
          // console.log(this.users)
        });
    },
    searchUsers() {
      const today = new Date();
      const data = new Date();
      data.setDate(today.getDate() - 1);
      usersService.getFilteredProfiles({ min_updated_at: data.toLocaleString() }).then((data) => {
      console.log(data.response)
        this.users = [];
        data.forEach((data) => {
          this.users.push({
            id: data.user.id,
            profile_id: data.user.profile,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
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

.flex-styling {
  display: flex;
  flex-direction: row;
}

.dashboard-list-container {
  width: 100%;
}
.dashboard-list-container {
  margin-left: 0.5rem;
}

@media only screen and (max-width: 659px) {
  .flex-styling {
    flex-direction: column-reverse;
  }

  .dashboard-list-container, .map-container {
    width: 100%;
  }

  .dashboard-list-container {
    padding-top: 20px;
  }
}
</style>
