<template>
  <div class="flex flex-col my-0 py-0" style="height: 100vh; max-height: 100vh">
    <div style="max-height: 20%">
      <Navbar>
        <router-link to="/my-profile" class="btn btn-ghost btn-sm rounded-btn">
          Mój profil
        </router-link>
        <router-link to="/" class="btn btn-ghost btn-sm rounded-btn">
          <LogoutIcon class="h-6 w-6" /> </router-link>
      </Navbar>

      <Filters />
    </div>

    <div
      class="flex flex-row w-full space-x-2 py-4 pr-6 list"
      style="height: 80%"
    >
      <div
        class="w-1/2 h-full flex-50"
        style="overflow: hidden; overflow-y: scroll"
      >
        <DashboardList :groups="groups" @setMarkersOnMap="setMarkersOnMap" />
      </div>
      <div
        id="mapContainer"
        class="rounded-box shadow-xl w-1/2 h-full flex-50"
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

export default {
  components: {
    Filters,
    DashboardList,
    LogoutIcon,
    Navbar,
  },
  data() {
    return {
      groups: [
        {
          id: 21,
          localization: [52.05, 22.05],
          members: [
            {
              name: "Adam",
              surname: "Jabłoński",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-2@94w.png",
            },
            {
              name: "Edyta",
              surname: "Radomiak",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-1@94w.png",
            },
            {
              name: "Michał",
              surname: "Kucyk",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-4@94w.png",
            },
          ],
        },
        {
          id: 15,
          localization: [53.05, 17.05],
          members: [
            {
              name: "Jan",
              surname: "Kowalski",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-5@94w.png",
            },
          ],
        },
        {
          id: 15,
          localization: [52.05, 16.05],
          members: [
            {
              name: "Jan",
              surname: "Kowalski",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-5@94w.png",
            },
          ],
        },
        {
          id: 15,
          localization: [51.05, 17.65],
          members: [
            {
              name: "Jan",
              surname: "Kowalski",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-5@94w.png",
            },
          ],
        },
        {
          id: 15,
          localization: [52.57, 16.25],
          members: [
            {
              name: "Jan",
              surname: "Kowalski",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-5@94w.png",
            },
          ],
        },
        {
          id: 15,
          localization: [53.05, 17.05],
          members: [
            {
              name: "Jan",
              surname: "Kowalski",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-5@94w.png",
            },
          ],
        },
        {
          id: 15,
          localization: [53.05, 17.05],
          members: [
            {
              name: "Jan",
              surname: "Kowalski",
              imgUrl:
                "http://daisyui.com/tailwind-css-component-profile-5@94w.png",
            },
          ],
        },
      ],
      map: null,
      markers: [],
      groupMarker: null,
    };
  },
  mounted() {
    this.createMap();
    this.getAllMarkers();
    this.setAllMarkersOnMap();
  },
  methods: {
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
      this.groups.forEach((group) => {
        this.markers.addLayer(L.marker(group.localization));
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

      this.groupMarker = L.marker(this.groups[groupIndex].localization);
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
</style>
