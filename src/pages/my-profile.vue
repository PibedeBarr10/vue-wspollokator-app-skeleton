<template>
  <FirstConfigurationModal
    :toDoForUser = toDoForUser
  />
  <div
    class="flex flex-col my-0 py-0 "
    style="height: 100vh; max-height: 100vh; overflow:scroll; display:block"
  >
    <Navbar/>
    <div>
      <div class="lg:w-3/5 lg:h-2/5 mx-auto flex flex-wrap">
        <div class="lg:w-2/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
          <div class="flex mb-4">
            <a class="flex-grow border-b-2 border-gray-500 py-2 text-lg px-1 font-bold">Mój opis</a>
          </div>
          <textarea
            v-model="profile.description"
            placeholder="Opis"
            class="textarea resize-none textarea-bordered w-full"
            style="height: 49%"
          />
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Wiek</span>
              </label>
              <input
                v-model="profile.age"
                v-mask="'##'"
                type="text"
                autocomplete="off"
                placeholder="Wiek"
                class="input input-sm input-bordered"
              >
            </div>
          </div>
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
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Zwierzęta domowe</span>
              </label>
              <select v-model="profile.accepts_animals" class="select select-sm select-bordered w-full">
                <option v-for="option in selectOptions" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Osoby palące</span>
              </label>
              <select v-model="profile.smoking" class="select select-sm select-bordered w-full">
                <option v-for="option in selectOptions" :value="option.value">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Preferowana kwota</span>
              </label>
              <input
                v-model="profile.preferable_price"
                v-mask="'#####'"
                type="text"
                autocomplete="off"
                placeholder="Kwota"
                class="input input-sm input-bordered"
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full items-center lg:w-1/5 lg:h-1/2 lg:py-9 mb-6 lg:mb-0">
          <img
            alt="avatar"
            class="w-full h-full object-cover object-center rounded-full border-solid border-2 border-black"
            style="max-height: 150px; max-width: 150px;"
            :src="profile.avatar"
          >
          <h2 class="text-gray-900 text-xl font-medium mt-4">{{ currentUser.user.first_name }} {{ currentUser.user.last_name }}</h2>
          <h6 class="text-gray-500 text-2xs mb-2">{{ currentUser.user.email }}</h6>

          <label for="modal-change-picture" class="my-1 btn btn-primary modal-button w-full">Zmień zdjęcie</label>
          <input type="checkbox" id="modal-change-picture" class="modal-toggle">
          <div ref="fileModal" class="modal">
            <div class="modal-box">
              <input style="display:none" type="file" accept="image/png, image/gif, image/jpeg" @change=onFileSelected ref="fileInput">
              <button class="btn btn-primary" @click="$refs.fileInput.click()">Wybierz zdjęcie</button>
              <span class="mx-4">{{ avatar.name }}</span>

              <div class="modal-action">
                <label for="modal-change-picture" class="btn btn-primary" @click="uploadAvatar">Zatwierdź</label>
                <label for="modal-change-picture" class="btn">Anuluj</label>
              </div>
            </div>
          </div>

          <ChangePasswordModal />

          <button
            :class="[profileDataChanged ? 'btn btn-primary w-full my-1 border-0 py-2 px-4 btn-disabled' : 'btn btn-primary w-full my-1 border-0 py-2 px-4']"
            @click="updateProfileData"
            :disabled="profileDataChanged"
          >
            Zapisz zmiany w profilu
          </button>
        </div>
      </div>
    </div>

    <Map />

    <AllOpinions />

  </div>
</template>

<script>
import { LogoutIcon } from '@heroicons/vue/outline'
import profileService from "../services/profileService"
import Navbar from '../components/reusable-components/Navbar.vue'
import BaseButton from '../components/reusable-components/BaseButton.vue'
import FirstConfigurationModal from '../components/my-profile/FirstConfigurationModal.vue'
import ChangePasswordModal from '../components/my-profile/ChangePasswordModal.vue'
import Map from '../components/my-profile/Map.vue'
import AllOpinions from '../components/opinions/AllOpinions.vue'

export default {
  components: {
    LogoutIcon,
    Navbar,
    BaseButton,
    FirstConfigurationModal,
    ChangePasswordModal,
    Map,
    AllOpinions
  },
  data () {
    return {
      avatar: {
        name: ''
      },
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
        avatar: 'http://wspolokator.livs.pl:8000/media/default_avatar.png'
      },
      selectOptions: [
        { text: 'Akceptuję', value: 'A' },
        { text: 'Nie akceptuję', value: 'N' },
        { text: 'Nieistotne', value: 'I' }
      ],
      profileDataChanged: false,
      newAvatar: null,
      toDoForUser: []
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user
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

    this.toDoForUser = []

    this.getProfileData()
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

      for (let key of keys1) {
        if (this.profile[key] !== storeProfile[key]) {
          this.profileDataChanged = false;
          console.log(this.profile[key], storeProfile[key], key, 'diff')
          return
        }
      }

      this.profileDataChanged = true;
    },
    getProfileData() {
      profileService.getProfile(this.currentUser.user.pk).then(data => {
        this.$store.dispatch('getProfile', {
          pk: this.currentUser.user.pk
        }).then(() => {
          this.profile = JSON.parse(JSON.stringify(data))
          this.profile.preferable_price = parseInt(this.profile.preferable_price, 10)
        })
      }).catch(error => {
        if (error.response.data.detail === 'Not found.') {
          this.toDoForUser.push('Uzupełnij dane profilu (zapisz zmiany klikając w przycisk "Zapisz zmiany w profilu")')
        } else {
          this.$store.dispatch('notificationModule/show', { text: error.response.data.detail, type: 'error' })
        }
      })
    },
    updateProfileData() {
      this.$store.dispatch('setProfile', {
        profile: JSON.parse(JSON.stringify(this.profile)),
        user: this.currentUser.user
      }).then(response => {
        this.$store.dispatch('notificationModule/show', { text: 'Pomyślnie zaktualizowano dane profilu', type: 'success' })
        this.profileDataChanged = true
      }).catch(error => {
        this.$store.dispatch('notificationModule/show', {
          text: error.response.data[Object.keys(error.response.data)[0]],
          type: 'error'
        })
      })
    },
    onFileSelected(event) {
      this.newAvatar = event.target.files[0]
      this.avatar.name = event.target.files[0].name
    },
    isFileImage(file) {
      return file && file['type'].split('/')[0] === 'image';
    },
    uploadAvatar() {
      if (!this.isFileImage(this.newAvatar)) {
        this.$store.dispatch('notificationModule/show', { text: 'Wybrany plik nie jest obrazem', type: 'error' })
        return
      }

      this.avatar.name = ''
      let data = JSON.parse(JSON.stringify(this.profile))

      data.avatar = this.newAvatar
      this.$store.dispatch('setProfile', {
        profile: data,
        user: this.currentUser.user
      }).then(() => {
        this.profileDataChanged = true
        this.getProfileData()
      }).then(() => {
        this.$store.dispatch('notificationModule/show', { text: 'Pomyślnie zaktualizowano zdjęcie', type: 'success' })
      }).catch(error => {
        this.$store.dispatch('notificationModule/show', { text: 'Błąd w trakcie aktualizacji zdjęcia', type: 'error' })
      })
    },
    addMessageToToDoForUser (message) {
      this.toDoForUser.push(message)
    }
  }
}

</script>

<style scoped>

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: mediumpurple;
  border-radius: 10px;
}
</style>
