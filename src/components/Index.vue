<template>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
  <div class="flex-none px-2 mx-2">
    <span class="text-lg font-bold">
      Współlokator
    </span>
  </div> 
  <div class="flex-1 px-2 mx-2">
    <div class="items-stretch hidden lg:flex">
    </div>
  </div> 
  <div class="flex-none">
    <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">              
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>            
      </svg>
    </button>
    <a class="btn btn-ghost btn-sm rounded-btn">
      Mój profil
    </a>
    <a class="btn btn-ghost btn-sm rounded-btn">
      Wyloguj się
    </a>
  </div>
</div>

<div class="container mx-auto">
  <div class="flex flex-row w-full space-x-4">
    <div class="w-1/2">
      <div
        v-for="item in items"
        :key="item"
        class="flex my-4 rounded-box shadow-xl"
      >
        <div class="flex-shrink self-center m-4">
          <div class="-space-x-8 avatar-group">
            <div class="avatar">
              <div class="w-16 h-16">
                <img src="http://daisyui.com/tailwind-css-component-profile-1@94w.png">
              </div>
            </div> 
            <div class="avatar">
              <div class="w-16 h-16">
                <img src="http://daisyui.com/tailwind-css-component-profile-2@94w.png">
              </div>
            </div>
            <div class="avatar placeholder">
              <div class="w-16 h-16 rounded-full bg-neutral-focus text-neutral-content">
                <span>+1</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between flex-grow pl-0 pr-4 py-4">
          <div>
            <h2 class="card-title">{{ item }}</h2>
            <div class="space-x-4">
              <div class="badge badge-primary">Warszawa</div>
              <div class="badge badge-primary">Docelowa liczba osób: 4</div>
            </div>
          </div>

          <div class="self-center space-x-4">
            <HeartIcon class="h-5 w-5 text-red-500"/>
          </div>
        </div>
      </div>
      
    </div>
    <div id="mapContainer" class="sticky top-0 grid rounded-box shadow-xl place-items-center w-1/2 max-h-map"></div>
  </div>
</div>



</template>

<script>
import { HeartIcon } from '@heroicons/vue/outline'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  components: { HeartIcon },
  data () {
    return {
      items: [
        'Anna, Marek',
        'Jan',
        'Małgosia',
        'Jerzy',
        'Anna, Marek',
        'Jan',
        'Małgosia',
        'Jerzy',
        'Anna, Marek',
        'Jan',
        'Małgosia',
        'Jerzy'
      ],
      map: null
    }
  },
  mounted() {
    this.map = L.map("mapContainer").setView([46.05, 11.05], 5);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //use a mix of renderers
    var customPane = this.map.createPane("customPane");
    var canvasRenderer = L.canvas({ pane: "customPane" });
    customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
    L.marker([50, 14]).addTo(this.map);

    L.marker([53, 20]).addTo(this.map);
    L.marker([49.5, 19.5]).addTo(this.map);
    L.marker([49, 25]).addTo(this.map);
    L.marker([-10, 25]).addTo(this.map);
    L.marker([10, -25]).addTo(this.map);
    L.marker([0, 0]).addTo(this.map);
    var pathOne = L.curve(["M", [50, 14], "Q", [53, 20], [49, 25]], {
      renderer: canvasRenderer,
    }).addTo(this.map);
  },

  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
}
// import { ref } from 'vue'

// defineProps({
//   msg: String
// })

// const count = ref(0)
</script>

<style scoped>
</style>
