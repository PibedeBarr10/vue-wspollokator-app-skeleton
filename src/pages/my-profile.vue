<template>
  
  <div class="flex flex-col my-0 py-0 "
    style="height: 100vh; max-height: 100vh; overflow:scroll; display:block"> 
     <div class="px-6 py-4" style="max-height: 20%" >
      <Navbar />
     </div>
     <div>
    <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
      <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <div class="flex mb-4">
          <a class="flex-grow  border-b-2 border-gray-500 py-2 text-lg px-1">Mój opis</a>
        </div>
        <p class="leading-relaxed mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsam pariatur ex? Sunt dolorum dolores provident rem numquam, eius placeat officia, veritatis accusantium quod blanditiis excepturi, voluptate incidunt odit quis! </p>
       
      </div>  
      <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <div class="flex mb-4">
          <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1">Preferencje</a>
        </div>
         <div class="mb-4">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Szukam współlokatora</span>
          <input type="checkbox" checked="checked" class="toggle">
        </label>
      </div>
         <div  class="mb-4">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Zwierzęta domowe</span>
          <input type="checkbox" checked="checked" class="toggle">
        </label>
      </div>
        <div class="mb-4">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Osoby palące</span>
          <input type="checkbox"  class="toggle">
        </label>
      </div>
        <div class="mb-4">
        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Odl. od mojego punktu (km)</span>
          <input type="range" value="0" min="1" max="10" oninput="this.nextElementSibling.value = this.value" class="range">
          <output> 1</output>
        </label>
      </div>
      </div>  
         <div class="lg:w-1/5 lg:h-1/2">
         <h1 class="text-gray-900 text-3xl title-font font-medium mb-2" >Jan Kowalski</h1>
          <h2 class="text-sm title-font text-gray-500 tracking-widest mb-2">jankowalski@gmail.com</h2>
          <img alt="avatar" class=" w-full h-full object-cover object-center rounded" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png">
          <button class="flex m-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">Zmień zdjęcie</button>
          <button class="flex m-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">Edytuj hasło</button>
          </div>
    </div>
    </div>
     <div class="flex-none map border-base-100 text-black py-4 px-6 my-6"  >
      <div class="flex-none px-4">
      <span class="text-lg font-extrabold">      
          Mój punkt
      </span>
      <button class=" text-xs m-2 text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded">Edytuj</button>
       </div>
  </div>
   <div
          id="mapContainer"
          class="lg:w-3/5 lg:h-2/5 mapstyle py-4 rounded-box mx-auto my-4 "
      />
</div>
  
</template>
<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Navbar from '../components/reusable-components/Navbar.vue'
export default {
  components: {
    Navbar
  },
   data () {
    return {
      map: null,
      marker: null
    }
  },
 mounted () {
    this.createMap()
    this.setMarkerOnMap()
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
    setMarkerOnMap() {
     this.marker = L.marker([52.162, 21.046])
       this.map.addLayer(this.marker)
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

  ::-webkit-scrollbar {
  width: 10px;
  }
  ::-webkit-scrollbar-thumb {
  background: mediumpurple;
  border-radius: 10px;
}
</style>
