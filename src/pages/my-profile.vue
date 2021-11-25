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
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1 font-bold">Mój opis</a>
          </div>
          <!-- <p class="leading-relaxed mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ipsam pariatur ex? Sunt dolorum dolores provident rem numquam, eius placeat officia, veritatis accusantium quod blanditiis excepturi, voluptate incidunt odit quis! </p>
           -->
          <!-- dopasowanie h do poziomu przycisków? -->
          <textarea v-model="profile.description" placeholder="Opis" class="textarea resize-none textarea-bordered" style="height: 80%; width: 100%;"></textarea>
        </div>

        <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div class="flex mb-4">
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1 font-bold">Preferencje</a>
          </div>
          <div class="mb-4">
            <label class="cursor-pointer flex flex-row content-center items-center pr-4">
              <span class="label-text pr-2">Szukam współlokatora</span>
              <input v-model="profile.is_searchable" type="checkbox" class="toggle">
            </label>
          </div>
          <div class="mb-4">
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Zwierzęta domowe</span>
              </label>
              <select v-model="profile.accepts_animals" class="select select-sm select-bordered w-full">
                <option v-for="option in selectOptions" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Osoby palące</span>
              </label>
              <select v-model="profile.smoking" class="select select-sm select-bordered w-full">
                <option v-for="option in selectOptions" v-bind:value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Preferowana kwota</span>
              </label>
              <input v-model="profile.preferable_price" type="text" autocomplete="off" placeholder="Kwota" class="input input-sm input-bordered">
            </div>
          </div>
        </div>
        <div class="lg:w-1/5 lg:h-1/2 lg:py-6 mb-6 lg:mb-0">
          <img alt="avatar" class="w-full h-full object-cover object-center rounded-full pt-2" src="http://daisyui.com/tailwind-css-component-profile-2@94w.png">
          <h2 class="text-gray-900 text-xl font-medium mt-4">{{ currentUser.user.first_name }} {{ currentUser.user.last_name }}</h2>
          <h6 class="text-gray-500 text-2xs mb-2">{{ currentUser.user.email }}</h6>

          <label for="modal-change-picture" class="my-1 btn btn-primary modal-button w-full">Zmień zdjęcie</label>
          <input type="checkbox" id="modal-change-picture" class="modal-toggle">
          <div class="modal">
            <div class="modal-box">
              <input style="display:none" type="file" @change=onFileSelected ref="fileInput">
              <button class="btn btn-primary" @click="$refs.fileInput.click()">Wybierz zdjęcie</button>
              <span class="mx-4">{{ avatar.name }}</span>

              <div class="modal-action">
                <button class="btn btn-primary" @click="uploadAvatar">Zatwierdź</button>
                <!-- <label for="modal-change-picture" class="btn btn-primary">Zatwierdź</label>  -->
                <label for="modal-change-picture" class="btn">Anuluj</label>
              </div>
            </div>
          </div>

          <label for="modal-change-password" class="my-1 btn btn-primary modal-button w-full">Zmień hasło</label>
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
                <button class="btn btn-primary" @click="changePassword">Zatwierdź</button>
                <label for="modal-change-password" class="btn">Anuluj</label>
              </div>
            </div>
          </div>

          <button
            :class="[profileDataChanged ? 'btn btn-primary w-full my-1 border-0 py-2 px-4 btn-disabled' : 'btn btn-primary w-full my-1 border-0 py-2 px-4']"
            @click="updateProfileData"
            :disabled="profileDataChanged"
          >
            Zapisz zmiany w profilu
          </button>
        </div>

<!--        <div class="w-full divider"></div>-->

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
          <!-- <MyPointModal /> -->
        </div>

        <label class="cursor-pointer flex flex-row content-center items-center pr-4">
          <span class="label-text pr-2">Odl. od mojego punktu (km)</span>
          <input v-model="radius" :disabled="!pointEditing" type="range" min="1" max="10" oninput="this.nextElementSibling.value = this.value" class="range">
          <output>{{ radius }}</output>
        </label>
      </div>
    </div>


    <div
      v-if="coordinates !== []"
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
import MyPointModal from "../components/myprofile/MyPointModal.vue";
import profileService from "../services/profileService";

export default {
  components: {
    Navbar,
    LogoutIcon,
    BaseButton,
    MyPointModal
  },
  data () {
    return {
      map: null,
      marker: null,
      circle: null,
      newpassword: {
        password:'',
        repeatedPassword:''
      },
      avatar: {
        name: ''
      },
      pointEditing: false,
      coordinates: [],
      radius: 1,
      profile: {
        id: '',
        updated_at: '',
        sex: 'F',
        age: 0,
        accepts_animals: 'I',
        smoking: 'I',
        preferable_price: '0',
        description: 'Opis',
        is_searchable: false,
        avatar: null
      },
      selectOptions: [
        { text: 'Akceptuję', value: 'A' },
        { text: 'Nie akceptuję', value: 'N' },
        { text: 'Nieistotne', value: 'I' }
      ],
      profileDataChanged: false
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  watch: {
    profile: {
      deep: true,
      handler(value) {
        this.compareProfilesData()
      }
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getProfileData()
    this.drawMap()
  },
  methods: {
    compareProfilesData() {
      const storeProfile = this.$store.getters.profile
      const keys1 = Object.keys(this.profile);
      const keys2 = Object.keys(storeProfile);

      const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

      if (!isEqual(keys1, keys2)) {
        console.error('Different keys', keys1, keys2)
        return
      }

      // console.log({...this.profile})
      // console.log({...storeProfile}, 'storeProfile')

      for (let key of keys1) {
        if (this.profile[key] !== storeProfile[key]) {
          this.profileDataChanged = false;
          console.log(this.profile[key], storeProfile[key], key, 'diff')
          return
        }
      }
      // a
      this.profileDataChanged = true;
    },
    getProfileData() {
      this.$store.dispatch('getProfile').then(() => {
        profileService.getProfile().then(data => {
          if (data.length > 0) {
            this.profile = JSON.parse(JSON.stringify(data[0]))
          }
        })
      })
    },
    updateProfileData() {
      this.$store.dispatch('setProfile', {
        profile: JSON.parse(JSON.stringify(this.profile)),
        user: this.currentUser.user
      }).then(() => {
        this.profileDataChanged = true
      })
    },
    drawMap() {
      this.$store.dispatch('getUserPoint').then(() => {
        this.coordinates = this.$store.getters.point
        this.radius = this.$store.getters.radius

        this.createMap()
        this.setCircleOnMap()
      })
    },
    createMap() {
      this.map = L.map("mapContainer").setView(this.coordinates, 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      let customPane = this.map.createPane("customPane");
      customPane.style.zIndex = 399;
    },
    setCircleOnMap() {
     this.circle = L.circle(this.coordinates, this.radius * 1000);
     this.map.addLayer(this.circle);
    },
    changeMyPoint() {
      this.pointEditing = true

      this.map.removeLayer(this.circle);

      this.marker = L.marker(this.coordinates, {
        draggable: true
      })
      this.map.addLayer(this.marker);
    },
    changePassword() {
       this.$store.dispatch('auth/changePassword', this.newpassword).then(() => {
        this.$router.go()
      })
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
        this.map.removeLayer(this.marker);
        this.circle = L.circle(this.coordinates, this.radius * 1000);
        this.map.addLayer(this.circle);

        this.pointEditing = false
      })
    },
    cancelUpdateMyPoint()
    {
      // powrót do danych wcześniejszych
      this.map.removeLayer(this.marker);
      this.map.addLayer(this.circle);

      this.pointEditing = false
    },
    onFileSelected(event) {
      this.avatar= event.target.files[0]
    },
    uploadAvatar() {
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
