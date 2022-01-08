<template>
  <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
    <div class="flex w-full items-center justify-between">
      <span class="text-lg font-bold">Mój punkt</span>
      <button
        v-if="!pointEditing"
        id="myPointEdit"
        class="text-xs m-2 border-0 py-2 px-4 btn btn-primary"
        @click="changeMyPoint"
      >
        Edytuj
      </button>

      <div v-else>
        <div class="flex">
          <button
            id="myPointAccept"
            class=" text-xs m-2 border-0 py-2 px-4 btn btn-primary"
            @click="updateMyPoint"
          >
            Zatwierdź
          </button>
          <button
            id="myPointClose"
            class="text-xs m-2 border-0 py-2 px-4 btn"
            @click="cancelUpdateMyPoint"
          >
            Anuluj
          </button>
        </div>
      </div>

    </div>

    <label class="cursor-pointer flex flex-row content-center items-center pr-4">
      <span class="label-text pr-2">Odl. od mojego punktu (km)</span>
      <input
        v-model="radius"
        :disabled="!pointEditing"
        type="range"
        min="1"
        max="10"
        oninput="this.nextElementSibling.value = this.value"
        class="range"
      >
      <output>{{ radius }}</output>
    </label>
  </div>

  <div
    v-if="coordinates !== []"
    id="mapContainer"
    class="lg:w-3/5 lg:h-2/5 mapstyle py-4 rounded-box mx-auto my-4"
  />
</template>

<script>

import L from "leaflet"
import 'leaflet/dist/leaflet.css'

export default {
  data () {
    return {
      map: null,
      marker: null,
      circle: null,
      pointEditing: false,
      coordinates: [52, 20],
      radius: 1,
    }
  },
  mounted () {
    // reset znaczników na mapie
    document.getElementById('mapContainer').innerHTML = '<div v-if="coordinates !== []" id="mapContainer" class="lg:w-3/5 lg:h-2/5 mapstyle py-4 rounded-box mx-auto my-4"/>'

    this.drawMap()
  },
  methods: {
    drawMap() {
      this.$store.dispatch('getUserPoint').then(() => {
        this.radius = this.$store.getters.radius

        if (this.$store.getters.point !== null) {
          this.coordinates = this.$store.getters.point
        } else {
          this.coordinates = [52, 20]
          this.toDoForUser.push('Ustaw swój punkt na mapie')
        }

        this.createMap()
        this.setCircleOnMap()
      })
    },
    createMap() {
      const container = L.DomUtil.get('mapContainer')
      if (container !== null) {
        container._leaflet_id = null
      }
      this.map = L.map('mapContainer').setView(this.coordinates, 13)
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map)

      let customPane = this.map.createPane("customPane")
      customPane.style.zIndex = 399
    },
    setCircleOnMap() {
      this.circle = L.circle(this.coordinates, this.radius * 1000)
      this.map.addLayer(this.circle)
    },
    changeMyPoint() {
      this.pointEditing = true

      this.map.removeLayer(this.circle)

      this.marker = L.marker(this.coordinates, {
        draggable: true
      })
      this.map.addLayer(this.marker)
    },
    updateMyPoint()
    {
      // aktualizacja mojego punktu
      this.coordinates = [
        this.marker.getLatLng().lat,
        this.marker.getLatLng().lng
      ]

      this.$store.dispatch('changeUserPoint', {
        location: this.coordinates,
        radius: this.radius
      }).then(() => {
        this.map.removeLayer(this.marker)
        this.circle = L.circle(this.coordinates, this.radius * 1000)
        this.map.addLayer(this.circle)

        this.pointEditing = false
        this.$store.dispatch('notificationModule/show', { text: 'Zmieniono punkt', type: 'success' })
      })
    },
    cancelUpdateMyPoint()
    {
      // powrót do danych wcześniejszych
      this.map.removeLayer(this.marker)
      this.map.addLayer(this.circle)

      this.pointEditing = false
    }
  }
}

</script>

<style scoped>
.map {
  border-bottom: 2px solid #ddd;
}
.mapstyle{
  position: relative;
  height: 90%;
}
</style>
