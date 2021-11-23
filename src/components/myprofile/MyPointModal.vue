<template>    
   <label for="modal-change-mypoint" class=" text-xs m-2 border-0 py-2 px-4 btn btn-primary modal-button ">Edytuj</label>
     <input type="checkbox" id="modal-change-mypoint" class="modal-toggle"> 
     <div class="modal">
        <div class="modal-box">
            <div
        id="mapContainer"
        class="lg:w-3/5 lg:h-2/5 mapstyle py-4 rounded-box mx-auto my-4 "
        />
    
        <div class="modal-action">
        <label for="modal-change-mypoint" class="btn btn-primary">Zatwierdź</label> 
        <label for="modal-change-mypoint" class="btn">Anuluj</label>
        </div>
        </div>
        </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

export default {
  data () { 
    return {
        map:null,
        marker:null
     }
  },
  methods: {
    createMap() {
      this.map = L.map("mapContainer").setView([52.162, 21.046], 15);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      let customPane = this.map.createPane("customPane");
      customPane.style.zIndex = 399;
    },
        setMarkerOnMap() {
         // this.marker = L.circleMarker([52.162, 21.046],this.radius*1000)
        //  this.marker = L.circleMarker([52.162, 21.046],
        //  {
        //    radius:100,
        //    draggable:true

        //  })
         this.marker = L.marker([52.162, 21.046],
         {
           draggable:true
         })
          this.map.addLayer(this.marker)
        },
  }
};

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