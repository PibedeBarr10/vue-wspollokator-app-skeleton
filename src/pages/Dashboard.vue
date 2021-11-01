<template>
  <div
    class="flex flex-col my-0 py-0"
    style="height: 100vh; max-height: 100vh"
  >
    <div style="max-height: 20%">
      <div class="flex-none navbar border-base-100 text-black" style=" border-bottom: 2px solid #ddd">
        <div class="flex-none px-4">
          <span class="text-lg font-bold">
            <a href="/">Współlokator</a>
          </span>
        </div>
        <div class="flex-1 px-2 mx-2">
          <div class="items-stretch hidden lg:flex">
          </div>
        </div>
        <div class="flex-none">
          <a
            href="/favourite"
            class="btn btn-ghost btn-sm rounded-btn"
          >
            Zapisane
          </a>
          <a
            href="/my-profile"
            class="btn btn-ghost btn-sm rounded-btn"
          >
            Mój profil
          </a>
          <a
            href="/logout"
            class="btn btn-ghost btn-sm rounded-btn"
          >
            Wyloguj się
          </a>
        </div>
      </div>

      <div class="flex-none shadow-md px-6 py-4">
        <p>Filtry</p>
        <div class="flex flex-row">
          <div class="form-control">
            <label class="cursor-pointer flex flex-row content-center items-center pr-4">
              <span class="label-text pr-2">Zwierzęta domowe</span>
              <input type="checkbox" checked="checked" class="toggle">
            </label>
          </div>

          <div class="form-control">
            <label class="cursor-pointer flex flex-row content-center items-center pr-4">
              <span class="label-text pr-2">Osoby palące</span>
              <input type="checkbox" class="toggle">
            </label>
          </div>

          <div class="form-control">
            <label class="cursor-pointer flex flex-row content-center items-center pr-4">
              <span class="label-text pr-2">Zapisane</span>
              <input type="checkbox" class="toggle">
            </label>
          </div>
        </div>
      </div>
    </div>

    <div
        class="flex flex-row w-full space-x-2 py-4 pr-6 list"
        style="height: 80%;"
    >
      <div
        class="w-1/2 h-full flex-50"
        style="overflow: hidden;overflow-y:scroll"
      >
        <DashboardList
            :groups="groups"
            @setMarkersOnMap="setMarkersOnMap"
        />
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
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import DashboardList from "../components/dashboard/DashboardList.vue"

export default {
  components: {
    DashboardList
  },
  data () {
    return {
      groups: [
        {
          'id': 21,
          'localization': [52.05, 22.05],
          'members': [
            {
              'name': 'Adam',
              'surname': 'Jabłoński',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-2@94w.png'
            },
            {
              'name': 'Edyta',
              'surname': 'Radomiak',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-1@94w.png'
            },
            {
              'name': 'Michał',
              'surname': 'Kucyk',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-4@94w.png'
            }
          ],
        },
        {
          'id': 15,
          'localization': [53.05, 17.05],
          'members': [
            {
              'name': 'Jan',
              'surname': 'Kowalski',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-5@94w.png'
            }
          ],
        },
        {
          'id': 15,
          'localization': [53.05, 17.05],
          'members': [
            {
              'name': 'Jan',
              'surname': 'Kowalski',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-5@94w.png'
            }
          ],
        },
        {
          'id': 15,
          'localization': [53.05, 17.05],
          'members': [
            {
              'name': 'Jan',
              'surname': 'Kowalski',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-5@94w.png'
            }
          ],
        },
        {
          'id': 15,
          'localization': [53.05, 17.05],
          'members': [
            {
              'name': 'Jan',
              'surname': 'Kowalski',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-5@94w.png'
            }
          ],
        },
        {
          'id': 15,
          'localization': [53.05, 17.05],
          'members': [
            {
              'name': 'Jan',
              'surname': 'Kowalski',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-5@94w.png'
            }
          ],
        },
        {
          'id': 15,
          'localization': [53.05, 17.05],
          'members': [
            {
              'name': 'Jan',
              'surname': 'Kowalski',
              'imgUrl': 'http://daisyui.com/tailwind-css-component-profile-5@94w.png'
            }
          ],
        }
      ],
      map: null,
      markers: [],
      groupMarker: null
    }
  },
  mounted () {
    this.createMap()
    this.getAllMarkers()
    this.setAllMarkersOnMap()
  },
  methods: {
    createMap() {
      this.map = L.map("mapContainer").setView([52, 19.05], 6);

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      let customPane = this.map.createPane("customPane");
      customPane.style.zIndex = 399;
    },
    getAllMarkers() {
      this.markers = L.layerGroup()
      this.groups.forEach((group) => {
        this.markers.addLayer(L.marker(group.localization));
      })
    },
    setAllMarkersOnMap() {
      this.map.addLayer(this.markers)
    },
    setMarkersOnMap(groupIndex) {
      this.map.removeLayer(this.markers)

      if (groupIndex === -1) {
        this.map.removeLayer(this.groupMarker)
        this.setAllMarkersOnMap()
        return
      }

      this.groupMarker = L.marker(this.groups[groupIndex].localization)
      this.map.addLayer(this.groupMarker)
    }
  }
}
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
