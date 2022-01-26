<template>
  <div class="flex flex-col">
    <button v-on:click="onInputChange"></button>
    <div v-for="conversation in filterByFullName()" :key="conversation">
      <button v-on:click="onInputChange"></button>
      <div v-if="conversation.is_group">
        <div
          class="flex m-2 bg-white rounded-lg p-2 cursor-pointer btn-ghost"
          @click="
            chooseGroupConversation(
              conversation.id,
              conversation.users,
              conversation.name
            )
          "
        >
          <div class="flex-grow p-3">
            <div class="flex justify-between text-xs">
              <div>{{ conversation.name }}</div>
              <div
                v-if="conversation.last_message.text !== ''"
                class="text-gray-400"
              >
                {{ moment(conversation.last_message.created_at) }}
              </div>
            </div>
            <div class="text-xs text-gray-500">
              <span v-if="conversation.last_message.user === currentUserId"
                >Ty:</span
              >
              {{ conversation.last_message.text }}
            </div>
          </div>
        </div>
      </div>
      <div v-else v-for="index in conversation.users" :key="index">
        <div
          v-if="index.id !== currentUserId"
          class="flex m-2 bg-white rounded-lg p-2 cursor-pointer btn-ghost"
          @click="chooseConversation(conversation.id, index)"
        >
          <div>
            <img
              class="w-14 rounded-full"
              style="max-height: 3.5rem; max-width: 3.5rem"
              :src="index.avatar"
              alt="avatar"
            />
          </div>
          <div class="flex-grow p-3">
            <div class="flex justify-between text-xs">
              <div>{{ index.first_name }} {{ index.last_name }}</div>
              <div
                v-if="conversation.last_message.text !== ''"
                class="text-gray-400"
              >
                {{ moment(conversation.last_message.created_at) }}
              </div>
              <!-- v-if by wyświetlać tylko raz  -->
              <!-- {{conversation.last_message_created_at}} -->
            </div>
            <div class="text-xs text-gray-500">
              <span v-if="conversation.last_message.user === currentUserId"
                >Ty:</span
              >
              {{ conversation.last_message.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
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
        created_at: String,
      },
    },
  },
  methods: {
    chooseConversation (chooseConversationId, oponentUser) {
      this.$emit("clicked", chooseConversationId, oponentUser)
    },
    moment: function (data) {
      return moment(data).format("LT")
    },
    chooseGroupConversation(chooseGroupConversationId, users, name) {
      this.$emit("clickedGroup", chooseGroupConversationId, users, name)
    },
    filterByFullName() {
      const search = this.searchInput
      const current_user_id = this.currentUserId
  
      if (!search) return this.conversationsList
      for (let index = 0; index < this.conversationsList.length; index++) {
          const value = this.conversationsList[index]
          let opposite_name_user = ""
          for (let user of value.users) {
            if (user.id !== current_user_id) {
                opposite_name_user = user.first_name + " " + user.last_name
                break
            }
          }
          let valid_full_name = opposite_name_user.toLowerCase().includes(this.searchInput.toLowerCase())
          if (valid_full_name === true) {
            // console.log('dodac')
          } else {
            this.conversationsList.splice(index, 1)
          }
      }
      return this.conversationsList
    },
  },
};
</script>

<style scoped></style>