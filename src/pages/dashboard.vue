<template>
  <div class="flex flex-col my-0 py-0" style="height: 100vh; max-height: 100vh">
    <div>
      <Navbar />

      <Filters @searchUsers="searchUsers" />
    </div>

    <div
      class="flex-styling w-full py-4 pr-6 list"
      style="height: 100%"
    >
      <div
        class="dashboard-list-container h-full flex-50"
        style="overflow: hidden; overflow-y: scroll"
      >
        <DashboardList :users="users" @setMarkersOnMap="setMarkersOnMap" />
      </div>
      <div
        id="mapContainer"
        class="map-container rounded-box shadow-md h-full flex-50"
        style="position: relative"
      />
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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
      map: null,
      markers: [],
      groupMarker: null,
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
          this.createMap();
          this.getAllMarkers();
          this.setAllMarkersOnMap();
        });
    },
    searchUsers(filters) {
      usersService.getFilteredProfiles(filters).then((data) => {
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
            filters: {
              accepts_animals: data.accepts_animals,
              age: data.age,
              preferable_price: data.preferable_price,
              sex: data.sex,
              smoking: data.smoking,
            },
          });
        });
      });
    },
    createMap() {
      this.map = L.map("mapContainer").setView([52, 19.05], 6);

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      let customPane = this.map.createPane("customPane");
      customPane.style.zIndex = 399;
    },
    getAllMarkers() {
      this.markers = L.layerGroup();
      this.users.forEach((user) => {
        this.markers.addLayer(L.marker(user.localization));
      });
    },
    setAllMarkersOnMap() {
      this.map.addLayer(this.markers);
    },
    setMarkersOnMap(groupIndex) {
      this.map.removeLayer(this.markers);

      if (groupIndex === -1) {
        this.map.removeLayer(this.groupMarker);
        this.setAllMarkersOnMap();
        return;
      }

      this.groupMarker = L.marker(this.users[groupIndex].localization);
      this.map.addLayer(this.groupMarker);
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

.dashboard-list-container, .map-container {
  width: 50%;
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
