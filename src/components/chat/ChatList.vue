<template>
  <div class="flex flex-col w-3/12 bg-gray-100" style="height:100vh;" >
     <div class="font-extrabold p-3 hidden sm:flex sm:text-sm md:text-lg" style="max-height:10%;">
         Wiadomości
     </div> 
     <!-- poki co ukryta wyszukiwarka -->
      <div class ="px-2">
          <div class="relative">
              <input type="text" placeholder="Wyszukaj" class="w-full input hidden md:flex" v-model="searchInput">
              <input type="text" placeholder="" class="w-full input flex md:hidden" v-model="searchInput">
              <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost"><SearchIcon class="h-6 w-6"/></button>
          </div> 
      </div>
      <!-- póki co ukryte
      
      <UsersTopBar/> 
      -->
      <div class="flex flex-col mb-4" style="flex:1; overflow-x: hidden; overflow-y: auto;">
        <AllConversations
          :searchInput="searchInput"
          :conversationsList="conversationsList"
          :currentUserId="currentUserId"
          @clicked="onClickChild"
          @clickedGroup="onClickChildGroup"
        />
      </div>
      <div style="height:130px; margin: 0 auto;">
        <label for="modal-create-group" class="my-1 btn btn-primary text-xs " @click="getUsers">Utwórz grupę</label>
        <input type="checkbox" id="modal-create-group" class="modal-toggle">
        <div class="modal">
          <div class="modal-box" style="height:70%;">
                      
              <div
                v-if="favouriteUsers.length === 0"
                class="flex justify-center items-center w-full justify-center"
                style="height: 100%"
              >
                <p>Brak osób na liście ulubionych</p>
              </div>
              <div v-else class="flex flex-col" style="height:80%;">
                  <div class="form-control w-full flex " style="max-height:10%;">
                  <input
                    v-model="nameGroup"
                    type="text"
                    autocomplete="off"
                    placeholder="Nazwa grupy"
                    class="input input-md input-bordered"
                  >
                </div>
                <div class="flex flex-col w-full mt-4" style="flex:1; overflow:hidden; overflow-y:auto;">
                  <div v-for="user in favouriteUsers" :key="user" class="w-full mt-4">
                    
                    <div class=" flex w-full items-center">
                      <input
                        type="checkbox"
                        :value="user.user_id"
                        v-model="checkedUsersId"
                        class="checkbox checkbox-primary checkbox-sm">
                      <div class="m-4 px-4">
                        <img
                          class="
                            w-full
                            rounded-full
                            object-cover object-center
                            border-solid border-2 border-black
                          "
                          style="object-fit: cover; height: 48px; width: 48px"
                          :src="user.avatar"
                          :alt="user.first_name + ' image'"
                        />
                      </div>

                      <div class="flex justify-between flex-grow pl-0 pr-4 py-4">                 
                        <div>
                          <p class="card-title">
                            {{ `${user.first_name} ${user.last_name}` }}                      
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <div class="modal-action">
              <label for="modal-create-group" class="btn btn-primary" @click="createGroup">Utwórz</label>
              <label for="modal-create-group" class="btn">Anuluj</label>
            </div>
          </div>
        </div>
      </div>
 </div>
</template>

<script>
import UsersTopBar from "../chat/UsersTopBar.vue";
import AllConversations from "../chat/AllConversations.vue";
import { SearchIcon } from "@heroicons/vue/outline";
import favouriteService from "../../services/favouriteService";
import chatService from "../../services/chatService";
export default {
  components: {
    UsersTopBar,
    AllConversations,
    SearchIcon,
  },
  props: {
    searchInput: String,
    currentUserId: String,
    conversationsList: {
      id: String,
      is_group: Boolean,
      name: String,
      users: {
        id: String,
        first_name: String,
        last_name: String,
        profile: String,
        avatar: String,
      },
      last_message: {
        user: String,
        user_name: String,
        text: String,
        is_read: Boolean,
        created_at: String
      },
    }
  },
  data () {
    return {
      favouriteUsers: [],
      checkedUsersId: [],
      nameGroup: '',
    }
  },
  methods: {
    onClickChild (chooseConversationId, oponentUser) {
      this.$emit('clicked', chooseConversationId, oponentUser)
    },
    onClickChildGroup (chooseGroupConversationId, users, name) {
      this.$emit('clickedGroup', chooseGroupConversationId, users, name)
    },
    getUsers() {
      this.checkedUsersId = []
      this.nameGroup = ""
      favouriteService.getFavourite().then((data) => {
        this.favouriteUsers = data
      })
    },
    createGroup() {
      if (this.nameGroup === "" || this.checkedUsersId.length < 2) {
        this.$store.dispatch('notificationModule/show',{
          text: 'Nie podano nazwy grupy/Za mało osób: minimum 2',
          type: 'error'
        })
      } else {
        chatService.createGroupConversation(this.checkedUsersId, this.nameGroup).then(() => {
          this.$store.dispatch('notificationModule/show', {
            text:'Utworzono konwersacje grupową',
            type:'success'
          })
        })
      }
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