<template>
<div class="flex flex-col">
        <div v-for="conversation in conversationsList" :key="conversation" >
          <div v-for="index in conversation.users" :key="index">   
          <div v-if="index.id !== currentUserId" class="flex m-2 bg-white rounded-lg p-2 cursor-pointer btn-ghost" @click="chooseConversation(conversation.id,index)" >
            <div>
              <img class="w-14 rounded-full" :src="index.avatar"  alt="avatar"/>
            </div>
            <div class="flex-grow p-3">
                <div class="flex justify-between text-xs">
                  <div>{{ index.first_name}} {{index.last_name}}</div>
                  <div  class=" text-gray-400">data</div> <!-- v-if by wyświetlać tylko raz  -->  <!-- {{conversation.last_message_created_at}} -->
                </div>
                <div class="text-xs text-gray-500">
                  <span v-if="conversation.last_message.user === currentUserId">Ty:</span>
                 {{conversation.last_message.text}}
                </div>
               </div>
          </div>
          </div>
      </div>

</div>
</template>

<script>

export default {
   props:{
    currentUserId: String,
    conversationsList:
    {
      id: String,
      users: {
        id: String,
        first_name: String,
        last_name: String,
        profile: String,
        avatar: String,
      },
      last_message:{
        user: String,
        user_name: String,
        text: String,
        is_read: Boolean,
        created_at: String
        },
    }
  },
  components: {
  },
  data() {
    return {}
  },

  methods: {
    chooseConversation(chooseConversationId,oponentUser)
    {
       this.$emit('clicked', chooseConversationId,oponentUser)
    },
  },
};
</script>

<style scoped></style>