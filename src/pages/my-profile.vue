<template>
  
  <div
    class="flex flex-col my-0 py-0 "
    style="height: 100vh; max-height: 100vh; overflow:scroll; display:block"
  >
    <Navbar>
      <router-link to="/my-profile" class="btn btn-ghost btn-sm rounded-btn">
        Mój profil
      </router-link>
    </Navbar>
    <div>
      <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
        <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div class="flex mb-4">
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1">Mój opis</a>
          </div>
          <!-- <p class="leading-relaxed mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsam pariatur ex? Sunt dolorum dolores provident rem numquam, eius placeat officia, veritatis accusantium quod blanditiis excepturi, voluptate incidunt odit quis! </p>
           -->
          <!-- dopasowanie h do poziomu przycisków? -->
          <textarea placeholder="Bio" class="textarea resize-none textarea-bordered " style="height: 80%; width: 100%;"></textarea>
         

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
          <div class="mb-4">
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
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-2">{{currentUser.user.first_name}} {{currentUser.user.last_name}}</h1>
          <h2 class="text-sm title-font text-gray-500 tracking-widest mb-2">{{currentUser.user.email}}</h2>
          <img alt="avatar" class="w-full h-full object-cover object-center rounded-full" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png">

          <label for="modal-change-picture" class="my-2 btn btn-primary modal-button w-full">Zmień zdjęcie</label>
          <input type="checkbox" id="modal-change-picture" class="modal-toggle"> 
          <div class="modal">
             <div class="modal-box">
                <input style="display:none" type="file" @change=onFileSelected ref="fileInput">
                <button class="btn btn-primary" @click="$refs.fileInput.click()">Wybierz zdjęcie</button>
                <span class="mx-4">{{avatar.name}}</span>

           <div class="modal-action">
             <button class="btn btn-primary" @click="uploadAvatar">Zatwierdź</button>
             <!-- <label for="modal-change-picture" class="btn btn-primary">Zatwierdź</label>  -->
           <label for="modal-change-picture" class="btn">Anuluj</label>
             </div>
          </div>
            </div>



         <label for="modal-change-password" class="btn btn-primary modal-button w-full">Zmień hasło</label>
          <input type="checkbox" id="modal-change-password" class="modal-toggle"> 
          <div class="modal">
             <div class="modal-box">
              <input
                v-model="newpassword.password"
                type="password"
                placeholder="Nowe hasło"
                class="mt-5"
              />

                <input
                v-model="newpassword.repeatedPassword"
                type="password"
                placeholder="Powtórz nowe hasło"
                class="mt-5"
              />

            <div class="modal-action">
              <!-- <label for="modal-change-password" class="btn btn-primary" @click="changePassword">Zatwierdź</label>  -->
              <button class="btn btn-primary" @click="changePassword">Zatwierdź</button>
            <label for="modal-change-password" class="btn">Anuluj</label>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div class="flex-none map border-base-100 text-black py-4 px-6 my-6">
      <div class="flex-none pr-4">
        <span class="text-lg font-extrabold">
          Mój punkt
        </span>
        
          <label for="modal-change-mypoint" class=" text-xs m-2 border-0 py-2 px-4 btn btn-primary modal-button ">Edytuj</label>
          <input type="checkbox" id="modal-change-mypoint" class="modal-toggle"> 
          <div class="modal">
             <div class="modal-box">
            <p>Zmiana punktu</p>
           <div class="modal-action">
             <label for="modal-change-mypoint" class="btn btn-primary">Zatwierdź</label> 
           <label for="modal-change-mypoint" class="btn">Anuluj</label>
             </div>
          </div>
            </div>

        
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
import { LogoutIcon } from '@heroicons/vue/outline'
import BaseButton from "../components/reusable-components/BaseButton.vue";

export default {
  components: {
    Navbar,
    LogoutIcon,
    BaseButton,

  },
  data () {
    return {
      map: null,
      marker: null,
      newpassword:{
        password:'',
        repeatedPassword:''
      },
      avatar:{
        name: ''
      }
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.createMap()
    this.setMarkerOnMap()
  },
  methods: {
    createMap() {
      this.map = L.map("mapContainer").setView([52.162, 21.046], 20);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      let customPane = this.map.createPane("customPane");
      customPane.style.zIndex = 399;
    },
    setMarkerOnMap() {
      this.marker = L.marker([52.162, 21.046])
      this.map.addLayer(this.marker)
    },
    changePassword() {
     // localStorage.setItem('newpassword', JSON.stringify(this.newpassword));
      //console.log('Click change password'),
      //console.log(this.newpassword.password)
       this.$store.dispatch('auth/changePassword', this.newpassword).then(() => {
        this.$router.push('/dashboard')
      })
    }, 
    onFileSelected(event) {
      this.avatar= event.target.files[0]
    },
    uploadAvatar(){ 
      // const fd = new FormData();
      // fd.append('image', this.avatar, this.avatar.name)
      // axios.post('url',fd,{
      //   onUploadProgress: uploadEvent => {console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')}
      //   })
      //     .then(res => {console.log(res)})
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
