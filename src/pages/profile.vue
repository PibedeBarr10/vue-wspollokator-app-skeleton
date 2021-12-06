<template>
   <Navbar/>
    <div>
      <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
         <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div class="flex mb-4">
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1 font-bold">Opis</a>
          </div>
           <label class="label bg-gray-100 rounded-lg"  style="height: 49%; align-items: start;">
                <span class="label-text">{{this.profile.description}}</span>
              </label>
          <div class="mb-4">
            <div class="w-full">
              <label class="label">
                <span class="label-text">Wiek</span>
              </label>
               <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text">{{this.profile.age}}</span>
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
                <span class="label-text">{{this.profile.accepts_animals}}</span>
              </label>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Osoby palące</span>
              </label>
               <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text">{{this.profile.smoking}}</span>
              </label>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Preferowana kwota</span>
              </label>
               <label class="label bg-gray-100 rounded-lg ">
                <span class="label-text">{{this.profile.preferable_price}}</span>
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
          <button class="my-1 btn btn-primary w-full">Napisz wiadomość</button>
        </div>
      </div> 
    </div>


</template>

<script>
import usersService from "../services/usersService";
import Navbar from '../components/reusable-components/Navbar.vue';

export default {
  name: 'Profil użytkownika',
  components: {
    Navbar,
  },
  props: {
    id: String,
  },
  data() {
    return {
      profile:
      {
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
      },
    }
  },
  mounted() {
    this.getProfileData()
  },
  methods: {
    getProfileData() {
      usersService.getProfile(this.id).then((data) => {
        this.profile = JSON.parse(JSON.stringify(data))
      }).then(() => {
        console.log(this.profile)
      })
    }
  }
}
</script>
