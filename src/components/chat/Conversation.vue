<template>
   <!-- class=" flex-grow flex flex-col" -->
   <div class="flex flex-col w-full " style="height: 100vh;" >
    <div class ="w-full" > 
        <div class="flex items-center border-b-2 border-gray-50">
          <div class="p-3">
          <img class="w-10 rounded-full" :src="oponentUser.avatar" style="max-width: 2.5rem; max-height: 2.5rem;"/>
          <!-- jeżeli użytkownik aktywny 

          <div class="flex justify-center items-center w-3 relative left-6 bottom-3 bg-white rounded-full" style="height: 0.75rem;">
            <div class="w-2.5 bg-green-600 rounded-full" style="height: 0.625rem;"/>
          </div>

          -->
          </div>
          <div class="p-2" >
            <div class="text-sm">{{oponentUser.first_name}} {{oponentUser.last_name}}</div>
            <!-- jeżeli użytkownik aktywny -->
            <!-- <div class="text-xs  text-gray-400">aktywny</div> -->
          </div>
        </div>
      </div>
    <div id="conversationData" class ="w-full border-b-2 border-gray-50 flex flex-col " style=" overflow:hidden; overflow-y: auto; flex:1;"> <!-- v-if="messageList !=0 " -->
      <div v-for="index in messageList" :key="index">
          <!-- wiadomosc otrzymana -->
        <MessageIn :text="index.text" :avatar="oponentUser.avatar" :created_at="index.created_at" v-if="index.user===oponentUser.id"/>
          <!-- wiadomość użytkownika -->
        <MessageOut :text="index.text" :created_at="index.created_at" v-else/>
      </div>
     </div>
    <div class ="p-2" style="height:130px; " >
          <div class="relative">
              <input v-model="message" type="text" placeholder="Napisz wiadomość ..." class=" w-full input" v-on:keyup.enter="sendMessage"> 
              <button class="absolute top-0 right-0 rounded-l-none btn btn-ghost" @click="sendMessage"><ArrowRightIcon class="h-6 w-6" /></button>
          </div> 
        </div>
  </div>
</template>

<script>
import { ArrowRightIcon } from "@heroicons/vue/outline";
 import MessageIn from "./MessageIn.vue";
import MessageOut from "../chat/MessageOut.vue";

export default {
  props:{
    messageList: {
      user:String,
      user_name:String,
      text:String,
      is_read:Boolean,
      created_at:String
    },
    oponentUser: {
      id: String,
      first_name: String,
      last_name: String,
      profile: String,
      avatar: String,
    },
  },
  components: {
      MessageIn,
      MessageOut,
      ArrowRightIcon,
  },
  data() {
    return {
      message: '',
      messageLimit: 500,
    }
  },
  // watch: {
  //    messageList: {
  //      deep: true,
  //      handler(value) {
  //        this.scrollDown()
  //      }
  //    }
  // },
  methods: {
    scrollDown () {
      const elem = document.getElementById('conversationData');
      elem.scrollIntoView({ behavior: "smooth" })
      elem.scrollTop = elem.scrollHeight;
    },
    sendMessage () {
      if (this.message.length > this.messageLimit) {
        this.$store.dispatch('notificationModule/show', {
          text: `Treść wiadomości nie może przekroczyć ${this.messageLimit} znaków`,
          type: 'error'
        })
        return
      }

      this.$emit('send', this.message)
      this.message = ''
    },
  },
};
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