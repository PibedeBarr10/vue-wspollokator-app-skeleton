<template>
  <div
    class="flex flex-col my-0 py-0 "
    style="height: 100vh; max-height: 100vh; overflow:scroll; display:block"
  >
    <Navbar/>
    <div>
      <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
        <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div class="flex mb-4">
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1 font-bold">Opis</a>
          </div>
          <label
            class="label bg-gray-100 rounded-lg"
            style="height: 49%; align-items: start;"
          >
            <span class="label-text my-1 mx-2">
              {{this.profile.description}}
            </span>
          </label>
          <div class="mb-4">
            <div class="w-full">
              <label class="label">
                <span class="label-text">Wiek</span>
              </label>
              <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text my-1 mx-2">
                  {{this.profile.age}}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div class="flex ">
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1 font-bold">Preferencje</a>
          </div>
          <div >
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Zwierzęta domowe</span>
              </label>
              <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text my-1 mx-2">{{ getOption(this.profile.accepts_animals) }}</span>
              </label>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Osoby palące</span>
              </label>
              <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text my-1 mx-2">
                  {{ getOption(this.profile.smoking) }}
                </span>
              </label>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Preferowana kwota</span>
              </label>
              <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text my-1 mx-2">
                  {{ this.profile.preferable_price }}
                </span>
              </label>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full items-center lg:w-1/5 lg:h-1/2 lg:py-9 mb-6 lg:mb-0">
          <img
            alt="avatar"
            class="w-full h-full object-cover object-center rounded-full border-solid border-2 border-black"
            style="max-height: 150px; max-width: 150px;"
            :src="this.profile.avatar"
          >
          <h2 class="text-gray-900 text-xl font-medium mt-4">{{ this.profile.first_name }} {{ this.profile.last_name }}</h2>
          <button @click="sendMessageToUser" class="my-4 btn btn-primary w-full">Napisz wiadomość</button>

          <OpinionModal :profileUserID="this.profile.user_id" />

        </div>
        <div class="flex w-full items-center justify-between">
          <span class="text-lg font-bold">Punkt</span>
        </div>
      </div>
    </div>

    <div
      v-if="coordinates !== []"
      id="mapContainer"
      class="lg:w-3/5 lg:h-2/5 mapstyle py-4 rounded-box mx-auto my-4"
    />

    <AllOpinions
      v-if="dataLoaded"
      :user-id="this.profile.user_id"
    />
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import usersService from '../services/usersService'
import chatService from '../services/chatService'
import Navbar from '../components/reusable-components/Navbar.vue'
import OpinionModal from '../components/my-profile/OpinionModal.vue'
import AllOpinions from '../components/opinions/AllOpinions.vue'

export default {
  name: 'Profil użytkownika',
  components: {
    Navbar,
    OpinionModal,
    AllOpinions
  },
  props: {
    id: String,
  },
  data() {
    return {
      coordinates: [52, 20],
      radius: 2,
      profile: {
        id: '',
        updated_at: '',
        sex: 'F',
        age: 18,
        accepts_animals: 'I',
        smoking: 'I',
        preferable_price: 1000,
        description: 'Domyślny opis',
        is_searchable: true,
        avatar: 'http://wspolokator.livs.pl:8000/media/default_avatar.png',
        first_name: '',
        last_name: '',
        conversation_id: '',
        point:{
          id: '',
          location: {
            coordinates: null,
            type: '',
          },
          radius: '',
          user: '',
        },
        user_id: '',
      },
      selectOptions: [
        { text: 'Akceptuję', value: 'A' },
        { text: 'Nie akceptuję', value: 'N' },
        { text: 'Nieistotne', value: 'I' }
      ],
      dataLoaded: false
    }
  },
  mounted() {
     if (!this.currentUser) {
      this.$router.push('/login');
    }

    document.getElementById('mapContainer').innerHTML = '<div v-if="coordinates !== []" id="mapContainer" class="lg:w-3/5 lg:h-2/5 mapstyle py-4 rounded-box mx-auto my-4"/>';

    this.getProfileData()
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    },
  },
  methods: {
    getOption (value) {
      const option = this.selectOptions.filter((element) => {
        if (value === element.value) {
          return element
        }
      })
      return option[0].text
    },
    getProfileData() {
      this.dataLoaded = false
      usersService.getProfile(this.id).then((data) => {
        this.profile = JSON.parse(JSON.stringify(data))
        this.profile.preferable_price = parseInt(this.profile.preferable_price, 10)
        this.dataLoaded = true
      }).then(() => {
        this.coordinates= this.profile.point[0].location.coordinates;
        this.radius= this.profile.point[0].radius;
        this.drawMap();
      })
    },
    drawMap() {
      this.createMap()
      this.setCircleOnMap()
    },
    createMap() {
      const container = L.DomUtil.get('mapContainer');
      if (container !== null) {
        container._leaflet_id = null
      }
      this.map = L.map('mapContainer').setView(this.coordinates, 13);
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map)

      let customPane = this.map.createPane("customPane");
      customPane.style.zIndex = 399
    },
    setCircleOnMap() {
     this.circle = L.circle(this.coordinates, this.radius * 1000)
     this.map.addLayer(this.circle)
    },
    giveUserOpinion(){



    },
    sendMessageToUser() {
      if (this.profile.conversation_id !== null) {
        this.$router.push({
          name: 'Wiadomości',
          params: {
            chooseConversationId: this.profile.conversation_id // this.profile.conversation_id
          }
        })
      } else {
        chatService.createConversation(this.profile.user_id).then(data => {
          this.profile.conversation_id = data.id
          this.$router.push({
            name: 'Wiadomości',
            params: {
              chooseConversationId: 0 // this.profile.conversation_id
            }
          })
        })
      }
    },
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

